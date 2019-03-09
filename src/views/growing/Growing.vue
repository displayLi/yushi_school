<template>
  <div class="box_cont">
    <div id="Me">
      <!-- 头部 -->
      <div class="userBg">
        <div class="user-avatar">
          <router-link to="/userInfo">
            <img :src="userInfo.icon" alt>
          </router-link>
        </div>
      </div>
      <!-- navBar -->
      <nav class="navBars">
        <ul>
          <li v-for="(nav,index) in navBar" :key="index" v-if="userInfo.role_type == 1">
            <router-link :to="nav.path">
              <img :src="nav.image" :alt="nav.name">
              <p>{{nav.name}}</p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- 个人中心导航 -->
      <div class="user-list">
        <!-- 学生端登录渲染 -->
        <navList
          v-for="(item,index) in navListItem"
          v-if="userInfo.role_type == 1"
          :key="index"
          :name="item.name"
          :imageUrl="item.imgUrl"
          :returns="item.returns"
          :path="item.path"
          :isShow="item.userType"
        />

        <!-- 非学生端登录渲染 -->
        <navList
          v-for="(item,index) in navListItemShowtwo"
          v-if="userInfo.role_type != 1"
          :key="index"
          :name="item.name"
          :imageUrl="item.imgUrl"
          :returns="item.returns"
          :path="item.path"
          :isShow="item.userType"
        />
      </div>
      <!-- 下面的两个 -->
      <div class="bottom-list">
        <navList
          v-for="(item,index) in navBottoms"
          :key="index"
          :name="item.name"
          :imageUrl="item.imgUrl"
          :returns="item.returns"
          :path="item.path"
        />
        <!-- <div class="bg-click" @click="showShare"></div> -->
      </div>
      <!-- 退出登录 -->
      <div class="logout">
        <btnSubmit
          @click="logout"
          width="231"
          height="46"
          lineHeight="46"
          radius="10"
          :disabled="false"
        >退出登录</btnSubmit>
      </div>
    </div>
    <Footers></Footers>

    <!-- 分享 -->
    <!-- <div class="share" v-if="showshare" @click.stop="hideShare">
      <ul>
        <li v-for="(item,index) in shareList" :key="index" @click.stop="shareType(index)">
          <p>
            <img :src="item.imgUrl" alt>
          </p>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Footers from "../../components/Footers";
