<template>
  <div>
    <!-- 总住户人数 -->
    <!-- 今日进入小区人数 -->
    <!-- 预警人员 -->
    <div style="display:flex;justify-content: space-around;margin-top: 30px;">
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-1.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">小区人数（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">666</div>
        </div>
      </div>
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-3.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">今日入小区（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">666</div>
        </div>
      </div>
      <div style="width:30%;position:relative;">
        <img src="../assets/images/bg-img-4.png" alt style="width: 100%;" />
        <div style="position: absolute;top: 50px;left: 60px;">
          <div style="color: rgba(249,249,249,0.9);font-size: 20px;margin-bottom: 15px;">预警人数（人）</div>
          <div style="color: rgba(249,249,249,0.9);font-size: 30px;">666</div>
        </div>
      </div>
    </div>
    <!-- <div>一周出入情况</div> -->
    <div style="margin-top:50px;margin-left:24px;">
      <div
        style="width: 43%;text-align: center;border-radius: 24px;box-shadow: 0px 0px 10px rgb(67, 135, 199, 0.2);border: 1px dashed rgba(249,249,249,0.4);float:left;"
      >
        <div style="font-size: 25px;margin-top: 7px;">一周小区流动情况</div>
        <div id="myFirstChart" style="width:100%;height:309px;"></div>
      </div>
    </div>
    <!-- 一周健康信息数据统计 -->
    <div style="margin-top:50px;margin-left:24px;">
      <div
        style="width: 43%;text-align: center;border-radius: 24px;box-shadow: 0px 0px 10px rgb(67, 135, 199, 0.2);border: 1px dashed rgba(249,249,249,0.4);float:left;margin-left: 35px;"
      >
        <div style="font-size: 25px;margin-top: 7px;">用户健康信息数据统计</div>
        <div id="mySecondChart" style="width:100%;height:309px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    var that=this;
    this.$axios.home().then(res=>{
      console.log(res);
    })
    this.getChart();
  },
  updated() {
    // var myFirstChart = echarts.init(document.getElementById("myFirstChart"));
    // var mySecondChart = echarts.init(document.getElementById("mySecondChart"));
    // myFirstChart.resize();
    // mySecondChart.resize();
  },
  methods: {
    getChart() {
      var myFirstChart = echarts.init(document.getElementById("myFirstChart"));
      var mySecondChart = echarts.init(
        document.getElementById("mySecondChart")
      );
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "进入小区",
            type: "bar",
            barWidth: "60%",
            data: [10, 23, 34, 64, 111, 23, 34, 22]
          }
        ]
      };
      let option2 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          prient: "vertical",
          left: "left",
          data: ["体温正常", "体温预警", "已生病"]
        },
        series: [
          {
            name: "小区范围内",
            type: "pie",
            barWidth: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 100, name: "体温正常" },
              { value: 100, name: "体温预警" },
              { value: 100, name: "已生病" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0,0,0,0.5)"
              }
            }
          }
        ]
      };
      myFirstChart.setOption(option);
      window.addEventListener("resize",()=>{console.log("开始resize");myFirstChart.resize();})
      mySecondChart.setOption(option2);
      window.addEventListener("resize",()=>{console.log("开始resize");mySecondChart.resize();})
    }
  }
};
</script>

<style>
</style>