<template>
  <div id="ResultsRecord">
    <Headers titleheader="成绩记录"></Headers>
    <div class="results-container">
      <div class="select">
        <select @change="updateDatalist($event.target.value)" ref="selectVal">
          <option v-for="(item,index) in resultList" :key="index">{{item.execute_year}}年</option>
        </select>
        <i>
          <svg
            t="1550375779756"
            class="icon"
            style
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4810"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
          >
            <path
              d="M579.043 792.408l418.544-418.641c25.83-25.827 33.48-64.34 19.53-98.087-13.95-33.655-46.79-55.52-83.14-55.52L96.8 220.16c-36.352 0-69.205 21.955-83.147 55.52-4.59 11.157-6.842 22.86-6.842 34.47 0 23.395 9.177 46.43 26.365 63.62l418.641 418.639c16.912 16.91 39.772 26.365 63.622 26.365 23.84 0 46.795-9.535 63.62-26.365L579.043 792.409 579.043 792.408z"
              p-id="4811"
              fill="#999999"
            ></path>
          </svg>
        </i>
      </div>
      <div class="time-content">
        <ul>
          <li
            @click.stop="handleConfirm(item)"
            v-for="(item,index) in resultListCurrent"
            :key="index"
            :class="{active:item.totalScore == '0'}"
          >
            <div>
              <h6>{{item.month}}月份总成绩</h6>
              <p>{{item.totalScore}}</p>
            </div>
            <i class="edit-icon">
              <img src="../../../assets/resutl-edit.png" alt>
            </i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "ResultsRecord",
  data() {
    return {
      resultList: [],
      resultListCurrent: []
    };
  },
  methods: {
    updateDatalist(val) {
      const years = val.substr(0, val.length - 1);
      this.gradeResult(years)
    },
    handleConfirm({month}) {
      const year = this.$refs.selectVal.value.substr(0,this.$refs.selectVal.value.length - 1)
      this.$router.push({ name: "writeResult", params: { year,month } });
    },
    // 获取学科
    gradeResult(year){
      this.axios.post('/student/gradeResult',{year})
          .then(res => {
            this.resultListCurrent = res;
          })
    }
  },
  created() {
    this.axios.post("/homePage/getHomeScoreList").then(res => {
      this.resultList = res.reverse();  // 获取老接口的年份 因为新接口没有年份
      // 获取新接口的列表
      this.gradeResult(this.resultList[0].execute_year)
    });
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#ResultsRecord {
  position: absolute;
  top: Rem(43);
  bottom: 0;
  width: 100%;
  background-color: #fafafa;
  .select {
    text-align: center;
    line-height: Rem(40);
    position: relative;
    select {
      background-color: transparent;
      border: 0;
      outline: none;
      margin: 0 auto;
      font-size: Rem(15);
    }
    i {
      position: absolute;
      top: Rem(-4);
      left: 58%;
      width: Rem(12);
      height: Rem(9);
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .time-content {
    box-sizing: border-box;
    padding: Rem(15) Rem(33);
    width: 100%;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        background-color: #eee;
        color: #999999;
        margin-right: Rem(25);
        margin-bottom: Rem(20);
        width: Rem(84);
        height: Rem(84);
        border-radius: Rem(4);
        text-align: center;
        position: relative;
        div {
          transform: translateY(50%);
          h6,
          p {
            font-size: Rem(12);
            margin: 0 auto;
            line-height: Rem(20);
          }
        }
        .edit-icon {
          font-size: 0;
          width: Rem(13);
          height: Rem(13);
          position: absolute;
          right: Rem(4);
          bottom: Rem(6);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      li:nth-of-type(3n) {
        margin-right: 0;
      }
      .active {
        border: Rem(1) solid #6eb45c;
        background-color: #fff;
        border-radius: Rem(4);
        color: #6eb45c;
      }
    }
  }
}
</style>