<template>
  <div v-loading="loading">
    <!-- 搜索框+注册 -->
    <!-- <el-input placeholder="输入用户姓名、身份证进行查找" suffix-icon="el-icon-search" style="width: 30%;background: rgb(238, 240, 244);height: 34px;"> 
    </el-input>-->
    <div style="margin-top: 20px;width:100%;">
      <input
        type="text"
        placeholder="输入用户姓名、身份证进行查找"
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
        <el-table-column label="状态" prop="isLock" :formatter="formatLock">
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
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      tableData: [
        {
          status: "健康",
          name: "王小虎",
          gender: "1", //性别
          idCard: "330200304545340567",
          room_number: "无", //住户房号
          access_number: "10", //出入次数
          is_prosecutor: "1", //检察人员
          is_regident: "0", //小区人员
          is_lock: "1", //锁定
          lock:"已锁定",
        }
      ],
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "住户"
        },
        {
          value: "选项3",
          label: "检查人员"
        },
        {
          value: "选项4",
          label: "外来人员"
        }
      ],
      requestData: {
        pageNum: 1, //当前页
        pageSize: 8,
        keywords: "",
        wxUserRole:"",
      },
      value: "选项1",
      loading:false,
      totalPages: 0, //总页数
      searchData: "",
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
    //表格性别判断
    formatSex: function(row, column, cellValue) {
      if (cellValue === "1") {
        return "女";
      } else if (cellValue === "0") {
        return "男";
      }
    },
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
    mouseIn:function(l){
      if(this.tableData[l.$index].is_lock==0){
        this.tableData[l.$index].lock="锁定"
      }else{
        this.tableData[l.$index].lock="解锁"
      }
      // this.tableData[l.$index].lock="解锁"
    },
    mouseOut:function(l){
      if(this.tableData[l.$index].is_lock==0){
        this.tableData[l.$index].lock="正常"
      }else{
        this.tableData[l.$index].lock="已锁定"
      }

    }
  },
  created(){
    var that=this;
    this.loading=true;
    this.$axios.userList(this.requestData).then(res=>{
      if(res.code==200){
        for(let i in res.data.content){
          // res.data.content[i].isProsecutor=1;
          if(res.data.content[i].roomNumber){
            console.log("不为空")
          }else{
            res.data.content[i].roomNumber='无'
          }
          // if(res.data.content[i].isLock==true||res.data.content[i].isLock=='1'){
          //   res.data.content[i].lock='已锁定'
          // }else if(res.data.content[i].isLock==false||res.data.contetn[i].isLock=='0'){
          //   res.data.content[i].lock='正常'
          // }
        }
        that.tableData=res.data.content;
        that.totalPages=res.data.totalPages;
      }
      that.loading=false;
    })
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
