import axios from 'axios'
import router from "./routes.js";
// axios 配置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = 'http://192.168.206.33:8039/ent/vientiane/v3';
// 拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('token')) {
          config.headers = {
              'X-Token':window.localStorage.getItem('token'),
             // 'X-Token': 'token_ali_c8fa5c96b303a62468a51c22eda61dc0',
              'Content-Type':"application/json;charset=UTF-8"
          }
      }
    return config;
  },
  err => {
    Message({
            message: '加载超时',
            type: 'error'
        });
    return Promise.reject(err);
  });
// code状态码200判断
axios.interceptors.response.use((res) => {
  var code = res.data.code || res.data.CODE;
  if (code !== 200&&code !== 401&&code !== 403) {
    console.log('数据返回有误');
    return Promise.reject(res);
  }else if(code === 401){
    alert("登录时间过长，请重新登录")
    router.push('/login')
    return Promise.reject(res);
  }else if(code === 403){
    alert('您未开通此权限，请联系管理员')
    // router.push('/ModuleCate')
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log(error)
  return Promise.reject(error);
});
export default axios;


