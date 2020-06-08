<template>
  <el-row style="margin-left:80px">
    <el-col :span="2">
      <div class="yy-step-1">1</div>
      <div class="yy-step-2"></div>
      <div
        class="yy-step-1"
        :style="{'background':isCheck?'rgba(52, 145, 240, 1)':'rgba(102, 102, 102, 1)'}"
      >2</div>
    </el-col>
    <el-col :span="22">
      <div class="yy-step-content-1">输入旧密码</div>
      <div style="margin-top:30px">
        <i class="el-icon-s-custom yy-icon-1"></i>
        <input placeholder="请输入你的账号" class="yy-input" v-model="oldusername" type="text" />
      </div>

      <div style="margin-top:20px">
        <i class="el-icon-lock yy-icon-1"></i>
        <input placeholder="请输入你的旧密码" class="yy-input" v-model="oldpassword" type="password" />
      </div>

      <div class="yy-step-content-1" style="margin-top:110px">密码修改</div>
      <div style="margin-top:30px">
        <i
          class="el-icon-lock yy-icon-1"
          :style="{'color':isCheck?'rgba(52, 145, 240, 1)':'rgba(102, 102, 102, 1)'}"
        ></i>
        <input placeholder="请输入你的新密码" class="yy-input" v-model="password" type="password" />
      </div>

      <div style="margin-top:20px">
        <i
          class="el-icon-lock yy-icon-1"
          :style="{'color':isCheck?'rgba(52, 145, 240, 1)':'rgba(102, 102, 102, 1)'}"
        ></i>
        <input placeholder="请再输入你的新密码" class="yy-input" type="password" v-model="repassword" />
      </div>
      <el-button type="primary" :disabled="!isCheck" @click="confirmChange">确定修改</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style scoped>
.yy-step-1 {
  width: 64px;
  height: 64px;
  background: rgba(52, 145, 240, 1);
  border-radius: 50%;
  opacity: 1;
  color: white;
  font-size: 42px;
  line-height: 64px;
  text-align: center;
}

.yy-step-2 {
  width: 0px;
  height: 210px;
  border: 4px solid rgba(52, 145, 240, 1);
  opacity: 1;
  margin-left: 28px;
}

.yy-step-content-1 {
  color: rgba(26, 26, 26, 1);
  font-size: 27px;
  font-weight: Bold;
  margin-top: 10px;
}

.yy-input {
  width: 300px;
  border: 0px;
  outline: none;
  border-bottom: 1px solid rgba(185, 190, 197, 1);
  /* color: rgba(81, 92, 111, 0.4); */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.el-button {
  margin-top: 40px;
}

.yy-icon-1 {
  font-size: 34px;
  color: rgba(38, 153, 251, 1);
  vertical-align: middle;
  margin-right: 20px;
}

.yymessagebox {
  width: 300px;
}

.el-message-box {
  width: 300px !important;
}
</style>