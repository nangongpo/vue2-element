(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f3345920"],{"656b":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h3",[t._v("可自定义宽度，弹框内跳转地址，自定义标题颜色，控制自动隐藏，隐藏时间")]),s("el-button",{on:{click:t.showValue}},[t._v("点击试试")]),s("comPop",{attrs:{"title-type":3},on:{click:t.hiddenCard},scopedSlots:t._u([{key:"title",fn:function(){return[t._v(" Jay ")]},proxy:!0},{key:"footer",fn:function(){return[t._v(" 来自聚凡 ")]},proxy:!0}]),model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[s("p",[t._v("随便写点什么吧")])])],1)},i=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"side-popup",class:{leave:!t.showPushCard,hidden:!t.isStarted},style:{width:t.width+"px"}},[s("div",{staticClass:"popup_title normal",class:"title-custom-"+t.titleType},[s("span",{staticClass:"popup_title_text"},[t._t("title")],2),s("img",{staticClass:"popup_title_icon",attrs:{src:"https://img1.dxycdn.com/2022/0107/052/1476059175561025253-7.png",alt:""},on:{click:function(e){return e.stopPropagation(),t.handleClose.apply(null,arguments)}}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showCard,expression:"showCard"}],staticClass:"popup",style:{width:t.width+"px"},attrs:{url:t.url},on:{click:function(e){return t.$emit("click",e)}}},[s("div",{staticClass:"popup_content"},[t._t("default")],2),s("div",{staticClass:"popup_footer"},[t._t("footer")],2)])])},l=[],n=(s("c975"),{name:"SidePopup",props:{value:{type:Boolean,default:!1},width:{type:String,default:"250"},handleClick:{type:Function,default:()=>{}},url:{type:String,default:""},titleType:{type:Number,default:1,validator:function(t){return-1!==[1,2,3].indexOf(t)}},autoHidden:{type:Boolean,default:!0},delay:{type:Number,default:5e3}},data(){return{showCard:this.value,isStarted:!1}},computed:{showPushCard:{get(){return this.value},set(t){this.$emit("input",t)}}},watch:{showPushCard(t){t?(this.showCard=t,this.isStarted=t,this.autoHidden&&setTimeout(()=>{this.$emit("input",!1)},this.delay)):setTimeout(()=>{this.showCard=t},500)}},methods:{handleClose(){this.showPushCard=!1}}}),u=n,d=(s("b120"),s("2877")),r=Object(d["a"])(u,o,l,!1,null,"876a2b48",null),p=r.exports,c={name:"SidePopup",components:{comPop:p},data(){return{value:!1}},methods:{showValue(){this.value=!0},hiddenCard(t){console.log(t)},hiddenInput(t){this.value=!1}}},h=c,f=Object(d["a"])(h,a,i,!1,null,null,null);e["default"]=f.exports},b120:function(t,e,s){"use strict";s("e8e1")},e8e1:function(t,e,s){}}]);