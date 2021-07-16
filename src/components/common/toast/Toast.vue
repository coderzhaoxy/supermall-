<template>
  <div class="toast" v-show="isShow">
    <span>{{this.message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration){
        this.isShow = true
        this.message = message

        setTimeout(()=>{
          this.isShow = false
          this.message = ''
        },duration)
      }
    }

  }
</script>

<style scoped>
  .toast {
    text-align: center;
    width: 70%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 30px;
    z-index: 9;
  }
</style>
