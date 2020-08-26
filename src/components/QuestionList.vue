<template>
  <div v-loading="loading">
    <!-- 搜索框+注册 -->
    <div style="margin-top: 20px;width:100%;">
      <!-- <input
        type="text"
        placeholder="输入用户姓名、身份证进行查找"
        style="width: 30%;background: rgb(238, 240, 244);height: 34px;border-radius: 6px;margin-left: 3%;padding-left: 10px;"
      />-->
      <el-select v-model="option" placeholder="请选择" style="right:-20px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-connection"
        style="width: 110px;height: 34px;padding: 0px;background-color: rgb(48, 208, 172);border-color: rgb(48, 208, 172);line-height: 34px;position: relative;right: -792px;}"
        @click="publishQuestion"
      >上传问题</el-button>
    </div>
    <!-- table -->
    <div style="width: 95%;margin-left: 2.5%;margin-top: 30px;border-top: 1px solid #EBEEF5;">
      <el-table
        :data="list"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        id="userTable"
      >
        <el-table-column prop="Title" label="标题" width="120"></el-table-column>
        <el-table-column prop="Time" label="时间" width="200" sortable></el-table-column>
        <el-table-column prop="Position" label="位置" width="120"></el-table-column>
        <el-table-column prop="Crop" label="农作物" width="150"></el-table-column>
        <!-- <el-table-column prop="Status" label="状态" width="150" sortable></el-table-column> -->

        <el-table-column label="操作" prop="Status">
          <template slot-scope="scope">
            <el-select v-model="scope.row.Status" placeholder="请选择" @change="changeStatus(scope)">
              <el-option value="受理中"></el-option>
              <el-option value="已完成"></el-option>
              <el-option value="待受理"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="font-size: 15px;" @click="answer(scope)">回答问题</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="Status">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="font-size: 15px;" @click="del(scope)">删除问题</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="6"
        :current-page="1"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestData: {
        PageIndex: 1,
        PageSize: 6,
        QID: "",
        Status: "",
        AnswererID: "",
      },
      list: [],
      count: 0,
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "待受理",
          label: "待受理",
        },
        {
          value: "受理中",
          label: "受理中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      currentPage: 1,
      option: "全部",
    };
  },
  created() {
    this.loading = true;
    this.$axios.getQuestionsInfo(this.requestData).then((res) => {
      if (res.code == 200) {
        this.list = res.data;
        this.count = res.count;
      }
      this.loading = false;
    });
  },
  methods: {
    updateList() {
      this.$axios.getQuestionsInfo(this.requestData).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
          this.count = res.count;
        }
      });
    },
    changeStatus(e) {
      var data = {
        Status: e.row.Status,
        QID: e.row.QID,
      };
      this.$axios.updateStatus(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "更新状态成功",
            type: "success",
          });
          this.updateList();
        }
      });
    },
    pageChange(e) {
      this.requestData.PageIndex = e;
      this.$axios.getQuestionsInfo(this.requestData).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
          this.count = res.count;
          this.currentPage = e;
        }
      });
    },
    answer(e) {
      this.$router.push({
        path: "/Answer",
        query: { data: e.row },
      });
    },
    del(e) {
      this.$confirm("此操作将永久删除问题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var d = {
          params: {
            QID: e.row.QID,
          },
        };
        this.$axios.deleteQuestion(d).then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.updateList();
          }
        });
      });
    },
    publishQuestion() {
      this.$router.push({
        path: "/PublishQuestion",
      });
    },
  },
  watch: {
    option: function () {
      this.requestData.Status = this.option;
      this.updateList();
    },
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>