<template>
  <div>

    <el-dropdown style="float: right; ">
      <el-button type="primary"
                 style="background-color: #303133;height:57px; border-radius: 13px; border: 1px #409EFF solid">
        用户中心<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="logout">退&nbsp;&nbsp;&nbsp;&nbsp;出&nbsp;&nbsp;&nbsp;&nbsp;</span></el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


      <i style="  font-size: 30px; float: right;margin-top: 5px;margin-right: 23px">
        <svg class="icon" aria-hidden="true" style="font-size: 30px">
          <use xlink:href="#icondashujukeshihuaico-"></use>
        </svg>
      </i>



      <i style="font-size: 40px; float:left; ">
        &nbsp;&nbsp;
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconyiyao" ></use>
        </svg>
      </i>



      <i style="color:#409EFF;font-size: 30px; float:left;margin-top: 7px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昆&nbsp;药&nbsp;商&nbsp;业&nbsp;管&nbsp;理&nbsp;系&nbsp;统
      </i>







  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex' // 导入所有的getters、actions操作
  export default {
    data () {
      return {
        title: ''
      }
    },

    methods: {
      ...mapActions(['setTokenAction', 'setRolesAction']),
      getRouter () {
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
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.setRolesAction([])
          this.setTokenAction('')
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
<style lang="scss">

  .el-menu {
    border: none;
  }
</style>
