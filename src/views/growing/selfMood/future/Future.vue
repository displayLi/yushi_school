<!--
1. 未来畅想
2. 心情日志
3.我的作业
  都在这个页面里面写的
-->


<template>
  <div id="Future">
    <Headers
      :titleheader="titleheader"
      :more="more"
      @click="$router.push({name:'writeIdeal',params:{typeId:$route.params.id}})"
    ></Headers>
    <!-- 作业头部tab type = 4 显示tab栏 -->
    <div class="homework-container" v-if="$route.params.id == '4'">
      <ul>
        <li v-for="(item,index) in workNavList" :key="index" @click="getWorkProface(index)">
          <span :class="{active:index == tabFlag}">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 未来畅想、心情日志、我的作业内容 共用一个 -->
    <mt-loadmore
      :bottomMethod="loadBottom"
      :bottomAllLoaded="allLoaded"
      :autoFill="false"
      bottomPullText="加载更多"
      bottomDropText="释放加载"
      ref="loadmore"
    >
      <ul>
        <li class="list" v-for="(item,index) in dataList" :key="index" v-if="item.topic_context">
          <div class="item-box">
            <p>{{item.topic_context}}</p>
            <ul class="img-box" v-if="item.image_list">
              <li
                v-for="(img,flag) in item.image_list"
                @click="showImgDetails(item.image_list,flag)"
                :key="flag"
              >
                <img :src="img" alt>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <!-- 图片查看器 -->
    <div v-if="isShow">
      <Swiper
        :imgItemList="showImg"
        @click="LayerClose"
        :continuous="false"
        :swiperIndex="swiperIndex"
      ></Swiper>
    </div>
    <!-- 无内容显示 -->
    <NotData v-if="dataList.length == 0"/>
  </div>
</template>

<script>
import Vue from "vue";
import { Loadmore } from "mint-ui";

import Headers from "@/components/Header";
import NotData from "@/components/NotData";
import Swiper from "@/components/swiper";
import { Alerts } from "@/common/js/common";
export default {
  name: "future",
  data() {
    return {
      dataList: [],
      showImg: [],
      isShow: false,
      swiperIndex: 0,
      titleheader: "",
      more: "",
      workNavList: [{ name: "课堂作业" }, { name: "课后作业" }],
      tabFlag: 0,
      allLoaded: false, // 如果是最后一页不在进行加载
      page: 1,
      totalPage: 1
    };
  },
  methods: {
    // 作业的tab
    getWorkProface(index) {
      this.tabFlag = index;
      switch (index) {
        case 0:
          this.ktzy();
          break;
        case 1:
          this.public(this.page);
          break;
      }
    },
    // 课堂作业
    ktzy() {
      this.axios.post("/course/getHomeworkList").then(res => {
        this.dataList = res.list;
      });
    },
    // 课后作业以及其他公用页面的接口
    public(page) {
      this.axios("/friend/getDiaryList", {
        params: {
          topic_type: this.$route.params.id,
          page
        }
      }).then(res => {
        console.log(res);
        this.totalPage = res.totalPage;
        this.dataList = res.list;
      });
    },
    // 下拉加载
    loadBottom() {
      setTimeout(() => {
        if (this.page < this.totalPage) {
          this.page++;

          this.$refs.loadmore.onBottomLoaded();
          this.axios("/friend/getDiaryList", {
            params: {
              topic_type: this.$route.params.id,
              page: this.page
            }
          }).then(res => {
            res.list.forEach(el => {
              this.dataList.push(el);
            });
          });
        } else {
          this.allLoaded = true;
          Alerts("没有更多数据了！");
          this.$refs.loadmore.onBottomLoaded();
        }
      }, 1500);
    },
    showImgDetails(item, index) {
      this.showImg = item;
      this.swiperIndex = Number(index);
      this.isShow = true;
    },
    LayerClose() {
      this.isShow = false;
    }
  },
  created() {
    switch (this.$route.params.id) {
      case "2":
        this.public(this.page);
        this.titleheader = "心情日志";
        this.more = "写日志";
        sessionStorage.typeId = this.$route.params.id;
        break;
      case "3":
        this.public(this.page);
        this.titleheader = "未来畅想";
        this.more = "写畅想";
        sessionStorage.typeId = this.$route.params.id;
        break;
      case "4":
        this.getWorkProface(0); // 先调用下 默认是第一个 那么就固定为0
        this.titleheader = "我的作业";
        this.more = "添加作业";
        sessionStorage.typeId = this.$route.params.id;
        break;
    }
  },
  components: {
    Headers,
    Swiper,
    NotData,
    "mt-loadmore": Loadmore
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Future {
  position: absolute;
  top: Rem(45);
  bottom: 0;
  width: 100%;
  overflow: scroll;
  background-color: #fff;
  .list {
    box-sizing: border-box;
    padding: Rem(16) Rem(14) Rem(18);
    border-bottom: Rem(1) solid #eee;
    width: 100%;
    p {
      font-size: Rem(15);
      color: #333;
    }
    .img-box {
      font-size: 0;
      li {
        display: inline-block;
        width: Rem(114);
        height: Rem(114);
        box-sizing: border-box;
        padding: Rem(4);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .homework-container {
    ul {
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      li {
        height: Rem(45);
        color: #333333;
        line-height: Rem(45);
        font-size: Rem(15);
        span {
          height: 80%;
          display: block;
        }
      }
    }
  }
  .active {
    display: inline-block;
    color: #5fb655;
    border-bottom: Rem(2) solid #5fb655;
  }
}
</style>