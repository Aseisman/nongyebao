<template>
  <div>
      登陆界面
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  mounted(){
    var data={
      username:'admin',
      password:'admin',
    }
    console.log(this.$axios);
    this.$axios.supManLogin(data).then(res=>{
      console.log(res)
    })
  },
  methods:{

  }
}
</script>

<style>

</style>