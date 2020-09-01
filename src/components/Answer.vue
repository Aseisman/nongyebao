<template>
  <div v-loading="loading" style="width:100%;">
    <!-- <div class="box">
      <ul>
        <li
          v-for="(item,index) in chatList"
          :key="index"
          :class="[item.AnswererName==arr[0]?'question':'myMessage']"
        >{{item.AswMsg}}</li>
      </ul>
    </div>
    <div style="max-width: 1130px;">
      <textarea
        v-model="answer"
        style="max-width: 1130px;width: 1158px;height: 20vh;padding-left: 30px;font-size: 16px;}"
      ></textarea>
      <button class="button-active" @click="pushAnswer">提交</button>
    </div>-->
    <div style="width:100%;height:59vh;background:#fefefe;overflow: scroll;overflow-x: hidden;">
      <ul>
        <li
          v-for="(item,index) in chatList"
          :key="index"
          :class="[item.identity=='用户'?'question':'myMessage']"
        >
          <div>
            <div
              style="line-height: 17px;font-size: 15px;color: #767070;margin-bottom: 5px;"
            >{{item.person}} &emsp;{{item.Time}}</div>
            <div
              style="width: 400px;background: #e6e6e6;border-radius: 7px;color: #212b2a;padding-left: 10px;"
            >{{item.AswMsg}}</div>
            <!-- <div style="color: #767070;font-size: 15px;"></div> -->
          </div>
        </li>
      </ul>
    </div>
    <div style="width: 99.5%;height: 24vh;border: 2px solid rgb(182,170,170);border-radius: 10px;position: relative;margin-top: 11px;" v-loading="loading2">
      <textarea
        v-model="answer"
        style="width: 95%;outline: none;border: none;height: 23vh;padding-left: 30px;font-size: 16px;position: absolute;"
      ></textarea>
      <button class="button-active" @click="pushAnswer">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: "",
      chatList: "",
      arr: [],
      loading: false,
      loading2:false,
    };
  },
  created() {
    this.loading = true;
    this.question = this.$route.query.data;
    console.log(this.question);
    this.$axios.getQuestionRecord({ QID: this.question.QID }).then((res) => {
      console.log(res);
      for (let item of res.data) {
        let i = item.AnswererName.indexOf("：");
        let a = item.AnswererName.substring(0, i);
        let person = item.AnswererName.substring(i + 1);
        item.identity = a;
        item.person = person;
      }
      this.chatList = res.data;
      this.loading = false;
    });
  },
  methods: {
    pushAnswer() {
      if (this.answer.length == 0) {
        this.$alert("请输入回答");
        return;
      }
      var that = this;
      this.loading2=true;
      var data = {
        QID: this.question.QID,
        AswMsg: this.answer,
      };
      this.$axios
        .answer(data)
        .then((res) => {
          if (res.code == 200) {
            this.updatechatList();
            this.answer = "";
            this.loading2=false;
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            this.updatechatList();
            this.answer = "";
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    updatechatList() {
      this.$axios.getQuestionRecord({ QID: this.question.QID }).then((res) => {
        for (let item of res.data) {
          let i = item.AnswererName.indexOf("：");
          let a = item.AnswererName.substring(0, i);
          let person = item.AnswererName.substring(i + 1);
          item.identity = a;
          item.person = person;
        }
        this.chatList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 1164px;
  height: 59vh;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.button-active {
  width: 90px;
  height: 35px;
  background-color: #409eff;
  border: #409eff;
  color: white;
  border-radius: 6px;
  position: relative;
  right: -90%;
  top: 19vh;
  outline: none;
}

li {
  list-style: none;
  margin-top: 12px;
}
.myMessage {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  line-height: 30px;
}
.question {
  line-height: 30px;
}
</style>