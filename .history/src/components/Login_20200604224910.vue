<template>
  <div>
    <div v-bind:style="styleObject">
    <div class="yybox">
      <div>
        <img :src="logo" class="yy-logo" />
        <span class="yy-title2">云智莞后台管理系统</span>
      </div>
      <div class="yy-input-box">
        <i class="layui-icon-username layui-icon yy-icon"></i>
        <input
          type="text"
          class="yy-input"
          v-model="username"
          placeholder="用户名"
        />
      </div>
      <div class="yy-input-box">
        <i class="layui-icon-password layui-icon yy-icon"></i>
        <input
          type="password"
          class="yy-input"
          v-model="password"
          placeholder="密码"
        />
      </div>
      <div class="yy-btn-box">
        <button class="yy-btn" @click="submitContent">登录</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      APPID: "1302338533",
      tenData: "",
      logo: require("../assets/logo.png"),
      styleObject: {
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "80vh",
        paddingTop: "20vh",
        backgroundSize: "100%"
      }
    };
  },
  created() {
    if (window.TencentCaptcha == undefined) {
      let script = document.createElement("script");
      let head = document.getElementsByTagName("head")[0];
      script.type = "text/javascript";
      script.charset = "UTF-8";
      script.src = "https://ssl.captcha.qq.com/TCaptcha.js";
      head.appendChild(script);
    }
  },
  mounted() {},
  methods: {
    submitContent() {
      var that = this;
      if (this.tenData === "") {
        let cap = new window.TencentCaptcha(this.APPID, function(res) {
          console.log(res);
          that.tenData = res;
          that.login();
        });
        cap.show();
      } else {
        that.login();
      }
    },
    login() {
      var that = this;
      var data = {
        username: "admin",
        password: "admin",
        
      };
      console.log(this.$axios);
      this.$axios.supManLogin(data).then(res => {
        if (res.code == 200) {
          const token = res.data;
          localStorage.setItem("token", token);
          that.$router.replace({
            path: "/HomePage"
          });
        } else {
          console.log(res);
        }
      });
    }
  }
};
</script>

<style>
</style>