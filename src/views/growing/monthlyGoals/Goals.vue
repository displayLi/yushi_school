<template>
  <div id="Goals">
    <Headers titleheader="月目标月总结" more="编辑" @click="editGoals"></Headers>
    <div class="yearAndMouth">
      <p>{{$route.query.year}}年{{$route.query.mouth}}月</p>
    </div>
    <div class="content">
      <textarea :disabled="!editGoalsFlag" v-model="data.context" placeholder="这里写目标"></textarea>
      <div class="mbFlag">
        <p>目标状态</p>
        <ul>
          <!-- 错误 -->
          <li @click="setColor(0)">
            <svg
              t="1550499980945"
              class="icon"
              style
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2295"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M512 981.333A469.333 469.333 0 1 1 981.333 512 469.333 469.333 0 0 1 512 981.333zM447.573 506.88L285.44 669.013a42.667 42.667 0 1 0 58.88 58.88L506.453 565.76l162.134 162.133a42.667 42.667 0 1 0 58.88-58.88L565.333 506.88l162.134-162.133a42.667 42.667 0 1 0-58.88-58.88L506.453 448 344.32 285.867a42.667 42.667 0 0 0-58.88 58.453z"
                p-id="2296"
                :fill="data.flag == 0 ? '#eb495e' : '#999999' "
              ></path>
            </svg>
          </li>
          <!-- 正确 -->
          <li @click="setColor(1)">
            <svg
              t="1550500000092"
              class="icon"
              style
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3057"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM832 384 492.8 723.2c-25.6 25.6-67.2 25.6-89.6 0L192 512c0 0-32-32 0-64s64 0 64 0l192 192 320-320c0 0 32-32 64 0S832 384 832 384z"
                p-id="3058"
                :fill="data.flag == 1 ? '#5FB655' : '#999999' "
              ></path>
            </svg>
          </li>
        </ul>
      </div>
      <textarea :disabled="!editGoalsFlag" v-model="data.context_zj" placeholder="这里写总结"></textarea>
      <btnSubmit
        v-if="editGoalsFlag"
        style="width:100%;"
        height="45"
        @click="submitGoals"
        :disabled="disabled"
      >提交</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "Goals",
  data() {
    return {
      MonthlyGoals: [],
      data: {},
      disabled: false,
      editGoalsFlag: false
    };
  },
  methods: {
    setColor(data) {
      if (this.editGoalsFlag) {
        this.data.flag = data;
      }
    },
    submitGoals() {
      if (this.data.context_zj && this.data.context) {
        let { year, mouth } = this.$route.query;
        let { context, context_zj } = this.data;

        // 保存目标
        this.axios
          .post("/summary/addUserGoals", {
            date: year + "-" + mouth,
            context_zj,
            context
          })
          .then(res => {
            if (res.add_time) Alerts("操作成功！");
          });
      }
    },
    editGoals() {
      this.editGoalsFlag = true;
    }
  },
  created() {
    this.data = JSON.parse(this.$route.query.data);
  },
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Goals {
  position: absolute;
  top: Rem(43);
  width: 100%;
  bottom: 0;
  background-color: #fff;
  .yearAndMouth {
    text-align: center;
    padding: Rem(18) 0 Rem(16);
    p {
      font-size: Rem(15);
      color: #333;
    }
  }
  .content {
    box-sizing: border-box;
    padding: Rem(0) Rem(16);
    textarea {
      width: 100%;
      height: Rem(94);
      border: 0;
      background-color: #fafafa;
      font-size: Rem(15);
      box-sizing: border-box;
      padding: Rem(12);
      outline: none;
    }
    .mbFlag {
      padding-top: Rem(20);
      text-align: center;
      font-size: Rem(15);
      color: #333;
      ul {
        padding: Rem(25) 0 Rem(41);
        li {
          display: inline-block;
          width: Rem(32);
          height: Rem(32);
          margin: 0 Rem(10);
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>