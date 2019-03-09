<template>
  <div class="header_cont">
    <div class="cont_head">
      <img @click="$router.go(-1)" class="fanhui" src="/static/img/fh.png">
      <div class="title">{{coursename}}</div>
      <img class="shoucangqian" @click="collection" :src="favouritehistory==1?'/static/img/ysc.png':'/static/img/sc.png'">
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    name: "ClassHeader",
    props:{
      favouritehistory:{type: String},
      coursename:{type: String},
      classid:{type: String},
      getdata:{type: Function},
      islogin:{type: Function},
    },
    data() {
      return {

      };
    },
    methods: {
      collection () {
        if (sessionStorage.getItem("userInfo")) {

        } else {
          if (this.islogin) {
            this.islogin()   //  未登录去登录
          }
          return false
        }
        let url = '/course/deleteFavourite'
        if (this.favouritehistory == 0) {
          url = '/course/setFavourite'
        }
        this.axios.post(url, {courseId: this.classid})
          .then(data => {
            this.tos(this.favouritehistory == 0?'收藏成功':'取消收藏成功')
            if (this.getdata) {
              this.getdata()
            }
          })
      },
      tos (test) {
        Toast({message: test, position: 'middle', duration: 2000});
      },
    },
    components: {  },
    mounted () {
      // this.favourite_history=window.obj.favourite_history
      // console.log('1',window.obj.favourite_history);
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  .header_cont{
    width:100%;
    height: Rem(43);
    background: $background;
    position: fixed;
    top:0;
    z-index: 1000;
    .cont_head{
      width:Rem(375);
      height: Rem(43);
      margin:0 auto;
      position: relative;
      img.fanhui{
        width:Rem(7);
        height:Rem(12);
        position:absolute;
        top:Rem(15);
        left:Rem(11);
      }
      .title{
        width:100%;
        height: Rem(43);
        line-height: Rem(43);
        text-align: center;
        font-size:Rem(15);
        color:#FFFFFF;
      }
      img.shoucangqian{
        width:Rem(26);
        height:Rem(24);
        position:absolute;
        top:Rem(8);
        right:Rem(13);
      }
    }
  }
</style>
