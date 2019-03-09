<template>
  <div id="My_bottle">
    <Headers titleheader="弹个瓶"></Headers>
    <ul class="msgList">
      <li
        v-for="(item,index) in msgList"
        :key="index"
        @click="$router.push({name:'postmsg',params:item})"
      >
        <div class="avatar">
          <img :src="'https://api.ziyushi.com' + item.icon" alt>
        </div>
        <div class="msg-container">
          <p class="nick-name">
            <span>{{item.nick_name}}</span>
            <span class="time">{{item.add_time}}</span>
          </p>
          <p class="msg">{{item.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "my_bottle",
  data() {
    return {
      msgList: []
    };
  },
  components: {
    Headers
  },
  created() {
    // 获取我的瓶子列表
    this.axios.post("/interest/getBottleList").then(res => {
      this.msgList = res;
    });
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#My_bottle {
  position: absolute;
  top: Rem(43);
  left: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../../assets/my_bottle-bg.png", cover);
  .msgList {
    li {
      box-sizing: border-box;
      padding: Rem(10) Rem(15);
      font-size: 0;
      border-bottom: Rem(1) solid #ccc;
      .avatar {
        vertical-align: middle;
        display: inline-block;
        width: Rem(40);
        height: Rem(40);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .msg-container {
        padding-left: Rem(20);
        display: inline-block;
        vertical-align: middle;
        line-height: Rem(20);
        .nick-name {
          font-size: Rem(12);
          color: #333;
          width: Rem(280);
          .time {
            float: right;
          }
        }
        .msg {
          font-size: Rem(12);
        }
      }
    }
  }
}
</style>