<template>
    <div class="over_box">
        <div class="middle_box">
            <div class="inner_box">
                <p class="qm_title">企业实质关联族谱</p>
                <p class="qm_state">
                    企业实质关联族谱旨在为客户审查企业风险时，从大量繁复的关系网路中，按照官方对关联方认定标准，通过数据挖掘与“控制力”算法的处理，抽离、梳理出其可能构成实际控制或直接重大影响的核心关联族群，在实际业务场景中，满足集团客户核心族群认定或对该企业进行风险判定时，降低甄别与筛选工作
                </p>
                <div class="qm_bigSearchbox">
                    <div class="w_b">
                        <div class="qm_search">
                            <input id="com_name" type="text" placeholder="输入公司名称/注册号/统一社会信用代码" class="qm_input" v-model.trim="company" @keyup="choose_event($event)">
                            <span class="sousuo" @click="arrjisuan">搜索</span>
                        </div>
                        <item-list v-show="$store.state.showlist" @itemZhi="getCompany"></item-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data : function(){
            return {
                company:"",
                type:"essence",
                alreadyClick : false
            }
        },
        mounted($event){
            // console.log(window.location.protocol) http:
            this.$store.state.showlist=false;
            $(".qm_input").focus();
        },
        components : {

        },
        watch:{
            company(curval,b){
                var _this = this
                clearTimeout(this.timer);
                this.timer = setTimeout(function(){
                    _this.watch_axios(curval)
                },500)
            }
        },
        methods: {
            watch_axios:function(curval){
                var _this = this
                if(curval.length == 0){
                    // console.log(0)
                    this.$store.state.item = [];
                    this.$store.state.showlist=false
                    return;
                }
                if(curval.length>=2&&this.$store.state.preventMohu){
                    // console.log(1)
                    // 清零
                    this.$store.state.mohuIndex = 0;
                    var _this = this ;
                    this.axios.get(_this.api.blurredQuery+encodeURIComponent(curval)).then(function(res){
                        _this.$store.state.item = [];
                        if(res.data.code == 200){
                            _this.alreadyClick = false;
                            _this.$store.state.showlist=true;
                            for(var i = 0 ; i<res.data.result.length; i++){
                                if(i<6){
                                    _this.$store.state.item.push(res.data.result[i].entName)
                                }
                            }
                        }else if(res.data.code == 404 || res.data.CODE == 404){
                          window.swal({
                            title: "确认",
                            text: "未找到相关企业",
                            type: "info",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: true
                          });
                        }
                    }).catch(function(err){
                        _this.alreadyClick = false;
                            // console.log(_this.alreadyClick)
                        _this.$store.state.item = []
                        _this.$store.state.showlist=false;
                    })
                }else{
                    // console.log(2)
                    this.$store.state.item = [];
                    this.$store.state.showlist=false
                    this.$store.state.preventMohu = true
                }
            },
            // lose_focus:function(){
            //     this.$store.state.showlist=false
            // },
            getCompany : function(msg){
                // console.log(msg)
                this.company = msg;
                this.$store.state.preventMohu =false
                this.$store.state.showlist=false;
                this.alreadyClick = true;
                $(".qm_input").focus();
                // console.log(this.alreadyClick)

                // console.log("hh")
            },
            choose_event : function(e){
                if(e.keyCode == 13){
                    if(this.alreadyClick&&this.company!=""){
                        this.$store.state.item = [];
                        var name=this.company,
                        type=this.type,
                        host = window.location.host
                        window.open(window.location.protocol+"//"+host+"/#/entRelation?type="+type+"&name="+encodeURIComponent(name))
                        // console.log("sousuo")
                    }else if(this.$store.state.mohuIndex != 0){
                        // console.log(this.$store.state.mohuIndex)
                        this.company = this.$store.state.item[this.$store.state.mohuIndex-1];
                        this.$store.state.showlist = false;
                        this.$store.state.preventMohu = false;
                        this.alreadyClick=true;
                        // this.arrjisuan();
                    }else if(!this.alreadyClick){
                        window.swal({
                            title: "确认",
                            text: "请输入或选择要查询的企业！！",
                            type: "info",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: true
                        });
                        return;
                    }
                }else if(e.keyCode == 40){
                    if(this.$store.state.item.length!=0){
                        this.$store.state.mohuIndex++;
                        // 验收
                        if(this.$store.state.mohuIndex>this.$store.state.item.length){
                            this.$store.state.mohuIndex = 1;
                        }
                        $("ul.list li").eq(this.$store.state.mohuIndex-1).addClass("cur").siblings().removeClass("cur");
                    }
                }else if(e.keyCode == 38){
                    if(this.$store.state.item.length!=0){
                        this.$store.state.mohuIndex--;
                        // 验收
                        if(this.$store.state.mohuIndex<=0){
                            this.$store.state.mohuIndex = this.$store.state.item.length;
                        }
                        // console.log(this.$store.state.mohuIndex)
                        $("ul.list li").eq(this.$store.state.mohuIndex-1).addClass("cur").siblings().removeClass("cur");
                    }
                }
            },
            arrjisuan:function(){
                if(this.company==""&&event.keyCode==13){
                    // this.$store.state.tipshow = true
                    window.swal({
                        title: "确认",
                        text: "请输入或选择要查询的企业！！",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                }else if(this.alreadyClick&&this.company!=""){
                    this.$store.state.item = [];
                    var name=this.company,
                        type=this.type,
                        host = window.location.host
                        window.open(window.location.protocol+"//"+host+"/#/entRelation?type="+type+"&name="+encodeURIComponent(name))
                }else{
                    this.$store.state.showlist=false;
                    window.swal({
                        title: "确认",
                        text: "请输入或选择要查询的企业！！",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                }
            }
        }
    }
</script>


<style lang="scss" scoped >
    .over_box{
        width:100%;
        height:740px;
        display:table;
        font-family: "microsoft YaHei";
        background-color:#fff;
        .middle_box{
            display:table-cell;
            text-align:center;
            vertical-align:middle;
            .inner_box{
                position: relative;
                top:-88px;
                width:730px;
                display:inline-block;
                .qm_title{
                    width:730px;
                    padding-bottom: 45px;
                    color:#666;
                    font-size:50px;
                    font-family:"microsoft yahei";
                    font-weight:400;
                    text-align: center;
                }
                .qm_state{
                    width:100%;
                    font-size:15px;
                    line-height:25px;
                    color:#666;
                    text-align: center;
                }
                .qm_bigSearchbox{
                    width: 730px;
                    .qm_search{
                        width:100%;
                        padding:40px 0 40px 0;
                        overflow:hidden;
                        .qm_input{
                            float: left;
                            padding-left:20px;
                            width: 620px;
                            height:45px;
                            background:rgba(255,255,255,0.2);
                            border:1px solid #5B9BD1;
                            font-size:16px;
                            color:#666;
                        }
                        .sousuo{
                            display: block;
                            float: right;
                            width: 110px;
                            height:45px;
                            background-color:#5B9BD1;
                            cursor:pointer;
                            line-height:45px;
                            text-align:center;
                            font-size:16px;
                            color:#fff;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1440px){
        .over_box{
            position:relative;
            z-index:2;
            min-height:740px;
            width:100%;
            height:100%;
            display:table;
            font-family: "microsoft YaHei";
            .middle_box{
                display:table-cell;
                text-align:center;
                vertical-align:middle;
                .inner_box{
                    position:relative;
                    width:730px*0.85;
                    display:inline-block;
                    position: relative;
                    top:-88px;
                    .qm_title{
                        width:730px*0.85;
                        padding-bottom: 45px*0.85;
                        color:#666;
                        font-size:36px;
                        font-family:"microsoft yahei";
                        font-weight:400;
                        text-align: center;
                    }
                    .qm_state{
                        width:100%;
                        font-size:14px;
                        line-height:25px*0.85;
                        color:#666;
                        text-align: center;
                    }
                    .qm_bigSearchbox{
                        width: 730px*0.85;
                        .qm_search{
                            width:100%;
                            padding:40px*0.85 0 40px*0.85 0;
                            overflow:hidden;
                            .qm_input{
                                float: left;
                                padding-left:20px;
                                width: 620px*0.85;
                                height:45px;
                                background:rgba(255,255,255,0.2);
                                border:1px solid #5B9BD1;
                                font-size:14px;
                                color:#666;
                            }
                            .sousuo{
                                display: block;
                                float: right;
                                width: 110px*0.85;
                                height:45px;
                                background-color:#5B9BD1;
                                cursor:pointer;
                                line-height:45px;
                                text-align:center;
                                font-size:14px;
                                color:#fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>