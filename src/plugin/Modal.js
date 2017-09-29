/*****************
    模态弹框
******************/
import vueModal from '../components/modal.vue'

import $ from 'jquery'  

var alertVm = null;

var Modal = {}
Modal.install = function (Vue, options) {

	  var str = "<div id='VueUIModal'><vue-modal :fathertoson='optModel'></vue-modal></div>";
	  $("body").append(str);

	  // 添加实例方法
	  Vue.prototype.alert = function(opt){
        
        if(alertVm==null) { 
		  	alertVm = new Vue({
		        el : '#VueUIModal',
		        data : {
		            optModel :{
		           	  show:false,
		           	  title:'',
		           	  content:'',
		           	  okText:''
		            }
		        },
		        components:{
		        	vueModal
		        }
		    })
		}

        // 是否显示弹框
        alertVm.optModel.show = true;
        // 弹框标题
	    alertVm.optModel.title = opt.title;
	    // 弹框内容
	    alertVm.optModel.content = opt.content;
	     // 确定按钮
	    alertVm.optModel.okText = opt.okText||'知道了';
	    alertVm.optModel.cancelText = opt.cancelText||'';
	    alertVm.optModel.sureFn = opt.sureFn || '';
        
        alertVm.optModel.ok = null;

        alertVm.optModel.cancel = null;

        // console.log(alertVm.optModel);
        
	    // 确定按钮事件
	    alertVm.optModel.ok = function(){
            alertVm.optModel.show=false;
            alertVm.optModel.sureFn();
	    }
        // 取消按钮事件
	    alertVm.optModel.cancel = function(){
            alertVm.optModel.show=false;
	    }

	 }  
}
export default Modal; 
