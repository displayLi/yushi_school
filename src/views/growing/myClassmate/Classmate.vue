<template>
  <div id="Classmate">
    <Headers titleheader="我的同班同学"></Headers>
    <ul>
      <li v-for="(item,index) in Classmate" :key="index" @click="GotoDetail(item)">
        <div class="flag" v-if="item.read_count">
          <mt-badge class="flag-icon" height="10" size="small" type="error">{{item.read_count}}</mt-badge>
        </div>
        <div class="avatar">
          <img :src="item.icon" :alt="item.name">
        </div>
        <div class="name">
          <p>
            <span>{{item.name}}</span>
            <span class="icon">
              <svg
                t="1550482500354"
                class="icon"
                style
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2252"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
              >
                <path
                  d="M320 230.8 361.4 192 704 512 361.4 832 320 793.4 621 512Z"
                  p-id="2253"
                  fill="#dbdbdb"
                ></path>
              </svg>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import { Badge } from 'mint-ui';
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "Classmate",
  data() {
    return {
      Classmate: []
    };
  },
  methods: {
    GotoDetail(item) {
      this.$router.push({ name: "classMateDetail", params: { item } });
      sessionStorage.user = JSON.stringify(item);
    }
  },
  created() {
    this.axios.post("/interest/getSameClass").then(res => {
      this.Classmate = res;
    });
  },
  components: {
    Headers,
    "mt-badge":Badge
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Classmate {
  padding-top: Rem(43);
  background-color: #fff;
  ul {
    box-sizing: border-box;
    padding: 0 Rem(10) Rem(30) Rem(28);
    li {
      font-size: 0;
      height: Rem(81);
      line-height: Rem(81);
      border-bottom: Rem(1) solid #eee;
      position: relative;
      .flag {
        position: absolute;
        top:Rem(-15);
        left:Rem(38);
        .flag-icon{
          width: 100%;
          line-height: 100%;
        }
      }
      .avatar {
        display: inline-block;
        vertical-align: middle;
        width: Rem(60);
        height: Rem(60);
        line-height: Rem(60);
        border-radius: 50%;
        border: Rem(1) solid #f0f0f0;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .name {
        display: inline-block;
        vertical-align: middle;
        p {
          padding-left: Rem(16);
          span {
            font-size: Rem(15);
            color: #333;
          }
          .icon {
            position: absolute;
            right: Rem(-10);
            top: 25%;
            width: Rem(80);
            height: Rem(30);
            svg {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>