<template>
  <my-tinymce
    v-if="loading"
    v-model="agreement"
    :height="1600"
  >
    <!-- <el-button size="mini" type="primary" @click="handleAttachment">{{ drawerConfig.title }}</el-button> -->
  </my-tinymce>
</template>

<script>
import MyTinymce from '@/components/Tinymce'
export default {
  name: 'Tinymce',
  components: { MyTinymce },
  data() {
    return {
      loading: true,
      agreement: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    this.loading = true
    setTimeout(() => {
      next()
    }, 0)
  },
  methods: {

  }
}
</script>
