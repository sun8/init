<template>
  <div class="login">
    <!-- BEGIN LOGO -->
      <!-- <div class="logo">
          <a href="index.html">
              <img src="../assets/close_icon_hover.png" alt="" /> </a>
      </div> -->
      <!-- END LOGO -->
      <img src="../assets/loading.gif" class="zloading" alt="" />
      <div class="content">
            <!-- BEGIN LOGIN FORM -->
                <h3 class="form-title">登录到您的帐户</h3>
                <div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span> Enter any username and password. </span>
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">账户</label>
                    <div class="input-icon">
                        <i class="fa fa-user"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="账户"  v-model="vname" name="username" /> </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" @keyup.enter="logins" v-model="vpasswd" name="password" /> </div>
                </div>
                <div class="form-actions">
                    <label class="checkbox">
                        <input type="checkbox" name="remember" value="1" />记住我
                    </label>
                    <button  @click="logins"  class="btn green pull-right">登录</button>
                </div>
                <!-- <div class="login-options">
                    <h4>快捷登录</h4>
                    <ul class="social-icons">
                        <li>
                            <a class="facebook" data-original-title="facebook" href="javascript:;"> </a>
                        </li>
                        <li>
                            <a class="twitter" data-original-title="Twitter" href="javascript:;"> </a>
                        </li>
                        <li>
                            <a class="googleplus" data-original-title="Goole Plus" href="javascript:;"> </a>
                        </li>
                        <li>
                            <a class="linkedin" data-original-title="Linkedin" href="javascript:;"> </a>
                        </li>
                    </ul>
                </div> -->
                <div class="forget-password">
                    <h4>忘记密码 ?</h4>
                    <p> 拨打
                        <a href="javascript:;" id="forget-password"> 4008-905-900 </a> 联系客服 </p>
                </div>
        <!--         <div class="create-account">
                    <p> 您还没有账户吗 ?&nbsp;
                        <a href="javascript:;" id="register-btn"> 申请一个新账户 </a>
                    </p>
                </div> -->
            <!-- END LOGIN FORM -->


        </div>
        <div class="alert alert-warning alert-dismissible zialert" role="alert" v-show="isshowtip">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="top: 3px"><span aria-hidden="true">&times;</span></button>
          {{errMsg}}
        </div>
    <!-- END LOGIN -->
    <div class="timeBack" :class="backImg">
    </div>
  </div>
</template>

<script>
import '../plugin/login.css'
import '../plugin/uniform.default.css'
export default {
  data () {
    return {
      backImg: 'backImg1',
      vname:'',
      vpasswd:'',
      errMsg:'',
      isshowtip:false
    }
  },
  mounted(){
    this.$nextTick(()=>{
        this.timeBack();
    })

  },
  methods:{
    //login
    logins(){
        $('.zloading').show();
        var _this = this;
        var login={
            "username": this.vname,
            "password": this.vpasswd,
        }
         console.log(this.api)
        this.axios.post(this.api.entBase+"/login",login).then((res)=>{

            if(res.data.code == 400){
                window.swal({
                  title: "确认",
                  text: '账户密码错误,请重新登录',
                  type: "info",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "确认",
                  cancelButtonText: "取消",
                  closeOnConfirm: false,
                  closeOnCancel: true
                });

                 $('.zloading').hide();
            }

            var logoUrlB = res.data.token.avatarUrl;

            localStorage.setItem('logoUrlB',logoUrlB);

            var token = res.data.token.token;
            localStorage.setItem('token',token);
            localStorage.setItem('username',_this.vname);
            localStorage.setItem('tokenF',res.data.token.uid);

            this.$router.push({path:"/guanli2"});
            // window.location.reload()
            $('.zloading').hide();
        }).catch(err => {
             console.log(err)


        })
    },
    //back
    timeBack(){
        var  n=0;
        var timer=null;
        setInterval(()=>{
            n++;
           this.backImg = 'backImg'+n;
           if(n==3){
            n=0
           }
        },6000);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zialert{
    position: absolute;
    z-index: 12;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    /*display: none;*/
}
.timeBack{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
    transition: all 1s;
}
.backImg1{
    background-image:url('../assets/bg/1.jpg');
    transition: all 1s;
}
.backImg2{
    background-image:url('../assets/bg/2.jpg');
    transition: all 1s;
}
.backImg3{
    background-image:url('../assets/bg/3.jpg');
    transition: all 1s;
}
/*.backImg4{
    background-image:url('../assets/bg/4.jpg');
    transition: all 1s;
}
.backImg5{
    background-image:url('../assets/bg/5.jpg');
    transition: all 1s;
}
.backImg6{
    background-image:url('../assets/bg/6.jpg');
    transition: all 1s;
}*/
.login{
      /*height: 100%;
    width: 100%;
    position: fixed;*/
}
.login .content{
        position: absolute;
    z-index: 2;
    left: 50%;
    margin-left: -180px;
    top: 150px;
    background: #000000;
    opacity: 0.8;
}
h3 {
    font-size: 24px;
}
h4 {
    font-size: 18px;
        margin-top: 10px;
    margin-bottom: 10px;
}
p{
  margin: 20px 0;
}
.login .content .form-actions{
  margin-left: -10px;
}
.checkbox input[type=checkbox]{
  top: -3px;
}
</style>
