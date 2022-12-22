<script>
import { readCard } from '@/utils/readCard.js'
export default {
  render() {
    const { $attrs, $listeners } = this
    const buttonEvent = {
      click: () => {
        const data = readCard()
        if (data.ok) {
          this.$emit('input', data.info.CardNo)
        } else {
          this.$message({ type: 'error', message: data.error })
        }
      }
    }
    return <el-input attrs={$attrs} on={$listeners}>
      <template slot='append'>
        <el-button on={buttonEvent}>读卡</el-button>
      </template>
    </el-input>
  }
}

</script>
<style lang="scss" scoped>
.wrapper { display: block; }
</style>
