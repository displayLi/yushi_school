<template>
  <div id="historyKC">
    <Headers :titleheader="title" :more="more" @click="emptySC"></Headers>
    <div class="shipin_list_box" v-if="kcList.length > 0">
      <ul class="shipin_list">
        <li
          class="shipin_item"
          @click="$router.push('/ketangxiangqing?id=' + item.course_id)"
          v-for="(item,index) in kcList"
          :key="index"
        >
          <img :src="item.logo">
          <div class="item_right">
            <p class="p1">{{item.course_name}}</p>
            <p class="p2">{{item.title}}</p>
            <p class="p3">
              <span class="p3_left">{{item.page_viewcount}}人参与</span>
              <span class="p3_right">
                <img src="/static/img/shipin_logo.png" v-if="item.isVideo == 2">
                <img
                  src="/static/img/yinpin_logo.png"
                  v-if="item.isVideo == 1"
                  style="width:15px;height:19px;position:relative;top:3px;"
                >
                <span
                  :class="item.buyHistory == 2 ? 'hong' : ''"
                >{{item.source_price == 0 ? '免费' : item.source_price == 1 ? '已购买' : item.source_price }}</span>
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <NotData v-if="kcList.length == 0"/>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import NotData from "@/components/NotData";
import { Alerts } from "@/common/js/common";
export default {
  name: "historyKC",
  data() {
    return {
      kcList: [],
      title: "",
      more: ""
    };
  },
  methods: {
    // 历史
    history() {
      this.axios.post("/course/getCourseHistoryList").then(res => {
        this.kcList = res.list;
      });
    },
    // 收藏
    like() {
      this.axios.post("/course/getFavouriteList").then(res => {
        this.kcList = res.list;
      });
    },
    // 购买的课程
    product() {
      this.axios(
        `/course/getBuyCourseList?uuid=${1}&page=${1}&size=${10}`
      ).then(res => {
        this.kcList = res.list;
      });
    },
    // 清空收藏和历史
    emptySC() {
      if (this.$route.params.type == "like") {
        if (this.kcList.length > 0) {
          this.axios.post("/course/deleteAllFavourite").then(res => {
            if (!res) {
              Alerts("清理成功！");
              this.kcList.splice(0);
            }
          });
        } else {
          Alerts("没有要清理的课程~");
        }
      } else if (this.$route.params.type == "history") {
        if (this.kcList.length > 0) {
          this.axios.post("/course/deleteHistoryList").then(res => {
            if (!res) {
              Alerts("清理成功！");
              this.kcList.splice(0);
            }
          });
        } else {
          Alerts("没有要清理的课程~");
        }
      }
    }
  },
  created() {
    switch (this.$route.params.type) {
      case "history":
        this.title = "历史课程";
        this.more = "清空历史";
        this.history();
        break;
      case "like":
        this.title = "收藏的课程";
        this.more = "清空收藏";
        this.like();
        break;
      case "product":
        this.title = "购买的课程";
        this.product();
        break;
    }
  },
  components: {
    Headers,
    NotData
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/common.scss";
#historyKC {
  padding-top: Rem(43);
  background-color: #fff;
  .shipin_list_box {
    width: 100%;
    .shipin_list {
      width: Rem(350);
      margin: 0 auto;
      padding-bottom: Rem(30);
      .shipin_item {
        margin-top: Rem(21);
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        img {
          width: Rem(119);
          height: Rem(77);
        }
        .item_right {
          position: relative;
          width: Rem(211);
          height: Rem(77);
          .p1 {
            height: Rem(18);
            overflow: hidden;
            color: #333333;
            font-size: Rem(15);
          }
          .p2 {
            height: Rem(16);
            overflow: hidden;
            color: #666666;
            font-size: Rem(12);
            margin-top: Rem(10);
          }
          .p3 {
            width: 100%;
            position: absolute;
            bottom: Rem(-4);
            .p3_left {
              line-height: Rem(0);
              color: #999999;
              font-size: Rem(12);
            }
            .p3_right {
              position: absolute;
              right: 0;
              bottom: Rem(7);
              line-height: Rem(0);
              img {
                width: Rem(12);
                height: Rem(8);
              }
              span {
                font-size: Rem(15);
                margin-left: Rem(10);
              }
              span.hong {
                color: #fe0001;
              }
            }
          }
        }
      }
    }
  }
}
</style>