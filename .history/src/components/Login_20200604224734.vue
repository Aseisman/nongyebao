<template>
  <div>
    <!-- <button id="TencentCaptcha" data-appid="1302338533" data-cbfn="callback" type="button">提交</button> -->
    <button @click="submitContent">dianji</button>
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