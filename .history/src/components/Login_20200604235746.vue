<template>
  <div :style="backgroundDiv">
    <div v-bind:style="styleObject">
      <div class="yybox">
        <div>
          <img :src="logo" class="yy-logo" />
          <span class="yy-title2">无人小区管理系统</span>
        </div>
        <div class="yy-input-box">
          <i class="layui-icon-username layui-icon yy-icon"></i>
          <input type="text" class="yy-input" v-model="username" placeholder="用户名" />
        </div>
        <div class="yy-input-box">
          <i class="layui-icon-password layui-icon yy-icon"></i>
          <input type="password" class="yy-input" v-model="password" placeholder="密码" />
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
      background: require("../assets/images/cool-background.png"),
      APPID: "1302338533",
      tenData: "",
      logo: require("../assets/logo.png"),
      styleObject: {
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "80vh",
        paddingTop: "20vh",
        backgroundSize: "100%"
      },
      backgroundDiv: {
        backgroundImage: "url(" + require("../assets/images/cool-backgroun2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
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
          if (res.ret == 0) {
            that.tenData = res;
            that.login();
          }
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
        password: "admin"
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

<style scoped>
.yy-logo {
  position: relative;
  top: -5px;
  left: -4px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.yy-title2 {
  font-size: 30px;
  font-weight: 700;
  font-family: cursive;
  /* color: #757575; */
}
.yybox {
  /*  */
  width: 330px;
  /* margin: 220px auto; */
  padding: 0px !important;
  height: 300px;
  position: absolute;
  left: 50%;
  margin-left: -149px;

  border: 0px;
}
.yybox .yy-title {
  text-align: center;
  font-size: 20px;
}
.yybox .yy-input-box {
  width: 290px;
  margin: 20px auto;
}
.yybox .yy-input-box .yy-input {
  width: 245px;

  height: 26px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
  line-height: 26px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding-left: 32px;
}

.yybox .yy-btn-box {
  width: 290px;
}
.yybox .yy-btn-box .yy-btn {
  /* width: 280px; */
  width: 100%;
  font-size: 1.1rem;
  margin-top: 19px;
  height: 35px;
  padding: 0px;
  line-height: 35px;
  background-color: #409eff;
  border: #409eff;
  color: white;
  border-radius: 6px;
  margin-left: 20px;
}
.yybox .yy-btn-box .yy-btn:hover {
  opacity: 0.9;
}
.yy-icon {
  font-size: 24px;
  color: #409eff;
  position: absolute;
  /* line-height: 30px; */
  margin-top: 6px;
  margin-left: 5px;
}
</style>