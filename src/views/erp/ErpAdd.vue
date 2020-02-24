<template>
  <el-form ref="tableform"  :rules="rules" :model="tableform" label-width="300px" style="margin-top:50px">
    <el-form-item label="主表名" prop="masterTableName">
      <el-input style="width: 40%"
        placeholder="请输入主表名"
        v-model="tableform.masterTableName"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="主表名描述" prop="masterTableDescription">
      <el-input style="width: 40%"
                placeholder="请输入主表名描述"
                v-model="tableform.masterTableDescription"
                clearable>
      </el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm('tableform')">立即创建</el-button>
      <el-button @click="resetForm('tableform')">重置</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
    import {addMastername} from '@/api/article'
    export default {
        data () {
            return {
                tableform: {
                    masterTableName: '',
                    masterTableDescription:'',
                    detailTableName1:'',
                    detailTableName2:'',
                    detailTableName3:'',
                    detailTableName4:'',
                    detailTableName5:'',

                },
                rules: {
                    masterTableName: [
                        {required: true, message: '请输入主表名', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addMastername(this.tableform).then(res => {
                                 if (res.data.code === 1004) {
                                    this.$notify({
                                         title: '成功',
                                        message: '增加表成功',
                                         type: 'success'
                                     });
                                     this.$router.push('/ErpList');
                                 }

                            if (res.data.code === 1005) {
                                this.$notify({
                                    title: '失败',
                                    message: '增加表失败',
                                    type: 'error'
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
        }
    }
</script>
<style lang="scss">

</style>
