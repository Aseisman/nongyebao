<template>
  <div>
    <!-- 搜索框+注册 -->
    <!-- <el-input placeholder="输入用户姓名、身份证进行查找" suffix-icon="el-icon-search" style="width: 30%;background: rgb(238, 240, 244);height: 34px;"> 
    </el-input>-->
    <div style="margin-top: 20px;width:100%;">
      <input
        type="text"
        placeholder="输入用户姓名、身份证进行查找"
        style="width: 30%;background: rgb(238, 240, 244);height: 34px;border-radius: 6px;margin-left: 3%;padding-left: 10px;"
      />
      <el-button
        @click="Add"
        type="primary"
        icon="el-icon-plus"
        style="width: 110px;height: 34px;padding: 0px;background-color: rgb(48, 208, 172);border-color: rgb(48, 208, 172);line-height: 34px;position: relative;right: -660px;}"
      >新增管理员</el-button>

      <el-button
        @click="exportExcel"
        type="primary"
        icon="el-icon-connection"
        style="width: 110px;height: 34px;padding: 0px;background-color: rgb(48, 208, 172);border-color: rgb(48, 208, 172);line-height: 34px;position: relative;right: -410px;}"
      >Excel导出</el-button>
    </div>
    <!-- table -->
    <div style="width: 95%;margin-left: 2.5%;margin-top: 30px;border-top: 1px solid #EBEEF5;">
      <el-table
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        id="userTable"
      >
        <el-table-column prop="username" label="管理员账号"></el-table-column>

        <el-table-column prop="isSuper" label="权限" :formatter="formatGrade">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isSuper === false ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.isSuper === false ?"普通管理员":'超级管理员'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isSuper" label="Action">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="changeRow(scope.$index)"
              type="text"
              size="small"
              style="font-size: 15px;"
            >{{scope.row.isSuper==false?"设置超管":"取消超管"}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click.native.prevent="deleteRow(scope.$index)"
              type="text"
              size="small"
              style="font-size: 15px;"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          admin: "张三",
          grade: "0"
        },
        {
          admin: "李四",
          grade: "0"
        },
        {
          admin: "王五",
          grade: "1"
        }
      ],
      requestData: {
        pageNum: 1, //当前页
        pageSize: 10,
        keywords: ""
      },
      totalPages: "" //总页数
    };
  },
  mounted() {
    var that = this;
    this.$axios.adminList(this.requestData).then(res => {
      if (res.code == 200) {
        that.tableData = res.data.content;
        that.totalPages = res.data.totalPages;
      }
    });
  },
  methods: {
    Add: function() {
      this.$router.push("/AdminAdd");
    },
    formatGrade: function(row, column, cellValue) {
      console.log(cellValue);
      if (cellValue === "1") {
        return "超级管理员";
      } else if (cellValue === "0") {
        return "普通管理员";
      }
    },
    deleteRow: function(i) {
      console.log(i);
    },
    changeRow: function(i) {
      console.log(i);
      this.$router.push("/AdminChange");
    }
  }
};
</script>

<style>
</style>