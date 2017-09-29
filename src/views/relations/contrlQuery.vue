<template>
    <div class="over_box">
            <div class="middle_box">
                <div class="inner_box">
                    <p class="qm_title">企业控制路径</p>
                    <p class="qm_state">
                        采取穿透制原则，对目标企业的股东与对外投资层层梳理，通过控制力的挖掘算法，对其股东进行追溯并认定最终的实际控制人（机构）。同时向下对目标企业的对外投资进行控制路径的探寻
                    </p>
                    <div class="qm_bigSearchbox">
                        <div class="w_b">
                            <div class="qm_search">
                                <input id="com_name" type="text" placeholder="输入公司名称/注册号/统一社会信用代码" class="qm_input" v-model.trim="company" @keyup="choose_event($event)" >
                                <span class="sousuo" @click="arrjisuan" id="contrl_arrjisuan">搜索</span>
                            </div>
                            <item-list v-show="$store.state.showlist" @itemZhi="getCompany"></item-list>
                        </div>
                    </div>
                    <ul class="setting">
                        <li>
                            <i class="in_title ceng_title">关系类型：</i>
                            <span class="checkBtn active" id="contrl_checkBtn_1" >
                                <i class="checkStyle"></i>
                                <input name="attIds" type="checkbox" value="entShareholder" v-model="attrIds">
                                <label>企业股东</label>
                            </span>
                            <span class="checkBtn active" id="contrl_checkBtn_2" >
                                <i class="checkStyle"></i>
                                <input name="attIds" type="checkbox" value="personShareholder" v-model="attrIds">
                                <label>人员股东</label>
                            </span>
                            <span class="checkBtn active" id="contrl_checkBtn_3" >
                                <i class="checkStyle"></i>
                                <input name="attIds" type="checkbox" value="entOutInvest" v-model="attrIds">
                                <label>对外投资</label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        data : function(){
            return {
                cxcj:"3",
                attrIds:["entShareholder","personShareholder","entOutInvest"],
                company:"",
                type:"contrlway",
                // rs动态样式
                radioActive : "",
                show:true,
                alreadyClick : false
            }
        },
        mounted($event){
            this.$store.state.showlist=false;
            $(".qm_input").focus();
            var _this = this;
            // 需要更改 改成vue的active动态添加
            $(".checkBtn").on('click',function(){
                if($(this).attr('class').indexOf('active')!=-1){
                    $(this).removeClass('active');
                    for(var i = 0 ;i< _this.attrIds.length;i++){
                        if(_this.attrIds[i] == $(this).find('input').val())
                        _this.attrIds.splice(i,1);
                        $(".qm_input").focus();
                    }
                }else {
                    $(".qm_input").focus();
                    $(this).addClass('active');
                    _this.attrIds.push($(this).find('input').val())
                }
            })
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
            // jisuan:function(n){
            //     // alert(this.rsa(n))
            // },
            getCompany : function(msg){
                this.company = msg;
                this.$store.state.preventMohu =false
                this.$store.state.showlist=false;
                this.alreadyClick = true;
                $(".qm_input").focus();
            },
            choose_event : function(e){
                if(e.keyCode == 13){
                    if(this.alreadyClick&&this.company!=""){
                        this.$store.state.item = [];
                        var attrIds=this.attrIds.join(";"),
                        name=this.company,
                        type=this.type,
                        host = window.location.host
                        window.open(window.location.protocol+"//"+host+"/#/entRelation?attrIds="+attrIds+"&type="+type+"&name="+encodeURIComponent(name))
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
                    var attrIds=this.attrIds.join(";"),
                    name=this.company,
                    type=this.type,
                    host = window.location.host
                    window.open(window.location.protocol+"//"+host+"/#/entRelation?attrIds="+attrIds+"&type="+type+"&name="+encodeURIComponent(name))
                }else{
                    // console.log(3)
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
                .setting{
                    list-style:none;
                    // padding-left:20px;
                    text-align: left;
                    li{
                        width: 720px;
                        overflow:hidden;
                        font-size:16px;
                        .radioBtn{
                            cursor: pointer;
                            width: 128px;
                        }
                        .in_title{
                            float: left;
                            font-style: normal;
                            color:#666;
                        }
                        .ceng_title{
                            height:120px;
                        }
                        span{
                            float: left;
                            color:#666;
                            width: 190px;
                            height: 60px;
                            font-size:16px;
                            &.checkBtn{
                                cursor: pointer;
                            }
                            &.small{
                                width: 130px;
                            }
                            &.checkBtn1{
                                float: left;
                                padding-left: 60px;
                                color:#666;
                            }
                            &.cBtn{
                                float: left;
                                padding-left: 56px;
                                width: 300px;
                                color:#666;
                            }
                            label{
                                color:#666;
                                cursor: pointer;
                                &.rs{
                                    width: 30px;
                                }
                            }
                            input{
                                display: none;
                            }
                            .radioStyle{
                                margin-right: 2px;
                                display: inline-block;
                                position: relative;
                                top:2px;
                                width: 16px;
                                height: 16px;
                                background: url('/static/images/relations/simple_choose_gray.png') no-repeat center;
                                background-size:cover;
                            }
                            .checkStyle{
                                margin-right: 2px;
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                position: relative;
                                top:2px;
                                background: url('/static/images/relations/choose_check.png') no-repeat center;
                                background-size:cover;
                            }
                        }
                    }
                    .active>.radioStyle{
                        background: url('/static/images/relations/simple_choosed_gray.png') no-repeat;
                        background-size:cover;
                    }
                    .active>.checkStyle{
                        background: url('/static/images/relations/choosed_checked.png') no-repeat center;
                        background-size:cover;
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
                    .setting{
                        list-style:none;
                        text-align: left;
                        li{
                            width: 720px*0.85;
                            overflow:hidden;
                            font-size:14px;
                            .radioBtn{
                                cursor: pointer;
                                width: 102px;
                            }
                            .in_title{
                                float: left;
                                font-style: normal;
                                color:#666;
                            }
                            .ceng_title{
                                height:120px*0.85;
                            }
                            span{
                                float: left;
                                color:#666;
                                width: 160.5px;
                                font-size:14px;
                                height: 60px*0.85;
                                &.checkBtn{
                                    cursor: pointer;
                                }
                                &.checkBtn1{
                                    float: left;
                                    padding-left: 60px;
                                    color:#666;
                                }
                                &.small{
                                    width: 130px*0.85;
                                }
                                &.cBtn{
                                    float: left;
                                    padding-left: 56px*0.85;
                                    width: 300px;
                                    color:#666;
                                }
                                label{
                                    color:#666;
                                    cursor: pointer;
                                    &.rs{
                                        width: 30px;
                                    }
                                }
                                input{
                                    display: none;
                                }
                                .radioStyle{
                                    margin-right: 2px;
                                    display: inline-block;
                                    position: relative;
                                    top:2px;
                                    width: 16px*0.85;
                                    height: 16px*0.85;
                                    background: url('/static/images/relations/simple_choose_gray.png') no-repeat ;
                                    background-size:cover;
                                }
                                .checkStyle{
                                    margin-right: 2px;
                                    display: inline-block;
                                    width: 16px*0.85;
                                    height: 16px*0.85;
                                    position: relative;
                                    top:2px;
                                    background: url('/static/images/relations/choose_check.png') no-repeat center;
                                    background-size:cover;
                                }
                            }
                        }
                        .active>.radioStyle{
                            background: url('/static/images/relations/simple_choosed_gray.png') no-repeat;
                            background-size:cover;
                        }
                        .active>.checkStyle{
                            background: url('/static/images/relations/choosed_checked.png') no-repeat center;
                            background-size:cover;
                        }
                    }
                }
            }
        }
    }
</style>