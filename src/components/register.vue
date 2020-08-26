<template>
  <div class="box" v-loading="loading">
    <div style="width: 300px;text-align: center;font-size: 25px; margin-bottom: 30px;">注册账户</div>
    <div>
      <span>用户名：</span>
      <input type="text" class="input" v-model="NickName" />
    </div>
    <div style="margin-left: 16px;">
      <span>邮箱：</span>
      <input type="text" class="input" v-model="email" />
      <span style="color:grey;font-size:15px;">{{tip}}</span>
    </div>
    <div style="margin-left: 16px;">
      <span>密码：</span>
      <input type="password" class="input" v-model="password" />
      <span style="color:grey;font-size:15px;">8位数字加字母</span>
    </div>
    <div style="margin-left: -47px;">
      <span>再次输入密码：</span>
      <input type="password" class="input" v-model="password2" />
      <span v-if="!isCheck" style="color:red;font-size:15px;">{{passwordTip}}</span>
    </div>
    <div style="display:flex;">
      <div>
        <span>验证码：</span>
        <input type="text" class="input" v-model="Captcha" />
      </div>
      <div>
        <button :class="[time==0&&emailFlag?'button-active':'button']" @click="verify">获取验证码</button>
        <span v-if="CaptchaFlag" style="color:grey;font-size:15px;">{{CaptchaFlag}}{{time}}</span>
      </div>
    </div>
    <button class="yy-btn" @click="register" :disabled="!isCheck">注册账户</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailFlag: false,
      time: 0,
      timer: "",
      loading: false,
      Captcha: "",
      CaptchaFlag: "",
      password: "",
      password2: "",
      tip: "请输入邮箱",
      NickName: "",
      passwordTip: "两次输入的密码不一样",
    };
  },
  mounted() {},
  watch: {
    email: function () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.email) {
        this.timer = setTimeout(() => {
          var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
          if (!regex.test(this.email)) {
            this.emailFlag = false;
            this.$message({
              message: "邮箱格式有误",
              type: "warning",
            });
            this.tip = "请输入正确的邮箱";
          } else {
            this.emailFlag = true;
            this.tip = "正确的邮箱";
          }
        }, 800);
      } else {
        this.emailFlag = false;
        this.tip = "请输入邮箱";
      }
    },
  },
  computed: {
    isCheck: function () {
      if (
        this.password == this.password2 &&
        this.password2 != null &&
        this.password != null
      ) {
        return true;
      } else if (this.password.length == 0 || this.password2.length == 0) {
        this.passwordTip = "";
        console.log("daozhe1");
        return false;
      } else {
        console.log("daozhe2");
        this.passwordTip = "两次输入的密码不一样";
        return false;
      }
    },
  },
  methods: {
    verify() {
      if (this.time == 0 && this.emailFlag) {
        this.time = 60;
        var t = setInterval(() => {
          if (this.time == 0) {
            this.CaptchaFlag = "";
            clearInterval(t);
          } else {
            this.time--;
          }
        }, 2000);
        var data = {
          Email: this.email,
        };
        this.$axios.verify(data).then((res) => {
          if (res.code == 200) {
            this.CaptchaFlag = "成功发送验证码";
          } else {
            this.CaptchaFlag = "请稍后重试";
          }
        });
      } else {
        this.$alert("请输入邮箱");
      }
    },
    register() {
      var that = this;
      if (this.Captcha && this.password && this.email && this.NickName) {
        var data = {
          Captcha: this.Captcha,
          Password: this.password,
          Email: this.email,
          NickName: this.NickName,
        };
        this.loading = true;
        this.$axios
          .register(data)
          .then((res) => {
            if (res.code == 200) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("userMessage", JSON.stringify(res.data));
              this.$message({
                message: "注册成功,即将跳转到首页",
                type: "success",
              });
              setTimeout(function () {
                that.$router.replace({
                  path: "/HomePage",
                });
              }, 2000);
            }
            this.loading = false;
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              this.$alert(error.response.data.msg);
              this.loading = false;
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      } else {
        this.$alert("请填写完整", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 500px;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  height: 150px;
  line-height: 40px;
}
.input {
  border: 1px solid #9e9b9b;
  width: 180px;
  height: 30px;
  border-radius: 6px;
  margin-right: 20px;
}
.button-active {
  width: 90px;
  height: 35px;
  line-height: 35px;
  background-color: #409eff;
  border: #409eff;
  color: white;
  border-radius: 6px;
}
.button {
  width: 90px;
  height: 35px;
  line-height: 35px;
  background-color: grey;
  border: grey;
  color: white;
  border-radius: 6px;
}
.yy-btn {
  width: 200px;
  margin-top: 19px;
  height: 35px;
  padding: 0px;
  line-height: 35px;
  background-color: #409eff;
  border: #409eff;
  color: white;
  border-radius: 6px;
  margin-left: 56px;
}
</style>