<template>
  <d2-container>
    <template slot="header">主机列表</template>
    <div>
      <d2-crud
        :columns="columns"
        :data="data"
        :options="options"
        selection-row
        @selection-change="handleSelectionChange"/>
    </div>
  </d2-container>
</template>

<script>
  export default {
    name: "hostList",
    data() {
      return {
        columns: [
          {
            title: '日期',
            key: 'date',
            width: '180'
          },
          {
            title: '姓名',
            key: 'name',
            width: '180'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        options: {
          stripe: true,
          border: true,
          maxHeight: '500',
          height: '500'
        }
      }
    },
    methods: {
      handleSelectionChange(selection) {
        console.log(selection)
      }
    }
  }
</script>

<style scoped>

</style>
