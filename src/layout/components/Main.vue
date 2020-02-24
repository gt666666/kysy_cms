<template>
<div>
  <el-row :gutter="20">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >
      <el-col :lg="6" :md="12" :xs="24"style="font-size: 20px;color: #409EFF;margin-top: -20px;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div >
          <i >
            <svg class="icon" aria-hidden="true" >
              <use xlink:href="#icondaohang"></use>
            </svg>
          </i> &nbsp;&nbsp;{{title}}
        </div>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24" style="margin-left: 800px;color: #409EFF;font-size: 18px;width: 400px;margin-top: -25px;">
<!--        <div style="display: inline-block;margin-left: 700px;color: #409EFF;font-size: 22px " >-->
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#iconnaozhong"></use>
          </svg>
          &nbsp;
          <div id="Date" style="display: inline-block"> </div>
<!--        </div>-->
      </el-col>


    </el-breadcrumb-item>
  </el-breadcrumb>
    <hr style="height:1px;border:none;border-top:1px solid #409EFF;"/>
  </el-row>
<div>
    <router-view />
</div>

</div>

</template>

<script>
    setInterval(function(){
        var date = new Date();
        var year = date.getFullYear();    //获取当前年份
        var mon = date.getMonth()+1;      //获取当前月份
        var da = date.getDate();          //获取当前日
        var day = date.getDay();          //获取当前星期几
        var h = date.getHours();          //获取小时
        var m = date.getMinutes();        //获取分钟
        var s = date.getSeconds();        //获取秒
        var d = document.getElementById('Date');
        d.innerHTML=+year+'年'+mon+'月'+da+'日'+'星期'+day+' '+h+':'+m+':'+s;
    },1000);
  export default {
    data () {
      return {
        title: ''
      }
    },
    methods: {
      getRouter () {
        //console.log(this.$route.matched)
        if (this.$route.matched.length === 1) {
          this.title = this.$route.matched[0].meta.title
        }
        if (this.$route.matched.length === 2) {
          this.title = this.$route.matched[1].meta.title
        }

        //this.items = this.$route.matched.filter(v=> v.meta && v.meta.title);
      },
      logout () {
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '退出成功'
          });

        }).catch(() => {

        });

      }
    },
    created () {
      this.getRouter()
    },
    watch: {
      $route (to, from) {  //监听路由变化
        this.getRouter()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

</style>
