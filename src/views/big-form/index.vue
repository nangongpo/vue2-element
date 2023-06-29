<template>
  <div class="big-form">
    <big-form></big-form>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import BigForm from '@/components/BigForm/index.vue'
export default {
  name: 'MyForm',
  inheritAttrs: false,
  components: { BigForm },
  data() {
    return {
      searchLoading: false,
      searchModel: {}
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
