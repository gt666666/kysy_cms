<template>

</template>
<script>
  export default {
    data () {
      return {
        fileList: [],
        ruleForm: {
          photo: '',
          name: '',
          birthday: '',
          city: '',
          age: '',
          gender: '',
          isLock: false,
          everyTip: '',
          money: '',
          hobbys: [],
          remark: '',
          education: '',
        },
        rules: {
          // name: [
          //   {required: true, message: '请输入姓名', trigger: 'blur'}
          // ],
          // city: [
          //   {required: true, message: '请选择城市', trigger: 'change'}
          // ],
          // birthday: [
          //   {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
          // ],
          // everyTip: [
          //   {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          // ],
          // hobby: [
          //   {required: true, message: '请选择兴趣爱好', trigger: 'change'}
          // ],
          // gender: [
          //   {required: true, message: '请选择性别', trigger: 'change'}
          // ],
          // remark: [
          //   {required: true, message: '请输入备注', trigger: 'change'}
          // ]
        }
      }
    },
    methods: {
      handleChange (file, fileList) {
        this.photo = fileList[0].raw  // 一定要在文件框改变时设置文件内容
      },
      upload () { // 发送一定是post请求
        let formdata = new FormData()// 进行数据包装
        formdata.append('photo', this.photo)
        formdata.append('name', this.ruleForm.name)
        if (this.ruleForm.birthday != null) {
          formdata.append('birthday', this.ruleForm.birthday)
        }
        formdata.append('city', this.ruleForm.city)
        formdata.append('age', this.ruleForm.age)
        formdata.append('gender', this.ruleForm.gender)
        formdata.append('isLock', this.ruleForm.isLock)
        if (this.ruleForm.everyTip != null) {
          formdata.append('everyTip', this.ruleForm.everyTip)
        }
        formdata.append('money', this.ruleForm.money)
        formdata.append('hobbys', this.ruleForm.hobbys)
        formdata.append('remark', this.ruleForm.remark)
        formdata.append('education', this.ruleForm.education)
        this.$http({ // 必须使用此类形式
          method: 'post',
          data: formdata,
          url: '/insertUserInfo'
        }).then(res => {
          if (res.data.code === 1004) {
            this.$notify({
              title: '成功',
              message: '申请成功',
              type: 'success'
            })
            this.$router.push('/ListInputManager')
          }
        }).catch(error => {

        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/insertUserInfo', this.ruleForm).then(res => {
              if (res.data.code === 1004) {
                this.$notify({
                  title: '成功',
                  message: '申请成功',
                  type: 'success'
                })
                this.$router.push('/ListInputManager')
              }

            }).catch(error => {

            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handlePreview () {
        console.log('handlePreviewhandlePreview')
      },
      handleRemove () {
        console.log('handleRemovehandleRemovehandleRemove')
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
