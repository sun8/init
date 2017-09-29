export default function mySelect(divselectid) { //select框

  var divSelect = $(divselectid);
  
  divSelect.each(function(i,element){
    var index = i;
    var ele = $(element);
    ele.off("click.sel");
    ele.on("click.sel",".select-selected",function(){
      
      if(ele.find(".policydetailwrap").length>0){
        ele.find("ul").show();
        ele.find(".policyDetail").show();
        
        var ul = ele.find(".policydetailwrap");
        if( ul.css("display") == "none"){
          ul.slideDown("fast");
        }else{
          ul.slideUp("fast");
        }
      }else{
        var ul = ele.find("ul");
        if( ul.css("display") == "none"){
          ul.slideDown("fast");
        }else{
          ul.slideUp("fast");
        }
      }
      
      return false;
    });
    ele.off("click.ul");
    ele.on("click.ul","ul li",function(){
      var txt = $(this).text();
      ele.find(".select-selected span").html(txt);
      if($(this).attr("id")){
        ele.attr("id",$(this).attr("id"));
      }
      if($(this).attr("name")){
        ele.attr("name",$(this).attr("name"));
      }
      var value = $(this).attr("selectid");
      ele.attr("selectid",value);
      if(ele.find(".policydetailwrap").length>0){

        ele.find(".policydetailwrap").hide();
      }else{
        ele.find("ul").hide();
      }
      
      return false;
    });
    ele.off("click.sec");
    ele.on("click.sec",".section-wrap",function(){
      return false;//防止地图区域消失
    });
    
  });
  $(document).off("click.body");
  $(document).on("click.body","body",function(){
    divSelect.each(function(i,element){
      $(element).find("ul").hide();
      $(element).find(".policydetailwrap").hide();
    });
  });
}