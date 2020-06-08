<template>
  <div v-loading="loading">
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
      <el-select v-model="value" placeholder="请选择" style="right:-345px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        @click="Excel"
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
        <el-table-column
          prop="isRegident"
          label="住户类型"
          width="120"
          :formatter="formatRegident"
          sortable
        ></el-table-column>
        <el-table-column prop="status" label="健康状态" width="100" sortable></el-table-column>
        <el-table-column prop="name" label="真实姓名" width="150"></el-table-column>
        <el-table-column prop="gender" label="性别" width="50"></el-table-column>
        <el-table-column prop="idCard" label="身份证" width="220"></el-table-column>
        <el-table-column prop="roomNumber" label="住户房号" width="120" sortable></el-table-column>
        <el-table-column prop="accessNum" label="出入次数" width="120" sortable></el-table-column>
        <!-- <el-table-column prop="is_lock" label="状态" width="100" :formatter="formatLock" sortable></el-table-column> -->
        <el-table-column prop="isProsecutor" label="检察人员" width="140">
          <template slot-scope="scope">
            <el-switch
              active-color="#5B7BFA"
              inactive-color="#dadde5"
              v-model="scope.row.isProsecutor"
              @change="change(scope.$index,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 插槽导致 :formatter不生效 -->
        <el-table-column label="状态" prop="isLock">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="font-size: 15px;"
              @mouseenter.native="mouseIn(scope)"
              @mouseleave.native="mouseOut(scope)"
            >{{scope.row.lock}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="totalPages"
        :current-page="requestData.pageNum"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      // REGIDENT(住户),PERSECUTER(检查人员),MIGRANTS(外来人员)
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "REGIDENT",
          label: "住户"
        },
        {
          value: "PERSECUTER",
          label: "检查人员"
        },
        {
          value: "MIGRANTS",
          label: "外来人员"
        }
      ],
      requestData: {
        pageNum: 1, //当前页
        pageSize: 6,
        keywords: "",
        wxUserRole: ""
      },
      value: "", //分类关键词
      loading: false,
      totalPages: 0, //总页数
      searchData: "" //搜索关键字
    };
  },
  methods: {
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
    },
    Excel() {
      axios({
        url: "/apis/admin/user/execl", // 接口名字
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token"),
          // responseType: "blob"
        },
        responseType: "blob"
      }).then(res => {
        let blob = new Blob([res], {
          type: "application/vnd.ms-excel"
        });
        let objectUrl = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = objectUrl;
        a.download = "用户列表";
        //a.click();
        //下面这个写法兼容火狐
        a.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        window.URL.revokeObjectURL(blob);
      });
    },
    //表格性别判断
    formatLock: function(row, column, cellValue) {
      if (cellValue === true) {
        return "已锁定";
      } else if (cellValue === false) {
        return "正常";
      }
    },
    formatRegident: function(row, column, cellValue) {
      if (cellValue === true) {
        return "住户";
      } else if (cellValue === false) {
        return "外来人员";
      }
    },
    mouseIn: function(l) {
      if (this.tableData[l.$index].isLock === false) {
        this.tableData[l.$index].lock = "锁定";
      } else {
        this.tableData[l.$index].lock = "解锁";
      }
      // this.tableData[l.$index].lock="解锁"
    },
    mouseOut: function(l) {
      if (this.tableData[l.$index].isLock === false) {
        this.tableData[l.$index].lock = "正常";
      } else {
        this.tableData[l.$index].lock = "已锁定";
      }
    },
    //请求指定页数
    pageChange(e) {
      var that = this;
      console.log(e);
      this.requestData.pageNum = e;
      this.$axios.userList(this.requestData).then(res => {
        if (res.code == 200) {
          //格式化
          for (let i in res.data.content) {
            // res.data.content[i].isProsecutor=1;
            if (res.data.content[i].roomNumber) {
              console.log("不为空");
            } else {
              res.data.content[i].roomNumber = "无";
            }
            if (
              res.data.content[i].isLock == true ||
              res.data.content[i].isLock == "1"
            ) {
              res.data.content[i].lock = "已锁定";
            } else if (
              res.data.content[i].isLock == false ||
              res.data.contetn[i].isLock == "0"
            ) {
              res.data.content[i].lock = "正常";
            }
          }
          that.tableData = res.data.content;
          that.totalPages = res.data.totalPages;
        }
      });
    }
  },
  created() {
    var that = this;
    this.loading = true;
    this.$axios.userList(this.requestData).then(res => {
      if (res.code == 200) {
        //格式化
        for (let i in res.data.content) {
          // res.data.content[i].isProsecutor=1;
          if (res.data.content[i].roomNumber) {
            console.log("不为空");
          } else {
            res.data.content[i].roomNumber = "无";
          }
          if (
            res.data.content[i].isLock == true ||
            res.data.content[i].isLock == "1"
          ) {
            res.data.content[i].lock = "已锁定";
          } else if (
            res.data.content[i].isLock == false ||
            res.data.contetn[i].isLock == "0"
          ) {
            res.data.content[i].lock = "正常";
          }
        }
        that.tableData = res.data.content;
        that.totalPages = res.data.totalPages;
      }
      that.loading = false;
    });
  },
  watch: {
    searchData: function() {
      var that = this;
      setTimeout(function() {
        // var that=this;
        that.requestData.keywords = that.searchData;
        that.$axios.userList(that.requestData).then(res => {
          if (res.code == 200) {
            //格式化
            for (let i in res.data.content) {
              // res.data.content[i].isProsecutor=1;
              if (res.data.content[i].roomNumber) {
                console.log("不为空");
              } else {
                res.data.content[i].roomNumber = "无";
              }
              if (
                res.data.content[i].isLock == true ||
                res.data.content[i].isLock == "1"
              ) {
                res.data.content[i].lock = "已锁定";
              } else if (
                res.data.content[i].isLock == false ||
                res.data.contetn[i].isLock == "0"
              ) {
                res.data.content[i].lock = "正常";
              }
            }
            that.tableData = res.data.content;
            that.totalPages = res.data.totalPages;
          }
        });
      }, 0);
    },
    value: function() {
      var that = this;
      that.requestData.wxUserRole = that.value;
      that.$axios.userList(that.requestData).then(res => {
        if (res.code == 200) {
          //格式化
          for (let i in res.data.content) {
            // res.data.content[i].isProsecutor=1;
            if (res.data.content[i].roomNumber) {
              console.log("不为空");
            } else {
              res.data.content[i].roomNumber = "无";
            }
            if (
              res.data.content[i].isLock == true ||
              res.data.content[i].isLock == "1"
            ) {
              res.data.content[i].lock = "已锁定";
            } else if (
              res.data.content[i].isLock == false ||
              res.data.contetn[i].isLock == "0"
            ) {
              res.data.content[i].lock = "正常";
            }
          }
          that.tableData = res.data.content;
          that.totalPages = res.data.totalPages;
        }
      });
    }
  }
};
</script>
<style>
input {
  border: 0px;
  background-color: none;
  outline: none;
}
input:focus {
  outline: none;
}
::-webkit-input-placeholder {
  /*Chrome/Safari*/
  color: rgb(184, 188, 196);
}
::-moz-placeholder {
  /*Firefox*/
  color: rgb(184, 188, 196);
}
::-ms-input-placeholder {
  /*IE*/
  color: rgb(184, 188, 196);
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(91, 123, 250) !important;
}
.el-pagination.is-background .el-pager li:hover {
  color: rgb(91, 123, 250) !important;
}
.el-pagination {
  margin: 30px;
  float: right;
}
</style>
