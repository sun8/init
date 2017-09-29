var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 关联测试
  // API_ROOT: '"http://testrs.bidata.com.cn/portal-api/v1"',
  // API_Money: '"http://testrs.bidata.com.cn/platform/v3"',
  // API_ROOTs: '"https://testrs.bidata.com.cn/portal-api/v1"',
  // 关联开发
  // API_ROOT: '"http://192.168.207.12:8037/portal-api/v1"',
  // API_Money: '"http://192.168.207.12:8010/platform/v3"',
  // API_ROOTs: '"https://192.168.207.12:8037/portal-api/v1"',
  // 关联生产
  API_ROOT: '"http://rs.bidata.com.cn/portal-api/v1"',
  API_ROOTs: '"https://rs.bidata.com.cn/portal-api/v1"',
  API_Money: '"https://api.bidata.com.cn/platform/v3"',

  // 风铃
  API_FengLing: '"http://fl.bidata.com.cn:8088/front"',
  // API_FengLing: '"http://fl.bidata.com.cn:8088/front"'
  //企业查询
  API_entChaxun: '"https://api.bidata.com.cn/ent/vientiane/v3"',
  // API_entChaxun: '"http://10.20.20.118:8039/ent/vientiane/v3"'
  //管理驾驶舱
  API_FengLingEcharts:'"http://fl.bidata.com.cn:8088/"',
  API_EntEcharts:'"https://api.bidata.com.cn/dashboard"'

})
