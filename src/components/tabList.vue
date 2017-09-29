<template>
  <div >
    <ul class="liulan clearfix">
        <li class="jilustyle" v-for="(item,index) in jiluTab" @click="routerJilu(item.pathHref)">
            {{item.name}}
            <span @click.stop="removeJilu(jiluTab[index])">×</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      jiluTab:[],
    }
  },
  
  methods:{
    jiluAllLi(event){
        var jiluArr = this.jiluTab;
        var jiluJson = {};
 
        var locataionH= window.location.href;
        var n= locataionH.indexOf('#/');
        var pathHref= locataionH.substring(n);

            jiluJson.name = event,
            jiluJson.pathHref = pathHref;

            var qucunAr=[];
            for(var i =0 ; i<jiluArr.length; i++){
                for(var ite in jiluArr[i]){
                    qucunAr.push(jiluArr[i][ite])
                }
            }
            if(qucunAr.indexOf(event) == -1){
                jiluArr.push(jiluJson);
            }
            this.jiluTab = jiluArr;

      },
      removeJilu(eve){
        var removeArr = this.jiluTab;
        console.log(removeArr)
        console.log(eve)
        for(var i=0; i<removeArr.length; i++){
            if(removeArr[i]==eve){
                console.log(removeArr.indexOf(removeArr[i]))
                removeArr.splice(removeArr.indexOf(removeArr[i]),1)
                 console.log(removeArr)
            }
        }
      },
      routerJilu(pa){
        console.log(pa)
        var ah=pa.substring(1)
        console.log(ah)
        this.$router.push(ah);
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.liulan li{
    float: left;
    margin-left: 20px;
}
.jilustyle{
        background-color: #8391a5;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px !important;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: pointer;
}
.jilustyle span{
    padding-left: 5px;
    font-size: 14px;
}
</style>
