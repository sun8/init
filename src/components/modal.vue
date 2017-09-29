<template>
  <div class="modal" v-show="fathertoson.show">
    <div class="modal_dialog">
        <div class="modal_top">
            <i class="tip_icon"></i>
            <p class="tip_text">提示</p>
            <p class="tip_content">{{fathertoson.content}}</p>
        </div>
        <div class="modal_bottom" v-if="!fathertoson.cancelText">
            <div class="tip_button" @click="cancel()">{{fathertoson.okText}}</div>
        </div>
        <div class="modal_bottom cancel" v-if="fathertoson.cancelText">
            <div class="tip_button" @click="cancel()">{{fathertoson.cancelText}}</div>
            <div class="tip_button sure" @click="ok()">{{fathertoson.okText}}</div>
        </div>
    </div>
   </div>
</template>
<script>
   export default {
    props:["fathertoson"],
   	methods:{
        ok:function(){
            this.fathertoson.ok();
        },
        cancel:function(){
            this.fathertoson.cancel();
        }
   	}
   }
</script>
<style type="text/css" lang="scss" scoped>
    .modal{
        width:100%;
        height:100%;
        background-color:rgba(0,6,36,0.8);
        position:fixed;
        z-index:2002;
        .modal_dialog{
            position:fixed;
            z-index:2003;
            top:0px;
            width:428px;
            height:270px;
            background-color:#fff;
            top:50%;
            left:50%;
            margin-left:-214px;
            margin-top:-135px;
            .modal_top{
                width:100%;
                height:178px;
                background-color:#6d9add;
                text-align:center;
                display: table;
                .tip_icon{
                    display:block;
                    width:100%;
                    height:71px;
                    background:url(/static/images/icon_tips.png) no-repeat;
                    background-position:194px 31px;
                }
                .tip_text{
                    color:#fff;
                    font-size:20px;
                    font-family:"微软雅黑";
                    padding-top:26px;
                }
                .tip_content{
                    font-size:14px;
                    color:#fff;
                    font-family:"宋体";
                    padding-top:13px;
                }
            }
            .modal_bottom{
                width:100%;
                height:92px;
                text-align:center;
                padding:25px 0 0 146px;

                .tip_button{
                    width:138px;
                    height:40px;
                    background-color:#6d9add;
                    color:#fff;
                    font-size:14px;
                    font-family:"宋体";
                    line-height:40px;
                    text-align:center;
                    cursor: pointer;
                }
                &.cancel{
                    padding:25px 0 0 66px;
                    .tip_button{
                        float: left;
                        &.sure{
                            margin-left:30px;
                        }
                    }
                }
            }
        }
    }
</style>