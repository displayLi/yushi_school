<template>
  <div id="Reports">
    <Headers titleheader="心情签到"></Headers>
    <div class="content">
      <div class="reportsBtn">
        <i class="bg"></i>
        <button v-if="isQD.length == 0" @click="Reports">签到</button>
        <button v-if="isQD.length > 0" disabled>已签到</button>
      </div>
      <Calendar id="rl" :markDate="markDate"></Calendar>
      <div class="qdNumber">
        本月已签到
        <span>{{qdTotal < 10 ? '0' + qdTotal : qdTotal}}</span>
        天
      </div>
    </div>
    <div class="regrx">
      <h5>规则与奖励</h5>
      <p>每日登陆心情签到，获得1积分，每人每天最多一次。积分的目的：为了解锁更多的功能，有更多的体验项目，还可以参加组织的活动。</p>
    </div>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
import Headers from "@/components/Header";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "Reports",
  data() {
    return {
      markDate: [],
      qdTotal: 0,
      isQD: []
    };
  },
  methods: {
    Reports() {
      this.axios.post("/sign/addSign", { moodId: 1 }).then(res => {
        if (!res.subCode) {
          Alerts("签到成功");
          this.qdInit();
        }
      });
    },
    qdInit() {
      //  获取签到信息
      this.axios("/sign/getSingLog").then(res => {
        this.qdTotal = res.mouthCount; // 获取本月的签到天数
        if (res.thisMouthList.length > 0) {
          //  渲染已签到的天数
          this.markDate = res.thisMouthList
            .filter(el => {
              return el.sing_history == 1;
            })
            .map(el => el.add_time);

          //  查询今天是否已签到
          let day = getDate.format(new Date(), "yyyy-MM-dd");

          this.isQD = res.thisMouthList
            .filter(el => {
              return el.add_time == day;
            })
            .filter(el => el.sing_history == 1);
        }
      });
    }
  },
  created() {
    this.qdInit();
  },
  components: {
    Headers,
    Calendar
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Reports {
  width: 100%;
  position: absolute;
  top: 0;
  min-height: 100%;
  @include bgImg(
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550938344&di=79f73df10b879318c290b858490237e6&imgtype=jpg&er=1&src=http%3A%2F%2Fim6.leaderhero.com%2Fwallpaper%2F20141024%2F117c4a7a9f.jpg",
    cover
  );
  .content {
    padding-top: Rem(43);
    .reportsBtn {
      text-align: center;
      margin: Rem(24) auto Rem(22);
      position: relative;
      i {
        position: absolute;
        width: Rem(73);
        height: Rem(73);
        margin: Rem(-1) 0 0 Rem(-5);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        animation: animate 2s linear infinite;
      }
      button {
        width: Rem(63);
        height: Rem(63);
        background-color: #fd8022;
        border: 0;
        font-size: Rem(15);
        color: white;
        border-radius: 50%;
        position: relative;
        z-index: 1;
      }
    }
    .qdNumber {
      position: absolute;
      top: Rem(220);
      left: 0;
      text-align: center;
      width: 100%;
      font-size: Rem(15);
      span {
        display: inline-block;
        border-radius: 50%;
        color: white;
        width: Rem(29);
        line-height: Rem(29);
        background-color: #fd8022;
      }
    }
  }
  .regrx {
    margin: Rem(37) 0;
    color: #333;
    box-sizing: border-box;
    padding: 0 Rem(27);
    h5 {
      text-align: center;
      font-size: Rem(15);
      padding-bottom: Rem(10);
    }
    p {
      font-size: Rem(12);
      line-height: Rem(20);
    }
  }
}

@keyframes animate {
  20% {
    transform: scale(0.9, 0.9);
  }
  70% {
    transform: scale(1.2, 1.2);
  }
}
</style>