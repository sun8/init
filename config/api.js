// 配置API接口地址
var root = process.env.API_ROOT;
var root_Money = process.env.API_Money;
var roots = process.env.API_ROOTs;
var root_Moneys = process.env.API_Moneys;
var root_FengLing = process.env.API_FengLing
var root_entChaxun = process.env.API_entChaxun
var root_FengLingEcharts = process.env.API_FengLingEcharts
var root_EntEcharts = process.env.API_EntEcharts
console.log(process.env.API_entChaxun)
// 返回在vue模板中的调用接口
export default {
  api: root,
  api_Money:root_Money,
  apis: roots,
  api_Moneys:root_Moneys,
  api_FengLing:root_FengLing,
  api_entChaxun:root_entChaxun,
  api_FengLingEcharts:root_FengLingEcharts,
  api_EntEcharts:root_EntEcharts
}