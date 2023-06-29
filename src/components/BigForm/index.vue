<template>
  <!-- 优化表单的渲染和响应， 代完善 -->
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" inline>
    <template v-for="item in formItems">
      <el-form-item :label="item.label" :key="item.prop" v-show="item.visible">
        <el-input v-if="item.type === 'input'" v-model="form[item.prop]"></el-input>
        <el-select-option v-if="item.type === 'select'" filterable multiple v-model="form[item.prop]" :options="item.options" />
        <!-- 其他表单项类型 -->
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
const hobbyOpts = Array.from({ length: 1000 }).map((_, index) => ({
  label: `爱好 ${index}`,
  value: index
}))

const formItems = Array.from({ length: 100 }).map((_, index) => {
  if (index % 2) {
    return { label: `爱好${index}`, prop: `hobby${index}`, type: 'select', options: hobbyOpts, visible: false }
  }
  return { label: `姓名${index}`, prop: `name${index}`, type: 'input', visible: false }
})

export default {
  components: {},
  data() {
    return {
      form: {},
      rules: {},
      formItems
      // formItems: [
      //   { label: '姓名', prop: 'name', type: 'input', visible: false },
      //   { label: '年龄', prop: 'age', type: 'input', visible: false },
      //   { label: '爱好', prop: 'hobby', type: 'select', options: hobbyOpts, visible: false }
      //   // 其他表单项配置
      // ]
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提交表单
        } else {
          // 验证失败
        }
      })
    },
    renderForm() {
      // 遍历表单项数组，渲染可见的表单项
      this.formItems.forEach((item, index) => {
        if (item.visible) {
          return
        }
        this.$set(this.formItems[index], 'visible', true)
      })
      // 根据刷新率调用下一帧渲染函数
      requestAnimationFrame(this.renderForm)
    }
  },
  mounted() {
    // 构建表单模型和验证规则
    this.formItems.forEach(item => {
      this.$set(this.form, item.prop, '')
      this.$set(this.rules, item.prop, [{ required: true, message: `请输入${item.label}`, trigger: 'blur' }])
    })

    // 根据刷新率渲染表单项
    requestAnimationFrame(this.renderForm)
  }
}
</script>
