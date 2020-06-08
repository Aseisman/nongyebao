<template>
  <div>登陆界面</div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    submitContent(res) {
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
        }else{
          console.log(res);
        }
      });
    }
  }
};
</script>

<style>
</style>