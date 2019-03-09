<template>
  <div id="MTL_details">
    <Headers titleheader="曼陀罗"></Headers>
    <!-- tab -->
    <div class="tab-container">
      <ul>
        <li
          v-for="(item,index) in mtlnavList"
          @click="selectTypes(index + 1)"
          :key="index"
          :data-id="item.id"
          :class="{active : tabFlag == index + 1}"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- content -->
    <div class="tab-contents">
      <ul>
        <li v-for="(item,index) in detailsList" :key="index" @click="gotoJing(item)">
          <span v-if="item.pass_history == 1">{{index+1}}</span>
          <span class="lock" v-if="item.pass_history == 0">
            <img src="../../../assets/mtl-lock.png" alt>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "mtl_details",
  data() {
    return {
      mtlnavList: [{ name: "涂鸦篇" }, { name: "畅想篇" }],
      tabFlag: 1,
      detailsList: []
    };
  },
  components: {
    Headers
  },
  methods: {
    selectTypes(index) {
      this.tabFlag = index;
      this.getListDatas(index);
    },
    getListDatas(type = this.tabFlag) {
      this.axios("/interest/getGuanQiaList", {
        params: {
          type,
          token: sessionStorage.token
        }
      }).then(res => {
        this.detailsList = res;
      });
    },
    gotoJing(item) {
      this.$router.push({ name: "jing", params: { item } });
      sessionStorage.item = JSON.stringify(item);
    }
  },
  created() {
    this.getListDatas();
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#MTL_details {
  position: absolute;
  bottom: 0;
  top: Rem(43);
  width: 100%;
  @include bgImg("../../../assets/beijing.png", cover);
  .tab-container {
    ul {
      margin: Rem(11) auto Rem(45);
      text-align: center;
      width: Rem(200);
      height: Rem(36);
      background-color: #fff;
      font-size: 0;
      border-radius: Rem(18);
      line-height: Rem(36);
      li {
        display: inline-block;
        font-size: Rem(15);
        color: #5fb655;
        width: 50%;
      }
    }
  }
  .active {
    border-radius: Rem(18);
    height: Rem(36);
    background-color: #5fb655;
    color: #fff !important;
  }
  .tab-contents {
    box-sizing: border-box;
    padding: 0 Rem(12);
    ul {
      font-size: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        padding-right: Rem(25);
        margin-bottom: Rem(16);
        span {
          display: block;
          box-sizing: border-box;
          font-size: Rem(20);
          width: Rem(50);
          height: Rem(50);
          background: linear-gradient(0deg, #fbc601, #fbd202);
          border: Rem(2) solid #fff;
          border-radius: 50%;
          text-align: center;
          line-height: Rem(50);
          color: #fff;
        }
        .lock {
          background: #bfbfbf;
          img {
            width: Rem(16);
            height: Rem(20);
            object-fit: contain;
          }
        }
      }
      li:nth-of-type(5n) {
        padding-right: 0;
      }
    }
  }
}
</style>