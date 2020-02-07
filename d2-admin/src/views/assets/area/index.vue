<template>
  <d2-container>
    <template slot="header">地区表</template>
    <el-form :inline="true" :model="tableFilter" class="demo-form-inline">
      <el-form-item label="全局搜索">
        <el-input v-model="tableFilter.wholeSearch" size="mini" placeholder="全局搜索"></el-input>
      </el-form-item>
      <el-form-item label="地区简称">
        <el-select v-model="nameEnSelectValue" :loading="nameEnSelectLoading" size="mini"
                   @click.native="getNameEnOptions" filterable clearable
                   @change="nameEnSelectChange"
                   placeholder="请选择地区简称">
          <el-option
            v-for="item in nameEnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="data"
        :options="options"
        selection-row
        @selection-change="handleSelectionChange"
        :rowHandle="rowHandle"
        :loading="loading"
        add-title="新增地区"
        :add-template="addOrEditTemplate"
        edit-title="修改地区"
        :edit-template="addOrEditTemplate"
        :form-options="formOptions"
        :pagination="pagination"
        @pagination-size-change="paginationSizeChange"
        :add-rules="formRules"
        :edit-rules="formRules"
        @pagination-current-change="paginationCurrentChange"
        @dialog-open="handleDialogOpen"
        @row-add="handleRowAdd"
        @row-edit="handleRowEdit"
        @dialog-cancel="handleDialogCancel">
        <el-button type="success" slot="header" size="small" style="margin-bottom: 5px" @click="addRow">新增</el-button>
        <el-button type="danger" slot="header" size="small" style="margin-bottom: 5px" @click="delRow">删除</el-button>
      </d2-crud>
    </div>
  </d2-container>
</template>

