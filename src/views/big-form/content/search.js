export default [
  {
    label: '公共条件',
    label_class: 'text-danger',
    prop_width: 1
  },
  {
    label: '录入时间',
    prop: 'lrsj',
    prop_type: 'array',
    prop_width: 1,
    value_width: 320,
    display: true,
    editable: true,
    clearable: true,
    required: true,
    render: 'date',
    type: 'datetimerange',
    defaultTime: ['00:00:00', '23:59:59'],
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '至',
    'unlink-panels': true
  },
  {
    label: '违法时间',
    prop: 'wfsj',
    prop_type: 'array',
    prop_width: 1,
    value_width: 320,
    display: true,
    editable: true,
    clearable: true,
    required: true,
    render: 'date',
    type: 'datetimerange',
    defaultTime: ['00:00:00', '23:59:59'],
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '至',
    'unlink-panels': true
  },
  {
    label: '裁决时间',
    prop: 'cjsj',
    prop_type: 'string',
    prop_width: 1,
    value_width: 320,
    display: false,
    editable: true,
    clearable: true,
    render: 'date',
    type: 'datetimerange',
    defaultTime: ['00:00:00', '23:59:59'],
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '至',
    'unlink-panels': true
  },
  {
    label: '信息来源',
    prop: 'xxly',
    prop_type: 'string',
    prop_width: 340,
    display: true,
    editable: true,
    clearable: false,
    render: 'radio',
    options: [
      { label: '全部', value: '' },
      { label: '1-现场', value: '1' },
      { label: '2-非现场', value: '2' }
    ]
  },
  {
    label: '转递记录标记',
    prop: 'zdjlbj',
    prop_type: 'string',
    prop_width: 340,
    display: true,
    editable: true,
    clearable: false,
    render: 'radio',
    options: [
      { label: '全部', value: '' },
      { label: '0-本地', value: '0' },
      { label: '1-异地转入', value: '1' }
    ]
  },
  { prop_class: 'block' }, // 换行
  {
    label: '裁决标记',
    prop: 'cjbj',
    prop_type: 'string',
    prop_width: 340,
    display: true,
    editable: true,
    clearable: false,
    render: 'radio',
    options: [
      { label: '全部', value: '' },
      { label: '0-未裁决', value: '0' },
      { label: '1-已裁决', value: '1' }
    ]
  },
  // {
  //   label: '交款标记',
  //   prop: 'jkbj',
  //   prop_type: 'string',
  //   prop_width: 340,
  //   display: true,
  //   editable: true,
  //   clearable: false,
  //   render: 'radio',
  //   options: [
  //     { label: '全部', value: '' },
  //     { label: '0-未交款', value: '0' },
  //     { label: '1-已交款', value: '1' }
  //   ]
  // },
  { render: 'button' },
  { prop_class: 'block line' }, // 分割线
  {
    label: '采集方式',
    prop: 'cjfs',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    required: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    showOptionValue: true,
    options: [
      { label: '方式1', value: '1' }
    ]
  },
  {
    label: '人员分类',
    prop: 'ryfl',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: false,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    showOptionValue: true
  },
  {
    label: '道路类型',
    prop: 'dllx',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    showOptionValue: true
  },
  { prop_class: 'block line' }, // 分割线
  {
    label: '车辆分类条件',
    label_class: 'text-danger',
    prop_width: 1
  },
  {
    label: '使用性质',
    prop: 'syxz',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    showOptionValue: true
  },
  {
    label: '号牌种类',
    prop: 'hpzl',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select'
    // showOptionValue: true
  },
  {
    label: '交通方式',
    prop: 'jtfs',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    showOptionValue: true
  },
  { prop_class: 'block line' }, // 分割线
  {
    label: '违法行为',
    prop: 'wfxw',
    prop_type: 'array',
    prop_width: 498,
    value_width: 425,
    display: true,
    editable: true,
    clearable: true,
    filterable: true,
    placeholder: '请输入关键词检索',
    render: 'select',
    multiple: true,
    showOptionValue: true
  },
  // {
  //   label: '违法计分数',
  //   prop: 'wfjfs',
  //   prop_type: 'string',
  //   prop_width: 0,
  //   value_width: 172,
  //   display: false,
  //   editable: true,
  //   render: 'select',
  //   options: ['0', '1', '2', '3', '6', '9', '12'].map((value) => {
  //     return { label: `${value}分`, value }
  //   })
  // },
  { display: false, prop_width: 1, prop_class: 'none line mb-0' }, // 分割线
  {
    label: '号牌号码',
    prop: 'hphm',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: false,
    editable: true,
    render: 'input'
  },
  {
    label: '决定书编号',
    prop: 'jdsbh',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: false,
    editable: true,
    render: 'input'
  },
  {
    label: '当事人长度',
    prop: 'dsr_length_gt1',
    prop_type: 'boolean',
    prop_width: 0,
    value_width: 172,
    display: false,
    editable: true,
    render: 'switch',
    options: [
      { label: '大于1', value: true },
      { label: '全部', value: false }
    ]
  },
  { display: false, prop_width: 1, prop_class: 'none line mb-0' }, // 分割线
  {
    display: false,
    label: '管理部门',
    label_class: 'text-danger',
    prop_width: 1
  },
  {
    label: '发现机关',
    prop: 'fxjg',
    prop_type: 'string',
    prop_width: 0,
    value_width: 172,
    display: false,
    editable: true,
    clearable: true,
    filterable: true,
    render: 'select',
    formatOptions: (allOptions) => allOptions.glbm
  }
  // {
  //   label: '裁决机关',
  //   prop: 'cjjg',
  //   prop_type: 'string',
  //   prop_width: 0,
  //   value_width: 172,
  //   display: false,
  //   editable: true,
  //   clearable: true,
  //   filterable: true,
  //   render: 'select',
  //   formatOptions: (allOptions) => allOptions.glbm
  // }
]
