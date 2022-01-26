/* eslint-disable vue/require-default-prop */
<script>

export default {
  name: 'ElUploadImage',
  props: {
    value: String,
    httpRequest: Function, // return promise
    getImage: Function,
    disabled: Boolean,
    action: {
      type: String,
      default: '#'
    },
    onRemove: Function,
    onPreview: Function,
    config: Object
  },
  data() {
    return {
      cacheImages: this.getImages(this.value)
    }
  },
  computed: {
    images: {
      get: function() {
        const { value, getImages, cacheImages } = this
        const hasError = cacheImages.length > 0 && cacheImages.some(v => Boolean(v.error))
        return hasError ? cacheImages : getImages(value)
      },
      set: function() {}
    }
  },
  methods: {
    getImages(value) {
      const { getImage } = this
      return value ? value.split(',').map(v => {
        return { value: v, src: getImage ? getImage(v) : v, error: '' }
      }) : []
    },
    onUpload(file) {
      const { images, getImages, setValue, config, httpRequest } = this
      const cacheImages = images

      if (!httpRequest) return
      // 更新视图数据
      const setViewData = (result, error = '图片上传失败') => {
        const image = getImages(result)[0] || { src: null, value: null, error }
        // 检查是否重复
        const isRepeat = images.length > 0 && images.some(v => v.value === image.value)
        if (isRepeat) return
        if (!image.error) {
        // 替换无效的图片， value = null
          const replaceIndex = cacheImages.reduce((t, v, i) => v.value === null ? i : t, images.length)
          images.splice(replaceIndex, 1, image)
          setValue(images)
        } else {
          cacheImages.push(image)
        }
        this.cacheImages = cacheImages
      }
      // 上传图片
      httpRequest(file, config).then(result => {
        setViewData(result)
      }).catch((err) => {
        setViewData(null, err.message)
      })
    },
    handleImageEvent(action, image, event) {
      const { images, onRemove, config, setValue } = this
      const currentSrc = image.src

      if (action === 'onError') {
        this.cacheImages = images.reduce((t, v) => {
          return v.src === currentSrc ? [...t, { ...v, src: '', value: null, error: '图片地址无效' }] : [...t, v]
        }, [])
        return
      }

      if (action === 'onRemove') {
        if (onRemove) return onRemove(currentSrc, config)
        const newImages = images.filter(v => v.src !== currentSrc)
        setValue(newImages)
        return
      }

      if (action === 'onReUpload') {
        this.$refs.upload && this.$refs.upload.$el.firstChild.click()
        return
      }

      this[action] && this[action](currentSrc, config)
    },
    setValue(newImages) {
      const newValue = newImages.reduce((t, v) => v.value ? [...t, v.value] : t, []).join(',')
      console.log(newValue)
      this.$emit('input', newValue)
    }
  },
  render(h, context) {
    const { images, disabled, action, handleImageEvent, onUpload } = this
    console.log(images)

    return <div class='el-upload-image'>
      <div vShow={disabled && !images.length}>-</div>
      <div class='el-upload-list--picture-card'>
        {
          images.map((image, index) => {
            return image && <div key={index} class='el-upload-list__item'>
              {
                image.src
                  ? <img vShow={!image.error} src={image.src} class='el-upload-list__item-thumbnail' onerror={(e) => handleImageEvent('onError', image, e)}/>
                  : <span class='el-upload-list__item-thumbnail image-error'>
                    <span class='image-error-text'>
                      { image.error }
                      { !disabled && <el-link type='primary' onClick={() => handleImageEvent('onReUpload', image)}>重新上传</el-link> }
                    </span>
                  </span>
              }
              <span vShow={!!image.src} class={{ 'el-upload-list__item-actions': true }}>
                <span class='el-upload-list__item-preview' onClick={() => handleImageEvent('onPreview', image)}>
                  <i class='el-icon-zoom-in'></i>
                </span>
                {
                  !disabled && <span class='el-upload-list__item-delete' onClick={() => handleImageEvent('onRemove', image)}>
                    <i class='el-icon-delete'></i>
                  </span>
                }
              </span>
            </div>
          })
        }
        {
          !disabled && <el-upload
            ref='upload'
            action={action}
            accept='.jpg,.jpeg'
            list-type='picture-card'
            show-file-list={false}
            http-request={(file) => onUpload(file)}
            class='el-upload-wrapper el-upload-list__item'>
            <i class='el-icon-plus'></i>
          </el-upload>
        }
      </div>
    </div>
  }
}

</script>
<style lang="scss" scoped>
.image-error {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: #F5F7FA;
  color: #C0C4CC;
  vertical-align: middle;
}
.image-error-text {
  text-align: center;
  .el-link {
    display: flex;
  }
}
.el-upload-wrapper {
  border: none;
  .el-upload  {
    width: inherit;
    height: inherit;
  }
}
</style>
