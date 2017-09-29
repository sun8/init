var  fenglingPlugin = {};

fenglingPlugin.install = function(Vue, options) {

	// 判断开始日期与终止日期的大小
	Vue.prototype.getDateSize = function(startDate,endDate) {
			if(startDate && endDate){
				if( (new Date(startDate.replace(/-/g,"\/"))) > (new Date(endDate.replace(/-/g,"\/")))){
					setTimeout(function(){
						window.swal({
							title: "确认",
							text: "终止日期应晚于或等于开始日期",
							type: "info",
							showCancelButton: false,
							confirmButtonColor: "#DD6B55",
							confirmButtonText: "确认",
							cancelButtonText: "取消",
							closeOnConfirm: false,
							closeOnCancel: true
						});
					},200);
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
	};
	// 表格个数不够补数
	Vue.prototype.myTableLessNum = function(totalNum,eleNum){
  	var lessArr =[];
  	if(eleNum<totalNum){
  		var lessNum = totalNum - eleNum;
  		for(var i=0;i<lessNum;i++){
  			lessArr.push(i+1);
  		}
  	}
  	return lessArr;
  }
      // 日期插件点击日期进行搜索
  Vue.prototype.selectTimeAll = function(timeParent,fn){
  	if($(timeParent+" .time").eq(0)){
    	$(timeParent+" .time").eq(0).on("apply.daterangepicker", function(ev, picker) {
    		setTimeout(function(){
    		    fn();
    	    },200);
    	});
  	}
  	if($(timeParent+" .time").eq(1)){
    	$(timeParent+" .time").eq(1).on("apply.daterangepicker", function(ev, picker) {
    		setTimeout(function(){
    		    fn();
    	    },200);
    	});
  	}
  }
}
export default fenglingPlugin