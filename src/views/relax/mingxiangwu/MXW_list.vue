<template>
  <div id="MXW_list">
    <Headers titleheader="冥想屋"></Headers>
    <!-- 列表 -->
    <div class="list-container">
      <ul>
        <li v-for="(item,index) in getMxwListArr" @click="gotoPlayer(item.audio)" :key="index">
          <span class="img-box">
            <img :src="item.img" :alt="item.name">
          </span>
          <span class="audio-name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "mxw_list",
  data() {
    return {
      getMxwListArr: []
    };
  },
  methods: {
    getMxwList() {
      this.axios("/interest/getThink").then(res => {
        this.getMxwListArr = res;
      });
    },
    gotoPlayer(audioUrl) {
      this.$router.push({ name: "mxw_player", params: { audioUrl } });
    }
  },
  created() {
    this.getMxwList();
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#MXW_list {
  margin-top: Rem(60);
  .list-container {
    box-sizing: border-box;
    padding: 0 Rem(13);
    width: 100%;
    ul {
      li {
        background-color: #5fb655;
        border-radius: Rem(37.5);
        margin: Rem(16) auto;
        height: Rem(75);
        .img-box {
          display: inline-block;
          width: Rem(71);
          height: Rem(71);
          line-height: Rem(71);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          margin: Rem(2) 0 0 Rem(2.5);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .audio-name {
          display: inline-block;
          width: 65%;
          font-size: Rem(12);
          color: white;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>