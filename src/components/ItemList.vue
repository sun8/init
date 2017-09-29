<template>
    <div class="item_list">
        <ul class="list">
        	<li v-for="(item,index) in $store.state.item" @click="item_input(index)" :title=item >{{item}}</li>
        </ul>
    </div>
</template>

<script >
   export default {
   		data:function(){
   			return {
   			}
   		},
   		mounted(){
            $("ul.list li").each(function(){
                $(this).removeClass("cur")
            })
   		},
   		methods : {
   			item_input : function(index){
   				this.$emit('itemZhi',this.$store.state.item[index])
                // 开锁
                this.$store.state.multicheck_isclick = false
            }
   		}
   }
</script>

<style type="text/css">	
    .w_b{
        position: relative;
        width: 100%;
    }
	.w_b .item_list{
		color:#d3d3dd;
    width: 620px;
    height: 280px;
    background-color: #fff; 
		position: absolute;
		z-index: 23;
		top:85px;
    left: 0;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
    -moz-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
    -webkit-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
	}
	.item_list ul.list li{
		padding-left: 20px;
        font-size: 14px;
        font-family: "SimSun";
        line-height: 46px;
        color:#808080;
        text-overflow:ellipsis; 
        white-space:nowrap; 
        overflow:hidden;
        text-align:left;
	}
    .item_list ul.list li.cur{
        background-color: #eceefb;
        cursor: pointer;
        color:#666;
    }
	.item_list ul.list li:hover{
		background-color: #eceefb;
		cursor: pointer;
        color:#666;
	}
  @media screen and (max-width: 1440px){
    .w_b .item_list{
    color:#d3d3dd;
        width: 620px;
        height: 280px;
        background-color: #fff; 
    position: absolute;
    z-index: 23;
    top:79px;
        left: 0;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
    -moz-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
    -webkit-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
  }
  .item_list ul.list li{
    padding-left: 20px;
        font-size: 14px;
        font-family: "SimSun";
        line-height: 46px;
        color:#808080;
        text-overflow:ellipsis; 
        white-space:nowrap; 
        overflow:hidden;
        text-align:left;
  }
  }
</style>