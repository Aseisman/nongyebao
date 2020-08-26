<template>
  <!-- <div> -->
    <!-- <div style="display:flex;justify-content: space-around;margin-top: 30px;">
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-1.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">小区人数（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">{{homeData.total}}</div>
        </div>
      </div>
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-3.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">今日入小区（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">{{homeData.entry}}</div>
        </div>
      </div>
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-4.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">预警人数（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">{{homeData.atention}}</div>
        </div>
      </div>
    </div> -->
    <!-- <div style="margin-top:50px;margin-left:24px;">
      <div
        style="width: 47%;text-align: center;border-radius: 24px;box-shadow: 0px 0px 10px rgb(67, 135, 199, 0.2);border: 1px dashed rgba(249,249,249,0.4);float:left;"
      >
        <div style="font-size: 25px;margin-top: 7px;">一周小区流动情况</div>
        <div id="myFirstChart" style="width:100%;height:309px;"></div>
      </div>
    </div> -->
    <!-- 一周健康信息数据统计 -->
    <!-- <div style="margin-top:50px;margin-left:24px;">
      <div
        style="width: 46%;text-align: center;border-radius: 24px;box-shadow: 0px 0px 10px rgb(67, 135, 199, 0.2);border: 1px dashed rgba(249,249,249,0.4);float:left;margin-left: 35px;"
      >
        <div style="font-size: 25px;margin-top: 7px;">用户健康信息数据统计</div>
        <div id="mySecondChart" style="width:100%;height:309px;"></div>
      </div>
    </div>
  </div> -->
  <div>欢迎您！</div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      homeData: ""
    };
  },
  mounted() {
  },
  updated() {
  },
  methods: {
  }
};
</script>

<style>
</style>