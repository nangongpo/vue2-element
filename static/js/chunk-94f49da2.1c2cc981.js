(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-94f49da2"],{"05f3":function(e){e.exports=JSON.parse('[{"label":"号牌号码","prop":"car_number","prop_type":"string","order":1,"display":true,"required":false,"editable":true,"clearable":false,"render":"input","placeholder":null,"null_value_display":true,"options":null},{"label":"号牌种类","prop":"car_color","prop_type":"string","order":2,"display":true,"required":false,"editable":true,"clearable":false,"render":"select","placeholder":null,"null_value_display":true,"options":null},{"label":"通行证类别","prop":"card_category","prop_type":"string","order":3,"display":true,"required":false,"editable":true,"clearable":false,"render":"cascader","placeholder":null,"null_value_display":true,"options":null},{"label":"通行证状态","prop":"flag","prop_type":"string","order":4,"display":true,"required":false,"editable":true,"clearable":false,"render":"select","placeholder":null,"null_value_display":true,"options":null},{"label":"录入时间","prop":"create_time","prop_type":"array","order":5,"display":true,"required":false,"editable":true,"clearable":false,"render":"datetimerange","placeholder":null,"null_value_display":true,"options":null},{"label":"通行证开始时间","prop":"card_start_time","prop_type":"array","order":6,"display":true,"required":false,"editable":true,"clearable":false,"render":"datetimerange","placeholder":null,"null_value_display":true,"options":null},{"label":"审核人","prop":"audit_user","prop_type":"string","order":7,"display":true,"required":false,"editable":true,"clearable":false,"render":"input","placeholder":null,"null_value_display":true,"options":null},{"label":"审核时间","prop":"audit_time","prop_type":"array","order":8,"display":true,"required":false,"editable":true,"clearable":false,"render":"datetimerange","placeholder":null,"null_value_display":true,"options":null},{"label":"审核状态","prop":"audit_status","prop_type":"string","order":9,"display":true,"required":false,"editable":true,"clearable":false,"render":"select","placeholder":null,"null_value_display":true,"options":null},{"label":"上传图片","prop":"images","prop_type":"string","prop_width":0,"order":10,"display":true,"required":false,"editable":true,"clearable":false,"render":"image","placeholder":"只能上传jpg/jpeg文件，且不超过500kb","null_value_display":true,"options":null},{"label":"上传文件","prop":"files","prop_type":"string","prop_width":0,"order":11,"display":true,"required":false,"editable":true,"clearable":false,"render":"file","placeholder":"只能上传excel文件，且不超过500kb","null_value_display":true,"options":null}]')},"25c5":function(e,r,l){"use strict";l.r(r);var t=function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("my-form",{ref:"read",staticClass:"app-container",attrs:{fields:e.fields,model:e.model,rules:e.rules,"label-as-placeholder":"",inline:""},scopedSlots:e._u([{key:"input",fn:function(r){var t=r.prop,a=r.attrs;return[l("el-input",e._b({model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}},"el-input",a,!1))]}},{key:"select",fn:function(r){var t=r.prop,a=r.attrs;return[l("el-select-option",e._b({attrs:{options:e.allOptions[t]},model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}},"el-select-option",a,!1))]}},{key:"cascader",fn:function(r){var t=r.prop,a=r.attrs;return[l("el-cascader",e._b({model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}},"el-cascader",a,!1))]}},{key:"datetimerange",fn:function(r){var t=r.prop;return[l("el-date-picker",{attrs:{type:"datetimerange",align:"right","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","23:59:59"]},model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}})]}},{key:"image",fn:function(r){var t=r.prop,a=r.attrs,n=r.config;return[l("el-upload-image",e._b({attrs:{config:n,"on-preview":e.onPreview,"http-request":e.httpRequest},model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}},"el-upload-image",a,!1)),e.previewInfo.src?l("el-image",e._b({ref:"preview",staticStyle:{display:"none"}},"el-image",e.previewInfo,!1)):e._e()]}},{key:"file",fn:function(r){var t=r.prop,a=r.attrs,n=r.config;return[l("el-upload-file",e._b({attrs:{config:n,"on-preview":e.onPreview},model:{value:e.model[t],callback:function(r){e.$set(e.model,t,r)},expression:"model[prop]"}},"el-upload-file",a,!1))]}},{key:"default",fn:function(){return[l("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.onSubmit("read")}}},[e._v("提交")]),l("el-button",{on:{click:function(r){return e.onReset("read")}}},[e._v("重置")])]},proxy:!0}])})},a=[],n=(l("ac1f"),l("1276"),l("d3b7"),l("d9e2"),l("05f3"));var o={select:n},i=l("2638"),p=l.n(i),u=l("2909"),s=l("ade3"),d=l("5530"),c=l("15fd"),f=(l("4e82"),l("fb6a"),l("99af"),l("53ca"));l("b64b"),l("caad");function b(e,r){return e("pre",{style:{color:"red"}},r.stack)}function m(e){return Object.keys(e).reduce((function(r,l){return null!==e[l]?Object(d["a"])(Object(d["a"])({},r),{},Object(s["a"])({},l,e[l])):r}),{})}function y(e){return["number","boolean"].includes(Object(f["a"])(e))||Array.isArray(e)&&e.length>0||!!e}function _(e,r,l){var t=r.render,a=r.prop,n=r.prop_width,o=r.disabled;if("image"===t){var i=l[a],p=Array.isArray(i)?i.length:i&&i.indexOf(",")>-1?i.split(",").length:1;p=o?p:p+1;var u=148;return p*u+10*(p-1)}var s=80,d=(parseInt(e)-s)*n;if(n)return d}var v,h,g=["prop","label","render","null_value_display","display","prop_type","prop_width","label_width","required","editable","placeholder","order"],w={functional:!0,props:{width:{type:String,default:""},fields:{type:Array,default:function(){return[]}},rules:{type:Object,default:function(){return{}}},labelAsPlaceholder:{type:Boolean,default:!0}},render:function(e,r){var l=r.props,t=r.data,a=r.scopedSlots,n=l.width,o=l.fields,i=l.rules,f=l.labelAsPlaceholder,v=t.attrs.model,h={},w=function(e,r){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"-",t=h[e];if(!Array.isArray(t))return r||l;var a=function e(r,l){return r.reduce((function(r,t){var a=t.value===l;return a?t.label:Array.isArray(t.children)&&t.children.length&&e(t.children,l)||r}),"")};return a(t,r)||r||l},k=o.slice().sort((function(e,r){return e.order-r.order})),j={},q=k.reduce((function(r,l,t){var o=l.prop,p=l.label,h=l.render,k=l.null_value_display,q=l.display,A=l.prop_type,O=l.prop_width,x=(l.label_width,l.required),$=l.editable,P=l.placeholder,S=l.order,J=Object(c["a"])(l,g),I=k?q:y(v[o]),Z=!!h;if(I){if(x){var D={type:A,required:x,message:P||"请填写".concat(p)};j[o]=i[o]?[D,i[o]]:[D]}var F=Z?v[o]:w(o,v[o]),N=P||(f?p:P),R={config:l,prop:o,attrs:m(Object(d["a"])({placeholder:N,"data-order":S,disabled:!$},J))},E={width:"".concat(_(n,l,v),"px")},H=e("el-form-item",{attrs:{prop:o,label:p},key:t,class:Object(s["a"])({},"el-form-item--".concat(O),void 0!==O),style:E},[Z?"function"===typeof a[h]?a[h](R):b(e,{stack:"".concat(h," slot is undefined")}):F]);return[].concat(Object(u["a"])(r),[H])}return r}),[]);return e("el-form",p()([{},t,{scopedSlots:{},attrs:{rules:j,"validate-on-rule-change":!1}}]),[q,a.default&&a.default(r)])},renderError:b},k=w,j=(l("3bee"),l("2877")),q=Object(j["a"])(k,v,h,!1,null,null,null),A=q.exports,O={components:{MyForm:A},data:function(){return{fields:o.select,model:{state:"select",images:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"},rules:{car_number:{pattern:"^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})|([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$",message:"车牌号格式不正确"}},allOptions:{car_color:[{label:"黄牌",value:"01"}]},previewInfo:{}}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{onSubmit:function(e){var r=this;console.log(this.$refs[e]),this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(r.model)}))},onReset:function(e){this.$refs[e].resetFields()},onPreview:function(e,r){var l=this.model[r.prop]||"";this.previewInfo={src:e,previewSrcList:l.split(",")},this.$refs.preview&&(this.$refs.preview.showViewer=!0)},httpRequest:function(e,r){return new Promise((function(e,r){var l=Math.floor(4*Math.random()),t=["https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"+"?t=".concat((new Date).getTime()),"https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"+"?t=".concat((new Date).getTime()),""][l];t?e(t):r(new Error("请求失败"))}))}}},x=O,$=(l("893a"),Object(j["a"])(x,t,a,!1,null,"7908e0bc",null));r["default"]=$.exports},"3bee":function(e,r,l){"use strict";l("fd7b")},8682:function(e,r,l){},"893a":function(e,r,l){"use strict";l("8682")},fd7b:function(e,r,l){}}]);