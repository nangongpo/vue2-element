(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-519c66c7"],{1:function(e,t){},2:function(e,t){},3:function(e,t){},"66c3":function(e,t,a){},a137:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("upload-excel-component",{attrs:{"on-success":e.handleSuccess,"before-upload":e.beforeUpload}}),a("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.tableData,border:"","highlight-current-row":""}},e._l(e.tableHeader,(function(e){return a("el-table-column",{key:e,attrs:{prop:e,label:e}})})),1)],1)},s=[],l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("input",{ref:"excel-upload-input",staticClass:"excel-upload-input",attrs:{type:"file",accept:".xlsx, .xls"},on:{change:e.handleClick}}),a("div",{staticClass:"drop",on:{drop:e.handleDrop,dragover:e.handleDragover,dragenter:e.handleDragover}},[e._v(" Drop excel file here or "),a("el-button",{staticStyle:{"margin-left":"16px"},attrs:{loading:e.loading,size:"mini",type:"primary"},on:{click:e.handleUpload}},[e._v(" Browse ")])],1)])},n=[],o=(a("14d9"),a("ac1f"),a("00b4"),a("e693")),i=a.n(o),c={props:{beforeUpload:Function,onSuccess:Function},data(){return{loading:!1,excelData:{header:null,results:null}}},methods:{generateData({header:e,results:t}){this.excelData.header=e,this.excelData.results=t,this.onSuccess&&this.onSuccess(this.excelData)},handleDrop(e){if(e.stopPropagation(),e.preventDefault(),this.loading)return;const t=e.dataTransfer.files;if(1!==t.length)return void this.$message.error("Only support uploading one file!");const a=t[0];if(!this.isExcel(a))return this.$message.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;this.upload(a),e.stopPropagation(),e.preventDefault()},handleDragover(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},handleUpload(){this.$refs["excel-upload-input"].click()},handleClick(e){const t=e.target.files,a=t[0];a&&this.upload(a)},upload(e){if(this.$refs["excel-upload-input"].value=null,!this.beforeUpload)return void this.readerData(e);const t=this.beforeUpload(e);t&&this.readerData(e)},readerData(e){return this.loading=!0,new Promise((t,a)=>{const r=new FileReader;r.onload=e=>{const a=e.target.result,r=i.a.read(a,{type:"array"}),s=r.SheetNames[0],l=r.Sheets[s],n=this.getHeaderRow(l),o=i.a.utils.sheet_to_json(l);this.generateData({header:n,results:o}),this.loading=!1,t()},r.readAsArrayBuffer(e)})},getHeaderRow(e){const t=[],a=i.a.utils.decode_range(e["!ref"]);let r;const s=a.s.r;for(r=a.s.c;r<=a.e.c;++r){const a=e[i.a.utils.encode_cell({c:r,r:s})];let l="UNKNOWN "+r;a&&a.t&&(l=i.a.utils.format_cell(a)),t.push(l)}return t},isExcel(e){return/\.(xlsx|xls|csv)$/.test(e.name)}}},d=c,u=(a("a756"),a("2877")),p=Object(u["a"])(d,l,n,!1,null,"00297fab",null),h=p.exports,f={name:"UploadExcel",components:{UploadExcelComponent:h},data(){return{tableData:[],tableHeader:[]}},methods:{beforeUpload(e){const t=e.size/1024/1024<1;return!!t||(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess({results:e,header:t}){this.tableData=e,this.tableHeader=t}}},g=f,x=Object(u["a"])(g,r,s,!1,null,null,null);t["default"]=x.exports},a756:function(e,t,a){"use strict";a("66c3")}}]);