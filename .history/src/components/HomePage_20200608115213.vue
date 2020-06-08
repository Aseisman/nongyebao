<template>
  <el-container class="container">
    <!-- 旁边 -->
    <el-aside width="15%">
      <!-- brand -->
      <el-image :src="brand" class="brand"></el-image>
      <!-- 列表 -->
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="transparent"
        text-color="rgb(249,249,249)"
        active-text-color="rgb(249,249,249) !important"
        router
        unique-opened
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <!-- 首页两个图： 住户人数 一个星期的出入人数（条形统计图） 健康人数比例图（圆形统计图） -->
        <!-- 用户管理有：注册，列表，查看详情，修改账号，锁定账号 -->
        <!-- 输入名字或者什么，查找当前用户的出入数据和健康数据 -->
        <!-- 扫码获取用户信息，并记录当前健康状态 -->
        <el-menu-item
          v-for="(item,i) in navList"
          :key="i"
          :index="item.name"
          @click="changeTitle(item.navItem)"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{item.navItem}}</span>
        </el-menu-item>
        <el-menu-item @click="SignOut()">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出系统</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <!-- 237, 244, 250 -->
      <el-header height="70px">
        <el-row :gutter="20">
          <el-col :span="18">
            <div style="border-radius: 4px;min-height: 36px;font-size:15px;">
              当前页：
              <i class="el-icon-edit" style="font-size:20px;margin-right:10px;"></i>
              <span slot="title">{{title}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div
              style="border-radius: 4px;min-height: 36px;display: flex;justify-content: space-evenly; align-items: center"
            >
              <el-image :src="avator" class="avator"></el-image>欢迎您：{{username}}！
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- main -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      brand: require("../assets/images/brand.png"),
      msg: "Welcome to Your Vue.js App",
      avator: require("../assets/images/avator.jpg"),
      down: require("../assets/images/down.png"),
      isCollapse: false,
      navList: [],
      title: "首页",
      username: "管理员"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeTitle(name) {
      this.title = name;
    },
    SignOut: function() {
      //删除本地token，
      localStorage.clear();
      //跳到登录界面
      this.$router.push("/");
    }
  },
  mounted() {
    const userMesage = JSON.parse(localStorage.getItem("userMessage"));
    console.log(userMesage);
    if (userMesage.isSuper == 1) {
      //功能显示
      this.navList = [
        { name: "/Home", navItem: "首页", icon: "el-icon-discount" },
        { name: "/UserList", navItem: "用户管理", icon: "el-icon-service" },
        { name: "Access", navItem: "出入统计", icon: "el-icon-receiving" },
        { name: "/AdminList", navItem: "管理员管理", icon: "el-icon-user" },
        { name: "/Password", navItem: "修改密码", icon: "el-icon-coin" }
      ];
    } else {
      //功能显示
      this.navList = [
        { name: "/Home", navItem: "首页", icon: "el-icon-discount" },
        { name: "/UserList", navItem: "用户管理", icon: "el-icon-service" },
        { name: "Access", navItem: "出入统计", icon: "el-icon-receiving" },
        { name: "/Password", navItem: "修改密码", icon: "el-icon-coin" }
      ];
    }
    if(userMesage.username !==""){
      this.username=userMesage.username
    }
    //标题的显示
    switch (this.$route.name) {
      case "UserList":
        this.title = "用户管理";
        break;
      case "Home":
        this.title = "首页";
        break;
      case "Access":
        this.title = "出入统计";
        break;
      case "RecordList":
        this.title = "健康记录";
        break;
      case "AdminList":
        this.title = "管理员管理";
        break;
      case "AdminAdd":
        this.title = "管理员添加";
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background: rgb(237, 244, 250);
}
.el-aside {
  background: linear-gradient(
    rgb(67, 135, 199),
    rgb(58, 170, 186),
    rgb(50, 201, 174)
  );
  color: white;
  height: 100%;
}
.brand {
  width: 64%;
  margin-top: 40px;
  margin-left: 16%;
  margin-bottom: 20px;
}
.el_submenu__title:hover,
.el-submenu:hover,
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.4) !important ;
}
.el-menu {
  border-right: 0 !important;
}
.el-menu-item {
  margin-top: 10px;
}
.el-menu-item i {
  color: inherit;
  margin-right: 20px;
  margin-left: 10px;
}
.el-header {
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 10px rgb(67, 135, 199, 0.2);
  line-height: 70px;
}
.avator {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.el-main {
  padding: 0;
  margin: 20px;
  background: rgb(255, 255, 255);
}
/* background: -moz-linear-gradient(top, #000000 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -o-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -ms-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: linear-gradient(to bottom, #000000 0%,#ffffff 100%); */
</style>
