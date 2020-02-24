<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title=">> 搜索条件 （点击展开或收缩）" name="1">
        <el-form :model="query" ref="searchForm" label-width="100px" class="demo-ruleForm">
          主表名:&nbsp;&nbsp;&nbsp;
          <el-input v-model="query.masterTableName" @input="getList" style="width: 15%"></el-input>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetSearchForm">重置</el-button>

        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table
      :data="tableData"
      border
      style="width: 100%" id="table-content">
      <el-table-column
        label="主键"
        width="50" fixed="left" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="主表名"
        width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.masterTableName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="主表描述"
        width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.masterTableDescription}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作人"
        width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memberName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最后修改时间"
        width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="medium"
            type="info"
            @click="handleDetails(scope.row)">明细表详情
          </el-button>
          <el-button
            size="medium"
            type="danger"
            @click="handleDelete(scope.row.mid)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="主表编辑" :visible.sync="editFormVisible" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="主表名" prop="masterTableName">
          <el-input v-model="ruleForm.masterTableName" style="width: 35%"></el-input>
        </el-form-item>
        <el-form-item label="主表描述" prop="masterTableDescription">
        <el-input v-model="ruleForm.masterTableDescription" style="width: 35%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditSave('ruleForm')">保 存</el-button>
        <el-button @click="editFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="明细表" :visible.sync="detailsFormVisible" width="70%">
      <el-form :model="detailsForm" :rules="rules" ref="detailsForm" label-width="100px" class="demo-ruleForm">
        <el-table
          :data="detailsData"
          border
          style="width: 100%" id="table-content">
          <el-table-column
            label="明细表名"
            width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.detailTableName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="明细表描述"
            width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.detailTableDescription}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="450" align="center">
            <template slot-scope="scope">
              <el-button  type="text" size="medium">编辑</el-button>
              <el-button type="primary"  icon="el-icon-edit" @click="handleEditDetails(scope.row)" circle></el-button>
              <el-button type="text" size="medium" style="color: red"  >删除</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteDetails(scope.row.id)"  circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDetailsTable()">增加明细表</el-button>
        <el-button @click="detailsFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="明细表增加" :visible.sync="addFormDetailsVisible" width="70%">
      <el-form :model="detailsForm" :rules="rules" ref="detailsForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="明细表名" prop="detailTableName">
        <el-input v-model="detailsForm.detailTableName" style="width: 35%"></el-input>
      </el-form-item>
        <el-form-item label="明细表描述" prop="detailTableDescription">
          <el-input v-model="detailsForm.detailTableDescription" style="width: 35%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDetailsSave('detailsForm')">保 存</el-button>
        <el-button @click="addFormDetailsVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="明细表编辑" :visible.sync="editFormDetailsVisible" width="70%">
      <el-form :model="detailsForm" :rules="rules" ref="detailsForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="明细表名" prop="detailTableName">
          <el-input v-model="detailsForm.detailTableName" style="width: 35%"></el-input>
        </el-form-item>
        <el-form-item label="明细表描述" >
          <el-input v-model="detailsForm.detailTableDescription" style="width: 35%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditDetailsSave('detailsForm')">保 存</el-button>
        <el-button @click="editFormDetailsVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 30, 40,50]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
    import {msternameFindByQuery, msternameUpdateById, msternameDeleteById, detailnameListAll,detailnameUpdateById,detailnameDeleteById,detailnameInsertSelective} from '@/api/article'
    export default {
        data() {
            return {
                query: {
                    page: 1,
                    limit: 10,
                    memberName: '',
                    masterTableName: '',
                },
                visible:false,
                total: 0,
                tableData: [],
                detailsData: [],
                editFormVisible: false,  //主表修改弹层
                detailsFormVisible: false,//主表详情弹层
                editFormDetailsVisible: false,   //明细修改弹层
                addFormDetailsVisible:false,   //明细表增加弹层
                activeNames: ['1'], //默认搜索条件打开
                ruleForm: {
                    mid: '',
                    masterTableName: '',
                    memberName: '',
                    createDate: '',
                    updateDate: '',
                    masterTableDescription:'',

                },
                detailsForm: {
                    id: '',
                    detailTableName:'',
                    detailTableDescription:''
                },
                rules: {
                    masterTableName: [
                        {required: true, message: '请输入主表名', trigger: 'blur'}
                    ],
                    detailTableName: [
                        {required: true, message: '请输入明细表名', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            getList() {
                msternameFindByQuery(this.query).then(res => {
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                }).catch(error => {
                    console.log(error)
                })
            },
            //一页多少条
            handleSizeChange(val) {
                this.query.limit = val;
                this.getList()
            },
            //第几页
            handleCurrentChange(val) {
                this.query.page = val;
                this.getList()
            },
            //明细修改回填
            handleEditDetails(val) {
                this.editFormDetailsVisible = true;
                this.detailsForm = Object.assign({}, val);
            },
            //明细表修改
            handleEditDetailsSave(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        detailnameUpdateById(this.detailsForm).then(res => {
                            if (res.data.code === 1008) {
                                this.editFormDetailsVisible = false;
                                this.detailsFormVisible = false;
                                this.handleDetails(this.ruleForm);
                                this.$notify({
                                    title: '成功',
                                    message: '修改明细表成功',
                                    type: 'success'
                                });

                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //明细表删除
            handleDeleteDetails(id){
                this.$confirm('是否删除?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                        detailnameDeleteById(id).then(res => {    //获取主表中的明细表
                            if (res.data.code === 1010) {
                                this.editFormDetailsVisible = false;
                                this.detailsFormVisible = false;
                                this.handleDetails(this.ruleForm);
                                this.$notify({
                                    title: '成功',
                                    message: '删除明细表成功',
                                    type: 'success'
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                }).catch(() => {
                });
            },
            //明细表增加弹框
            addDetailsTable(){
                this.detailsForm.detailTableName='';
                this.detailsForm.detailTableDescription='';
                this.addFormDetailsVisible = true;
            },
            //明细表增加保存
            addDetailsSave(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        let data={};
                        data.mid=this.ruleForm.mid;
                        data.detailTableName=this.detailsForm.detailTableName;
                        data.detailTableDescription=this.detailsForm.detailTableDescription;
                        detailnameInsertSelective(data).then(res => {
                            if (res.data.code === 1004) {
                                this.addFormDetailsVisible = false;
                                this.detailsFormVisible = false;
                                this.handleDetails(this.ruleForm);
                                this.$notify({
                                    title: '成功',
                                    message: '增加明细表成功',
                                    type: 'success'
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //主表修改回填
            handleEdit(val) {
                this.editFormVisible = true;
                this.ruleForm = Object.assign({}, val);
            },
            //主表修改
            handleEditSave(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        msternameUpdateById(this.ruleForm).then(res => {
                            if (res.data.code === 1008) {
                                this.$notify({
                                    title: '成功',
                                    message: '修改主表成功',
                                    type: 'success'
                                });
                                this.getList();
                                this.editFormVisible = false;
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取主表中的明细表
            handleDetails(val) {
                detailnameListAll(val.mid).then(res => {
                    this.detailsData = res.data.data;
                    this.detailsForm.detailTableName='';
                    this.detailsForm.detailTableDescription='';
                }).catch(error => {
                    console.log(error)
                });
                this.detailsFormVisible = true;
                this.ruleForm.mid=val.mid;
            },
            //主表删除
            handleDelete(id) {
                this.$confirm('是否删除?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    msternameDeleteById(id).then(res => {
                        if (res.data.code === 1010) {
                            this.$notify({
                                title: '成功',
                                message: '删除主表成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }).catch(() => {
                });
            },
            resetSearchForm() {
                this.query.masterTableName = '';
            }
        },
        mounted() {
            this.tableData=[];
            this.getList()
        }
    }
</script>
