<template>
  <!-- <baidu-map :style="{width:'500px',height:'500px'}" class="map" ak="mbX8N5ftbfXqcHAKGf7DelKxVeXjnFnE" :center="location" @ready="handler"> -->
  <!-- :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}" @ready="handler" :scroll-wheel-zoom="true" -->

  <!-- </baidu-map> -->
  <baidu-map
    class="bmView"
    :style="{width:'100%',height:'86vh'}"
    :scroll-wheel-zoom="true"
    :center="location"
    :zoom="zoom"
    ak="mbX8N5ftbfXqcHAKGf7DelKxVeXjnFnE"
    v-loading="loading"
  >
    <div v-for="(item,index) in citysp" :key="index">
      <bm-marker :position="{lng: item[1], lat: item[0]}" @click="infoWindowOpen(index,item)">
        <bm-info-window :show="item[2]">
          <!-- 自定义显示内容 -->
          <div
            style="display: flex;flex-direction: column;width: 200px;max-height: 200px;align-items: center;justify-content: center;"
          >
            <div>{{citys[index]}}</div>
            <div>{{threeDays[0].obsTime}}</div>
            <div>
              <img :src="require('../assets/color-64/'+threeDays[0].icon+'.png')" alt />
            </div>
            <div
              style="display: flex;justify-content: space-between;width: 100%;margin-left: 27px;"
            >
              <div>
                <div>气温:{{threeDays[0].temp}}℃</div>
                <div>天气:{{threeDays[0].text}}</div>
              </div>
              <div>
                <div>降雨量:{{threeDays[0].precip}}毫米</div>
                <div>压强:{{threeDays[0].pressure}}百帕</div>
              </div>
            </div>

            <div>{{threeDays[0].windDir}}&emsp;{{threeDays[0].windScale}}级</div>
          </div>
        </bm-info-window>
      </bm-marker>
    </div>
  </baidu-map>
</template>

<script>
// import BaiduMap from 'vue-baidu-map'
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import axios from "axios";
export default {
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
  },
  data() {
    return {
      location: {
        lng: 108.953098,
        lat: 34.2778,
      },
      zoom: 5,
      hefengkey: "3ce705dcb3f44d1e8d7d3d5120db697f",
      threeDays: [],
      citys: [
        "北京",
        "哈尔滨",
        "呼和浩特",
        "郑州",
        "上海",
        "天津",
        "重庆",
        "长春",
        "石家庄",
        "太原",
        "沈阳",
        "济南",
        "合肥",
        "南京",
        "西安",
        "银川",
        "兰州",
        "长沙",
        "西宁",
        "南昌",
        "福州",
        "成都",
        "武汉",
        "杭州",
        "广州",
        "贵阳",
        "昆明",
        "海口",
        "乌鲁木齐",
        "南宁",
        "澳门",
        "台北",
        "拉萨",
        "香港",
      ], //名字
      citysid: [
        "101010100",
        "101020100",
        "101040100",
        "101120101",
        "101090101",
        "101060101",
        "101100101",
        "101220101",
        "101050101",
        "101030100",
        "101070101",
        "101180101",
        "101080101",
        "101170101",
        "101150101",
        "101190101",
        "101160101",
        "101110101",
        "101200101",
        "101250101",
        "101240101",
        "101210101",
        "101230101",
        "101280101",
        "101260101",
        "101270101",
        "101300101",
        "101330101",
        "101130101",
        "101310101",
        "101290101",
        "101320101",
        "101340101",
        "101140101",
      ], //id
      citysp: [
        ["39.90498", "116.40528", true],
        ["45.75696", "126.64246", false],
        ["40.81830", "111.67079", false],
        ["34.75797", "113.66541", false],
        ["31.23170", "121.47264", false],
        ["39.12559", "117.19018", false],
        ["29.56376", "106.55046", false],
        ["43.88684", "125.32450", false],
        ["38.04547", "114.50246", false],
        ["37.85701", "112.54924", false],
        ["41.79676", "123.42909", false],
        ["36.67580", "117.00092", false],
        ["31.86119", "117.28304", false],
        ["32.04154", "118.76741", false],
        ["34.26316", "108.94802", false],
        ["38.46636", "106.27817", false],
        ["36.05804", "103.82355", false],
        ["28.19408", "112.98227", false],
        ["36.62317", "101.77891", false],
        ["28.67649", "115.89215", false],
        ["26.07530", "119.30623", false],
        ["30.65946", "104.06573", false],
        ["30.58435", "114.29856", false],
        ["30.28745", "120.15357", false],
        ["23.12517", "113.28063", false],
        ["26.57834", "106.71347", false],
        ["25.04060", "102.71224", false],
        ["20.03197", "110.33119", false],
        ["43.79281", "87.61772", false],
        ["22.82402", "108.32000", false],
        ["22.20199", "113.54399", false],
        ["25.04000", "121.51599", false],
        ["29.66036", "91.13220", false],
        ["22.30699", "114.17700", false],
      ], //经纬度
      loading: false,
    };
  },
  mounted() {
    // this.searchPoint();
    this.getWeatherByName(this.citysid[0]);
  },
  methods: {
    //地图点搜索函数：
    searchPoint() {
      for (let x in this.citysid) {
        setTimeout(() => {
          this.getWeatherByName(this.citysid[x]);
        }, 50);
      }
      console.log(this.threeDays);
    },
    //根据城市id获得天气信息
    getWeatherByName(cityname) {
      this.loading = true;
      axios({
        url:
          "https://devapi.heweather.net/v7/weather/now?location=" +
          cityname +
          "&key=3ce705dcb3f44d1e8d7d3d5120db697f", // 接口名字
        method: "get",
      }).then((res) => {
        console.log(res);
        if (this.threeDays.length != 0) {
          this.threeDays.pop();
        }
        this.threeDays.push(res.data.now);
        this.loading = false;
      });
    },
    // 显示与否
    infoWindowOpen(index, item) {
      if (item[2] == true) {
        item[2] = false;
        this.$set(this.citysp, index, item);
      } else {
        this.getWeatherByName(this.citysid[index]);
        item[2] = true;
        this.$set(this.citysp, index, item);
      }
    },
  },
};
</script>

<style>
</style>