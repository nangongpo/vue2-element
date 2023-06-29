<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
      <el-button :loading="downloadLoading2" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload2">导出图片和数据到Excel</el-button>
      <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Image" width="220">
        <template slot-scope="scope">
          <el-image :src="scope.row.image_uri" style="height: 40px" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { excel_data_format } from '@/components/BaseTable/utils'
import { getFileFromUrl, fileToBase64 } from '@/utils/image'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      downloadLoading2: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  computed: {
    ...mapGetters(['allOptions'])
  },
  created() {
    this.fetchData()
  },
  // activated() {
  //   console.log('activated', this.list)
  //   !this.list && this.fetchData()
  // },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // data => excel
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date', 'Image']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time', 'image_uri']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    // 导出图片和数据到Excel
    async handleDownload2() {
      // const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date', 'Image']
      // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time', 'image_uri']
      // const list = this.list
      // const data = this.formatJson(filterVal, list)
      const tableTitle = [
        // { label: 'Id', prop: 'id' },
        { label: 'Title', prop: 'title' },
        { label: 'Author', prop: 'author' },
        { label: 'Readings', prop: 'pageviews' },
        { label: 'Date', prop: 'display_time' },
        {
          label: 'Image',
          prop: 'image_uri',
          formatValue: async(item, value) => {
            return value ? await getFileFromUrl(value).then(fileToBase64) : ''
          }
        }
      ]
      const { list, allOptions } = this

      try {
        this.downloadLoading2 = true
        const excel = await import('@/vendor/Export2Excel')
        console.log(excel)
        const { header, data } = await excel_data_format(tableTitle, list, allOptions)

        excel.export_table_to_excel2(header, data, '下载')
        this.downloadLoading2 = false
      } catch (err) {
        this.downloadLoading2 = false
      }

      // getFileFromUrl('/asset_management/notice/file/20303bcf-a9d3-4943-9a21-36758e369103&@&市局资金支队采购200部摩托罗拉之六队%20顾志威领取35部.jpg').then(fileToBase64).then(base64 => {
      //   console.log(base64)
      // })
      // getFileFromUrl('/asset_management/notice/file/0a47a6b1-a523-4b1a-ad43-095b08d338b3&@&市局2000部海格之一队%20范学民领取50部.jpg').then(fileToBase64).then(base64 => {
      //   console.log(base64)
      // })
      // getFileFromUrl('https://img2.baidu.com/it/u=823515100,3889162028&fm=253&fmt=auto&app=120&f=JPEG?w=741&h=1112', '日落黄昏唯美海岛jpg格式图片下载_熊猫办公').then(fileToBase64).then(base64 => {
      //   console.log(base64)
      // })
      // console.log(data)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