<script>
  import request from '@/plugin/axios'
  import SERVER from '@/server'
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: "area",
    data() {
      return {
        tableFilter: {   // 筛选表单字典数据
          wholeSearch: '',  // 全局搜索
        },
        nameEnSelectValue: '',   // 英文简称筛选值
        nameEnOptions: [],
        columns: [],  // 表头
        data: [],     // 数据
        options: {
          stripe: true,   // 斑马纹
          border: true,    // 边框
          maxHeight: '320',   // 最大高度，超过显示滚动条
          emptyText: '',     // 数据空白时显示内容
        },
        formRules: {    // 模态框中的表单填写规则
          name_cn: [{required: true, message: '请输入地区中文', trigger: 'blur'}],
          name_en: [{required: true, message: '请输入地区英文', trigger: 'blur'}],
        },
        rowHandle: {
          edit: {           // 编辑数据按钮
            icon: 'el-icon-edit',
            text: '修改',
            size: 'mini',
            fixed: 'right',
            type: 'primary'
          }
        },
        addOrEditTemplate: {   // 编辑模态框模板
          name_cn: {
            title: '中文名',
            value: '',
            component: {
              span: 18
            }
          },
          name_en: {
            title: '简称',
            value: '',
            component: {
              span: 18
            }
          }
        },
        formOptions: {   // 模态框设置
          labelWidth: '80px',
          labelPosition: 'left',
          saveLoading: false,
          gutter: 20
        },
        pagination: {   // 分页设置
          currentPage: 1,
          pageSize: 5,
          total: 100,
          prevText: '上一页',
          nextText: '下一页',
          pageSizes: [5, 10, 20, 30, 40, 50, 100],
          layout: 'sizes, prev, pager, next, jumper, ->, total, slot'
        },
        loading: false,   // 表格默认loading样式
        nameEnSelectLoading: false,   // 英文简称选择框默认loading样式
      }
    },
    watch: {
      'tableFilter.wholeSearch': function (newVal) {
        this.tableFilter.wholeSearch = newVal
        this.listArea()
      }
    },
    methods: {
      // 表格数据勾选后触发的函数
      handleSelectionChange(selection) {
        // console.log(selection)
        this.selectData = selection
      },
      // 请求表格数据
      listArea() {
        this.loading = true
        let data = {
          pagination: this.pagination,
          tableFilter: this.tableFilter
        }
        request({
          url: SERVER.server + '/assets/list_area/v1/',
          method: 'post',
          data: data
        }).then(async res => {
          // console.log(res)
          this.loading = false
          this.columns = res.columns
          this.data = res.row_data
          this.pagination.total = res.total
        })
          .catch(err => {
            this.loading = false
            console.log('err: ', err)
            if (err == 'Error: 未授权，请登录') {
              this.$router.push({'name': 'login'})
            }
          })
      },
      // 打开模态框后提示信息
      handleDialogOpen({mode, row}) {
        this.$message({
          message: '打开模态框，模式为：' + mode,
          type: 'success'
        })
      },
      // 提交修改后触发函数
      handleRowEdit({index, row}, done) {
        this.formOptions.saveLoading = true
        row.action = 'edit'
        request({
          url: SERVER.server + '/assets/area_data/v1/',
          method: 'post',
          data: row
        }).then(async res => {
          // console.log(res)
          this.formOptions.saveLoading = false
          setTimeout(() => {
            console.log(index)
            console.log(row)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            // done可以传入一个对象来修改提交的某个字段
            done()
            this.formOptions.saveLoading = false
          }, 300)
        })
          .catch(err => {
            this.formOptions.saveLoading = false
            console.log('err: ', err)
          })
      },
      // 打开新增模态框
      addRow() {
        this.$refs.d2Crud.showDialog({
          mode: 'add'
        })
      },
      // 点击保存新增数据后触发的函数
      handleRowAdd(row, done) {
        this.formOptions.saveLoading = true
        row.action = 'add'
        request({
          url: SERVER.server + '/assets/area_data/v1/',
          method: 'post',
          data: row
        }).then(async res => {
          // console.log(res)
          this.formOptions.saveLoading = false
          setTimeout(() => {
            console.log(row)
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            // 重新请求表格数据
            this.listArea()
            // done可以传入一个对象来修改提交的某个字段
            done()
            this.formOptions.saveLoading = false
          }, 300)
        })
          .catch(err => {
            this.formOptions.saveLoading = false
            console.log('err: ', err)
          })
      },
      // 关闭模态框获取消编辑后触发的函数
      handleDialogCancel(done) {
        this.$message({
          message: '用户取消',
          type: 'warning'
        })
        done()
      },
      // 当分页改变时触发
      paginationCurrentChange(currentPage) {
        this.pagination.currentPage = currentPage
        this.listArea()
      },
      // 删除请求
      delRequest() {
        this.loading = true
        let data = {
          selectData: this.selectData,
          action: 'delete'
        }
        request({
          url: SERVER.server + '/assets/area_data/v1/',
          method: 'post',
          data: data
        }).then(async res => {
          console.log(res)
          this.loading = false
          setTimeout(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.listArea()
            this.loading = false
          }, 300)
        })
          .catch(err => {
            this.loading = false
            console.log('err: ', err)
          })
      },
      // 删除确认函数
      delRow() {
        // 先判断是否有选中数据
        if (!this.selectData) {
          this.$message({
            message: '请先选择要删除的项目',
            type: 'warning'
          })
          return
        }
        // 开始确认
        MessageBox.confirm('确定要删除吗', '删除', {
          type: 'warning'
        })
          .then(() => {
            this.delRequest()
          })
          .catch(() => {
            this.$message({
              message: '取消删除操作',
              type: 'warning'
            });
          })
      },
      // 分页选择器改变后触发的函数
      paginationSizeChange(pageSize) {
        this.pagination.pageSize = pageSize
        this.listArea()
      },
      // 地区简称筛选框获得焦点时触发的函数
      getNameEnOptions() {
        this.nameEnSelectLoading = true
        request({
          url: SERVER.server + '/assets/list_name_en/v1/',
          method: 'post',
        }).then(async res => {
          // console.log(res)
          this.nameEnSelectLoading = false
          this.nameEnOptions = res.list_name_en
        })
          .catch(err => {
            this.nameEnSelectLoading = false
            console.log('err: ', err)
          })
      },
      // 英文简称选择框选择值改变时触发的函数
      nameEnSelectChange(newVal) {
        // console.log(newVal)
        this.tableFilter.nameEnSelect = newVal
        this.listArea()
      }
    },
    mounted() {
      this.listArea()
    }
  }
</script>

<style scoped>

</style>
