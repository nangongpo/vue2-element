<script>
import { axiosPost } from '@/api'
import { fileType } from '@/utils/validate'
import printJS from 'print-js'
import { dataURItoBlob, imageCompress, getImageUrl } from '@/utils/image'
// import { imageCompress, getImageUrl } from '@/utils/image'
import RenderIcon from '@/components/RenderIcon'
const path = require('path')
export default {
  components: { RenderIcon },
  props: {
    value: [Array, String, Number],
    // 是否多张上传
    multiple: {
      type: Boolean,
      default() {
        return true
      }
    },
    altimeter: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 摄像头类型， 主摄像头， 副摄像头
    cameraType: {
      type: String,
      default: '1' // 1 主 2 副
    },
    // 剪裁模式
    mode: {
      type: String,
      default: '3' // 自动 '3', 默认 '0', 证件 '4',自定义 ’1‘
    },
    // 旋转角度
    rotate: {
      type: Number,
      default: 0
    },
    // 本地上传文件 参数
    uploadProps: {
      type: Object,
      default: () => {
        return {
          drag: true
        }
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    printable: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      btnLoading: false, // 图片本地上传弹窗
      fileList: [],
      delList: [],
      delLoading: false,
      visible: false,
      printDialogConfig: {
        visible: false,
        imageList: [],
        isIndeterminate: true,
        checkAll: false
      }

    }
  },
  computed: {
    imagePreview() {
      return this.fileList.reduce((t, v) => fileType(v) === 'image' ? [...t, getImageUrl(v)] : t, [])
    },
    delPreview() {
      return this.delList.reduce((t, v) => [...t, getImageUrl(v)], [])
    },
    delImagePreview() {
      return this.delList.reduce((t, v) => fileType(v) === 'image' ? [...t, getImageUrl(v)] : t, [])
    }
  },
  watch: {
    fileList: {
      handler(newVal) {
        if (this.multiple) {
          this.$emit('input', this.fileList)
        } else {
          this.$emit('input', this.fileList[0])
        }
      }
    },
    value: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.fileList = this.multiple ? [] : []
          return
        }
        if (oldVal === undefined) {
          this.fileList = this.multiple ? newVal : [newVal]
          return
        }
        if (this.multiple && newVal.join(',') === oldVal.join(',')) {
          return
        } else if (!this.multiple && newVal === oldVal) {
          return
        }
        this.fileList = this.multiple ? newVal : [newVal]
      },
      immediate: true
    }
  },
  render() {
    const { multiple, imagePreview, altimeter, editable, printable, cameraType, mode, rotate, btnLoading, visible, delPreview, delImagePreview, printDialogConfig } = this
    // const { multiple, imagePreview, btnLoading, visible, delPreview, delImagePreview, editable, printable } = this
    const handleUpload = (file) => {
      const formData = new FormData()
      formData.append('file', file)
      this.btnLoading = true
      axiosPost('/upload_file/', formData).then((res) => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        if (this.multiple) {
          this.fileList = [...this.fileList, res.url]
        } else {
          this.fileList = [res.url]
          this.$store.commit('altimeter/SET_VISIBLE', false)
        }

        this.$store.commit('altimeter/SET_LOADING', false)
        this.btnLoading = false
      }).catch(() => {
        this.$store.commit('altimeter/SET_LOADING', false)
        this.btnLoading = false
      })
    }
    const altimeterEvent = {
      click: () => {
        this.$store.commit('altimeter/SET_VISIBLE', true)
        const capture = document.getElementById('capture')
        this.$nextTick(() => {
          if (cameraType === '1') {
            capture.bStopPlay()
            if (rotate) {
              capture.bStartPlayRotate(270)
            } else {
              capture.bStartPlay()
            }
            // capture.bStartPlayRotate(rotate)
            capture.bSetMode(mode)
            if (mode === '1') {
              capture.bSetImageArea(1000, 1000, 8000, 8000)
            }
            // capture.bStartPlayRotate(rotate)
          } else {
            capture.bStopPlay()
            capture.bStartPlay2(0)
          }
        })
        const captureConfirm = document.getElementById('captureConfirm')
        captureConfirm.onclick = null
        captureConfirm.onclick = () => {
          this.$store.commit('altimeter/SET_LOADING', true)
          const imgSrc = 'data:image/jpeg;base64,' + capture.sGetBase64()
          const blob = dataURItoBlob(imgSrc, 'altimeter.jpeg')
          if (blob.size > 100 * 1024) {
            imageCompress(blob, {
              success(result) {
                handleUpload(result)
                // resolve({ file: result })
              }
            })
          } else {
            handleUpload(blob)
          }
        }
      }
    }
    const uploadProps = {
      props: {
        beforeUpload: (file) => {
          if (file.size > 100 * 1024 && fileType(file.name) === 'image') {
            imageCompress(file, {
              success(result) {
                return { file: result }
                // resolve({ file: result })
              }
            })
          } else {
            return file
          }
        },
        httpRequest: (file) => {
          handleUpload(file.file)
        },
        onRemove: () => {},
        ...this.uploadProps,
        action: 'image/*',
        drag: false,
        multiple
      }

    }
    // 打开弹窗
    const openDialog = () => {
      if (!this.fileList.length && editable) {
        this.$message({
          type: 'warning',
          message: '您还未添加图片，请添加图片后再进行此操作'
        })
        return
      }
      this.delList = [...this.fileList]
      this.visible = true
    }
    // 删除图片
    const onRemove = (image) => {
      const index = this.delList.findIndex((v) => image.includes(v))
      this.delList.splice(index, 1)
    }
    const onRemoveSave = () => {
      // this.fileList = [...this.delList]
      // this.visible = false
      this.delLoading = true
      // 删除文件
      const delList = this.fileList.reduce((t, v) => this.delList.includes(v) ? t : [...t, v], [])
      axiosPost('/delete_file/', { file_list: delList }).then(() => {
        this.fileList = [...this.delList]
        this.delLoading = false
        this.visible = true
      }).catch(() => {
        this.delLoading = false
      })
    }
    const printJs = () => {
      if (!printDialogConfig.imageList.length) {
        this.$message({
          type: 'warning',
          message: '请选择要打印的图片'
        })
        return
      }
      printJS({
        printable: printDialogConfig.imageList,
        type: 'image',
        // header: 'Multiple Images',
        imageStyle: 'width:100%;max-height:264mm;'
      })
    }
    const handleCheckAllChange = (val) => {
      this.printDialogConfig.imageList = val ? [...imagePreview] : []
      this.printDialogConfig.isIndeterminate = false
    }
    const handleCheckedCitiesChange = (value) => {
      const checkedCount = value.length
      this.printDialogConfig.checkAll = checkedCount === imagePreview.length
      this.printDialogConfig.indeterminate = checkedCount > 0 && checkedCount < imagePreview.length
    }
    const title = editable ? '查看相关文件（可进行删除）' : '查看相关文件'
    return <div class='capture-wrapper'>
      <div class='button-wrapper'>
        {(editable && altimeter) && <el-button size='mini' type='primary' on={altimeterEvent}>拍摄</el-button>}
        {editable && <el-upload {...uploadProps} >
          <el-button size='small' type='primary' loading={btnLoading}>本地上传</el-button>
        </el-upload>}
        <el-button size='mini' type='primary' onClick={openDialog}>查看</el-button>
        {printable && <el-button size='mini' type='primary' onClick={() => { this.printDialogConfig.visible = true }} style='margin-left:2px'>打印</el-button>}
      </div>
      { /* 查看文件的弹窗 */}
      <el-dialog
        title={title}
        visible={visible}
        show-close={false}
        append-to-body={true}
        class='altimeter-dialog'
      >
        <div class='file-wrapper'>
          {
            delPreview.map((src) => {
              return <el-card class='file-content'>
                {fileType(src) === 'image' && <el-image class='detail-image' src={src} preview-src-list={delImagePreview} z-index={9999} style='width:50px;height:50px' />}
                {fileType(src) === 'excel' && <render-icon icon='excel'/>}
                {fileType(src) === 'pdf' && <render-icon icon='pdf'/>}
                {fileType(src) === 'word' && <render-icon icon='word'/>}
                {fileType(src) === 'other' && <render-icon icon='other-file'/>}
                <div class='name'> <el-link type='primary' href={src} target='_blank'>{path.basename(src).split('&@&')[1]} </el-link></div>
                {editable && <el-button icon='el-icon-delete' plain on={{ click: () => { onRemove(src) } }} class='ml-10' loading={this.delLoading}></el-button> }
              </el-card >
            })

          }
        </div>
        <span slot='footer' class='dialog-footer'>
          <el-button onClick={() => { this.visible = false }}>关 闭</el-button>
          {editable && <el-button type='primary' onClick={onRemoveSave}>保 存</el-button>}
        </span>
      </el-dialog>
      <el-dialog
        title='选择要打印的文件'
        visible={printDialogConfig.visible}
        show-close={false}
        append-to-body={true}
        class='altimeter-dialog'
      >
        <el-checkbox indeterminate={printDialogConfig.indeterminate} vModel={printDialogConfig.checkAll} onChange={handleCheckAllChange}>全选</el-checkbox>
        <el-checkbox-group class='file-wrapper' vModel={this.printDialogConfig.imageList} onChange={handleCheckedCitiesChange}>
          {
            imagePreview.map((src) => {
              return <el-checkbox label={src} checked={printDialogConfig.imageList.includes(src)}>
                <el-card class='file-content'>
                  <el-image class='detail-image' src={src} preview-src-list={delImagePreview} z-index={9999} style='width:50px;height:50px' />
                  <div class='name'> <el-link type='primary' href={src} target='_blank'>{path.basename(src).split('&@&')[1]} </el-link></div>
                  {}
                </el-card >
              </el-checkbox>
            })
          }
        </el-checkbox-group>
        <span slot='footer' class='dialog-footer'>
          <el-button onClick={() => { printDialogConfig.visible = false }}>关 闭</el-button>
          <el-button type='primary' onClick={printJs} disabled={!printDialogConfig.imageList.length}>打印</el-button>
        </span>
      </el-dialog>
    </div>
  }
}

</script>
<style lang="scss">
.capture-wrapper {
  border-radius: 8px;
  background-color:#e6e6e6;
  padding: 5px;
  .no-data {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-wrapper {
    display: flex;
    .el-upload{
      margin:0 2px;
    }
  }
  .el-upload-list {
    display: none;
  }
  .upload-style {
    // width:60px;
    // height: 60px;
     .el-image {
      margin-top: 5px;
      margin-right: 6px;
      text-align: center;
      line-height: 60px;
    }
  }

}
.altimeter-dialog {
  .file-wrapper{
    padding: 10px;
    position: relative;
    display: inline-block;
    display: flex;
    flex-wrap:wrap;
    .file-content {
      margin-top:10px;
      .el-card__body {
        padding: 10px;
        display: flex;
        align-items: center;
      }
      svg{
        font-size: 50px;
      }
      .name {
        width: 120px;
        margin-left: 10px;
      }
    }
    .el-checkbox__label,.el-checkbox__input {
      vertical-align: middle;
    }
  }
}

</style>
