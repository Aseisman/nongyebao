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
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        style="right:-145px;"
        :blur="shiqujiaodian()"
      ></el-date-picker>
      <el-button
        @click="exportExcel"
        type="primary"
        icon="el-icon-connection"
        style="width: 110px;height: 34px;padding: 0px;background-color: rgb(48, 208, 172);border-color: rgb(48, 208, 172);line-height: 34px;position: relative;right: -250px;}"
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
        <el-table-column prop="isRegident" label="住户类型" :formatter="formatRegident" sortable></el-table-column>
        <el-table-column prop="name" label="真实姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="roomNumber" label="住户房号" sortable></el-table-column>
        <el-table-column prop="temperature" label="体温" sortable></el-table-column>
        <el-table-column prop="status" label="健康状态" sortable>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '体温正常' ? 'success':'danger'"
              disable-transitions
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" sortable></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>
        <!-- <el-table-column label="Action">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="font-size: 15px;"
            >修改</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="font-size: 15px;"
            >锁定</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="font-size: 15px;"
            >删除</el-button>
          </template>
        </el-table-column>-->
<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          gender: "1", //性别
          idCard: "330200304545340567",
          room_number: "20202", //住户房号
          access_number: "10", //出入次数
          is_prosecutor: "1", //检察人员
          is_regident: "1", //小区人员
          is_lock: "0", //锁定
          tem: "37.0",
          time: "2020-01-01"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "", //时间关键词
      loading: false,
      totalPages: 0,
      searchData: "",
      requestData: {
        pageNum: 1,
        pageSize: 6,
        keywords: "", // 搜索关键字
        begin: undefined, // 搜索日期开始
        end: undefined // 搜索日期结束
      }
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
    //表格判断
    formatRegident: function(row, column, cellValue) {
      if (cellValue === true) {
        return "住户";
      } else if (cellValue === false) {
        return "外来人员";
      }
    },
    shiqujiaodian: function() {
      console.log("趋势焦点");
      console.log(this.value2);
    }
  },
  created() {
    var that = this;
    this.loading = true;
    // this.requestData.begin
    this.$axios.recordList(this.requestData).then(res => {
      if (res.code == 200) {
        for (let i in res.data.content) {
          //roomNum
          if (res.data.content[i].roomNumber) {
            console.log("不为空");
          } else {
            res.data.content[i].roomNumber = "无";
          }
        }
        that.tableData = res.data.content;
        that.totalPages = res.data.totalPages;
      }
      that.loading = false;
      console.log(res);
    });
  }
};
</script>

<style>
</style>