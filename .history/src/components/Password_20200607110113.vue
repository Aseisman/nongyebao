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

<style>
</style>