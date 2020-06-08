<template>
  <div>
    <!-- 搜索框+注册 -->
    <!-- <el-input placeholder="输入用户姓名、身份证进行查找" suffix-icon="el-icon-search" style="width: 30%;background: rgb(238, 240, 244);height: 34px;"> 
    </el-input>-->
    <div style="margin-top: 20px;width:100%;">
      <input
        type="text"
        placeholder="输入用户姓名、身份证进行查找"
        v-model="searchData"
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
      <el-pagination background layout="prev, pager, next" :page-count="totalPages"></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      requestData: {
        pageNum: 1, //当前页
        pageSize: 10,
        keywords: ""
      },
      totalPages: "", //总页数
      searchData: ""
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
      var that=this;
      this.$axios.adminDel({id:that.tableData[i].id}).then(res => {
        if (res.code == 200) {
          that.$message({
            message: "删除成功",
            type: "success"
          });
          that.$axios.adminList(that.requestData).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.content;
              that.totalPages = res.data.totalPages;
            }
          });
        }else{
          that.$message.error(res)
        }
    },
    changeRow: function(i) {
      console.log(i);
      var that=this;
      this.$axios.adminSet({id:that.tableData[i].id}).then(res => {
        if (res.code == 200) {
          that.$message({
            message: "更新成功",
            type: "success"
          });
          that.$axios.adminList(that.requestData).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.content;
              that.totalPages = res.data.totalPages;
            }
          });
        }
      });
    },
    //导出excel
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#userTable"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
  watch: {
    searchData: function() {
      var that = this;
      setTimeout(function() {
        // var that=this;
        that.requestData.keywords = that.searchData;
        that.$axios.adminList(that.requestData).then(res => {
          if (res.code == 200) {
            that.tableData = res.data.content;
            that.totalPages = res.data.totalPages;
          }
        });
      }, 0);
    }
  }
};
</script>

<style>
</style>