import navList from "../../components/NavList";
import btnSubmit from "../../components/btnSubmit";
export default {
  name: "Growing",
  data() {
    return {
      navBar: [
        {
          name: "心情签到",
          image: require("../../assets/mood.png"),
          path: "/reports"
        },
        {
          name: "心情日志",
          image: require("../../assets/log.png"),
          path: "/future/2"
        },
        {
          name: "未来畅想",
          image: require("../../assets/future.png"),
          path: "/future/3"
        },
        {
          name: "学期目标",
          image: require("../../assets/study_target.png"),
          path: "/target"
        }
      ],
      navListItem: [
        {
          name: "成绩记录",
          imgUrl: "cj",
          returns: false,
          path: "/resultsRecord"
        },
        {
          name: "我的作业",
          imgUrl: "zy",
          returns: false,
          path: "/future/4"
        },
        {
          name: "历史课程",
          imgUrl: "history",
          returns: false,
          path: "/kc/history"
        },
        { name: "收藏的课程", imgUrl: "sc", returns: false, path: "/kc/like" },
        {
          name: "购买的课程",
          imgUrl: "product",
          returns: false,
          path: "/kc/product"
        },
        {
          name: "我的自评",
          imgUrl: "zwpj",
          returns: false,
          path: "/selfAssessment"
        },
        {
          name: "月目标月总结",
          imgUrl: "ymb",
          returns: false,
          path: "/monthlyGoals"
        },
        {
          name: "我的同班同学",
          imgUrl: "tx",
          returns: false,
          path: "/classmate"
        },
        {
          name: "问卷调查",
          imgUrl: "wjdc",
          returns: false,
          path: "/questionnaire"
        }
      ],
      navListItemShowtwo: [
        {
          name: "历史课程",
          imgUrl: "history",
          returns: false,
          path: "/kc/history"
        },
        { name: "收藏的课程", imgUrl: "sc", returns: false, path: "/kc/like" },
        {
          name: "购买的课程",
          imgUrl: "product",
          returns: false,
          path: "/kc/product"
        },
        {
          name: "问卷调查",
          imgUrl: "wjdc",
          returns: false,
          path: "/questionnaire"
        }
      ],
      navBottoms: [
        {
          name: "客服中心",
          imgUrl: "kf",
          returns: false,
          path: "/serviceCenter"
        },
        { name: "分享", imgUrl: "fx", returns: false, path: "" }
      ],
      shareList: [
        { name: "微信好友", imgUrl: require("../../assets/wx.png") },
        { name: "朋友圈", imgUrl: require("../../assets/pyq.png") },
        { name: "QQ", imgUrl: require("../../assets/qq.png") },
        { name: "空间", imgUrl: require("../../assets/qqkj.png") }
      ],
      showshare: false
    };
  },
  methods: {
    logout() {
      MessageBox.confirm("确定执行此操作?")
        .then(action => {
          sessionStorage.removeItem("token"); // 清除缓存中的token
          sessionStorage.removeItem("userInfo"); // 清除缓存中的userinfo
          this.$router.push("/loginbeforesz"); // 跳转到登录页面
        })
        .catch(err => console.log("已取消"));
    }
    // 显示分享
    // showShare() {
    //   document.body.style.overflow = "hidden";
    //   this.showshare = true;
    // },
    // // 隐藏分享
    // hideShare() {
    //   document.body.style.overflow = "auto";
    //   this.showshare = false;
    // },
    // // 分享类型
    // shareType(index) {
    //   switch (index) {
    //     case 0:
    //       // alert(11);
    //       wx.ready(function() {
    //         //需在用户可能点击分享按钮前就先调用
    //         wx.updateAppMessageShareData({
    //           title: "与时校园", // 分享标题
    //           desc: "hello world", // 分享描述
    //           link: "http://www.baidu.com", // 分享链接
    //           imgUrl:
    //             "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550751447820&di=da717d3e832e64e47132ac5ffbe14b09&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fsoft%2Fimages%2F2014%2F1015%2F20141015033002594.jpg", // 分享图标
    //           success: function() {
    //             // 设置成功
    //           }
    //         });
    //       });
    //       // 微信好友
    //       break;
    //     case 1:
    //       // 微信朋友圈
    //       break;
    //     case 2:
    //       // qq
    //       break;
    //     case 3:
    //       // 空间
    //       break;
    //   }
    // }
  },
  components: { Footers, navList, btnSubmit },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo);
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/css/_mixin.scss";
$background: #6eb45c;
.box_cont {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  #Me {
    background-color: #fafafa;
    padding-bottom: Rem(50);
    .userBg {
      @include bgImg("../../assets/user-bg.png", contain);
      width: 100%;
      height: Rem(220);
      .user-avatar {
        width: Rem(65);
        height: Rem(65);
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #eee;
        margin: 0 auto;
        @include relativeCenter(0, -50%);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .navBars {
      ul {
        display: flex;
        background-color: #fff;
        li {
          flex: 1;
          a {
            width: 100%;
            height: 100%;
            display: block;
            text-align: center;
            padding-bottom: Rem(6);
            img {
              width: Rem(28);
              text-align: center;
            }
            p {
              text-align: center;
              font-size: Rem(13);
            }
          }
        }
      }
    }
    .user-list,
    .bottom-list {
      margin-top: Rem(10);
      height: auto;
      background-color: #fff;
      position: relative;
      .bg-click {
        width: 100%;
        height: Rem(47);
        position: absolute;
        bottom: 0;
      }
    }
    .logout {
      margin: Rem(45) auto Rem(52);
      text-align: center;
    }
  }
  .share {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
    ul {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: Rem(10) 0;
      display: flex;
      justify-content: space-around;
      text-align: center;
      background-color: #fff;
      li {
        p {
          font-size: Rem(15);
        }
      }
    }
  }
}
</style>

