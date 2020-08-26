<template>
  <div class="box" v-loading="loading">
    <div
      style="width: 300px;    text-align: center;    font-size: 25px;    margin-bottom: 30px;"
    >找回密码</div>
    <div>
      <span>用户名：</span>
      <input type="text" class="input" v-model="email" />
      <span style="color:grey;font-size:15px;">专家用户邮箱</span>
    </div>
    <div>
      <span>新密码：</span>
      <input type="password" class="input" v-model="password" />
    </div>
    <div style="display:flex;">
      <div>
        <span>验证码：</span>
        <input type="text" class="input" v-model="Captcha" />
      </div>
      <div>
        <button :class="[time==0&&emailFlag?'button-active':'button']" @click="verify">获取验证码</button>
        <span v-if="time!=0" style="color:grey;font-size:15px;">成功发送验证码{{time}}</span>
      </div>
    </div>
    <button class="yy-btn" @click="changePassword">修改密码</button>
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
      password: "",
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
          } else {
            this.emailFlag = true;
          }
        }, 800);
      } else {
        this.emailFlag = false;
      }
    },
  },
  methods: {
    verify() {
      if (this.time == 0) {
        this.time = 60;
        var t = setInterval(() => {
          if (this.time == 0) {
            clearInterval(t);
          } else {
            this.time--;
          }
        }, 2000);
        var data = {
          Email: this.email,
        };
        this.$axios.verify(data).then((res) => {
          console.log(res);
        });
      }
    },
    changePassword() {
      if (this.Captcha && this.password && this.email) {
        var data = {
          Captcha: this.Captcha,
          NewPassword: this.password,
          Email: this.email,
        };
        this.loading = true;
        this.$axios
          .forget(data)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "修改成功,即将跳转到登录界面",
                type: "success",
              });
              setTimeout(function () {
                that.$router.replace({
                  path: "/",
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
  top: calc(50% - 150px);
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