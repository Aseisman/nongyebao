<template>
  <div v-loading="loading">
    <div class="box">
      <!-- :class="[?'myMessage':'question']" -->
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: "test111",
      chatList: "",
      arr: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.question = this.$route.query.data;
    console.log(this.question);
    this.$axios.getQuestionRecord({ QID: this.question.QID }).then((res) => {
      console.log(res);
      this.chatList = res.data;
      // 处理数据
      var flag;
      for (let item of res.data) {
        flag = false;
        console.log(item);
        for (let i in this.arr) {
          if (this.arr[i] == item.AnswererName) {
            console.log(item.AnswererName);
            flag = true;
            break;
          }
        }
        if (flag == false) {
          this.arr.push(item.AnswererName);
        }
      }
      this.loading=false;
    });
  },
  methods: {
    pushAnswer() {
      if (this.answer.length == 0) {
        this.$alert("请输入回答");
        return;
      }
      var that = this;
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
}

li {
  list-style: none;
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