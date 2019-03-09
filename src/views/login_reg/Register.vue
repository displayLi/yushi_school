<template>
  <div class="box_cont">
    <div class="reg_box">
      <div v-for="item in jueses" :key="item.num" @click="tochosejuese(item.num)" class="juese_item">
        <img :src="item.img" class="item_img">
        <p class="item_text"><img v-if="actnum==item.num" class="duigou" src="/static/img/duigou.png"></img>{{item.name}}</p>
      </div>
      <div class="next" @click="tonext">下一步</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        jueses:[
          {num:1,name:'学生',img:'/static/img/juese_img1.png'},
          {num:3,name:'老师',img:'/static/img/juese_img3.png'},
          {num:2,name:'家长',img:'/static/img/juese_img2.png'}
        ],
        actnum:1,
      };
    },
    methods: {
      tochosejuese (num) {
        this.actnum=num
      },
      tonext () {
        window.sessionStorage.setItem('jsnum',this.actnum)
        this.$router.push({ path: "/register2sz"})
      }
    },
    mounted () {
      if (window.sessionStorage.getItem('jsnum')) {
        this.actnum=window.sessionStorage.getItem('jsnum')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  $bordercolor:#EEEEEE;
  .box_cont{
    width:100%;
    min-height: 100vh;
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .reg_box{
      width:Rem(375);
      margin:0 auto;
      text-align: center;
      .juese_item{
        width:Rem(86);
        margin:0 auto;
        margin-top:Rem(32);
        .item_img{
          width:Rem(86);
          height:Rem(86);
        }
        .item_text{
          color:#333333;
          font-size:Rem(15);
          margin-top:Rem(3);
          img.duigou{
            width:Rem(16);
            height:Rem(16);
            margin-right:Rem(5);
            position: relative;
            top:Rem(2);
          }
        }
      }
      .next{
        margin:0 auto;
        margin-top:Rem(40);
        margin-bottom:Rem(25);
        width:Rem(340);
        height:Rem(45);
        line-height:Rem(45);
        border-radius: Rem(2);
        text-align: center;
        background: $background;
        font-size:Rem(15);
        color:#ffffff;
      }
    }
  }
</style>
