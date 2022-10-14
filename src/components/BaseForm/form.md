## 配置项说明

| 字段 | 描述 | 数据类型 | 默认值 |
| -- | -- | -- | -- |
| label | 表单项名称 |  string | | 
| label_width | 表单项名称所占宽度 | number | 0 | 
| label_class | 表单项名称样式 | string | |
| value_width | 表单项值所占宽度 | number | 0 |
| prop_width | 表单项所占宽度 | number | 0 |
| prop_height | 表单项所占高度 | number | 0 |
| prop_min_width | 表格列所占的最小宽度 | number | 0 | 
| prop_class | 表单项el-form-item的class属性 | string | | 
| prop | 表单对应字段 | string | | 
| prop_type | 表单项值的类型, 可选值 array、string、number、boolean | string | |
| table_type | 对应el-table-column的type, 可选值 selection、index | string | | 
| display | 是否显示 | boolean | true | 
| required | 是否必填 | boolean | false | 
| editable | 是否编辑 | boolean | false |
| null_value_display | 表单项为空值的时候是否需要显示 | boolean | true |
| options | 表单项的选项 | array | |
| other_attrs | el-form-item 或 el-table-column的属性 | object | |
| formatValue | 表单项值的处理 | function | | 
| formatOptions | 表单项选项的处理 | function | |
| render | 表单项值的渲染 | string或function | |