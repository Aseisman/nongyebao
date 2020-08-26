<template>
  <div class="box">
    <div style="width: 560px;text-align: center;font-size: 25px;margin-bottom: 30px;">上传问题</div>
    <div style="margin-left: 16px;">
      <span>题目：</span>
      <input type="text" class="input" v-model="Title" />
    </div>
    <div style="margin-left: 16px;">
      <span>描述：</span>
      <textarea class="input" v-model="Detail" style="border: 1px dashed grey;height: 100px;"></textarea>
    </div>
    <div style="margin-left: 16px;">
      <span>位置：</span>
      <input type="text" class="input" v-model="Position" />
    </div>
    <div style="margin-left: 16px;">
      <span>农作物：</span>
      <input type="text" style="width:380px" class="input" v-model="Crop" />
    </div>
    <button class="yy-btn" @click="publish">上传问题</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            Title:"",
            Position:"",
            Crop:"",
            Detail:"",
        }
    },
    methods:{
        publish(){
            var data={
                Title:this.Title,
                Position:this.Position,
                Crop:this.Crop,
                Detail:this.Detail,
            }
        this.$axios.newQuestion(data).then(res=>{
            if(res.code==200){
                this.$message({
                message: "上传成功,即将跳转到列表",
                type: "success",
              });
              setTimeout(function () {
                this.$router.replace({
                  path: "/QuestionList",
                });
              }, 2000);
            }
        })
        }
    }
};
</script>

<style scoped>
.box {
  margin-left: 20%;
  margin-top: 30px;
  line-height: 40px;
  font-size: 20px;
}
.input {
  border: 0;
  border-bottom: 1px solid grey;
  width: 400px;
  outline: none;
  font-size: 17px;
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
  margin-left: 175px;
}
</style>