<template>
  <div class="box_cont">
    <Header titleheader="所有评论"></Header>
    <div class="pinglunlist">
      <div class="pinglun_item" v-for="(item, index) of comments" :key="index">
        <img :src="item.icon" class="item_left">
        <div class="item_right">
          <p class="p1">{{item.nick_name}}</p>
          <p class="p2">{{item.content}}</p>
          <p class="p3"><span>{{item.add_time}}</span> <span class="p3_pl" @click="addComment2(item)"><img src="/static/img/pl.png" class="pl_logo">评论</span></p>
          <div class="item_pl">
            <span class="before"></span>
            <p class="item_pl_item" v-for="(reply, index) of item.replyList" :key="index"><span>{{reply.nick_name + ' : '}}</span>{{reply.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/Header.vue";
  import { Toast , MessageBox } from "mint-ui";
  export default {
    name: "AllPinglun",
    data() {
      return {
        classid:'',
        comments:[]
      };
    },
    methods: {
      getComment () {
        this.axios.post('/friend/getCourseCommentList', {otherId: 2165})
          .then(data => {
            this.comments = data.list
          })
      },
      addComment2 (commentObj) {
        MessageBox.prompt('评论').then(({ value, action }) => {
          this.axios.post('/friend/addComment', {
            content: value,
            otherId: 2165,
            toUserId: commentObj.user_id,
            type: 1,
            parentId: commentObj.comment_id
          }).then(data => {
            this.getComment()
          })
        })
      },
    },
    components: { Header },
    mounted () {
      this.classid=sessionStorage.getItem('classid')
      this.getComment()
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  .box_cont{
    width:100%;
    min-height: 100vh;
    background: #ffffff;
    .pinglunlist{
      width:Rem(375);
      min-height: Rem(200);
      margin:0 auto;
      margin-top:Rem(43);
      .pinglun_item{
        padding:Rem(15) Rem(12) Rem(12) Rem(13);
        display: flex;
        box-sizing: border-box;
        img.item_left{
          width:Rem(55);
          height: Rem(55);
          border-radius: 50%;
          margin-right:Rem(5);
          position:relative;
          top:Rem(-3);
        }
        .item_right{
          width:Rem(288);
          .p1{
            color:#333333;
            font-size:Rem(13);
          }
          .p2{
            color:#666666;
            font-size:Rem(13);
            margin-top:Rem(6);
          }
          .p3{
            width:100%;
            color:#999999;
            margin-top:Rem(11);
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            span{
              font-size:Rem(11);
            }
            .p3_pl{
              position: relative;
              top:Rem(-3);
              img.pl_logo{
                width:Rem(15);
                height: Rem(14);
                margin-right:Rem(6);
                position: relative;
                top:Rem(3);
              }
            }
          }
          .item_pl{
            margin-top:Rem(11);
            background:#FAFAFA;
            width:Rem(288);
            box-sizing: border-box;
            padding:Rem(3) Rem(13) Rem(10) Rem(10);
            border-radius:Rem(4);
            position: relative;
            span.before{
              width:0;
              height:0;
              border: Rem(6) solid transparent;
              border-bottom:Rem(6) solid #FAFAFA;
              position:absolute;
              top:Rem(-12);
              left:Rem(15);
            }
            .item_pl_item{
              padding-top:Rem(8);
              font-size:Rem(11);
              color:#666666;
              span{
                color:#0D0DFB;
              }
            }
          }
        }
      }
    }
  }
</style>
