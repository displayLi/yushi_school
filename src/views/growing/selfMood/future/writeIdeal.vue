<!--
1. 未来畅想
2. 心情日志
3.我的作业
  发布内容都在这个页面里面写的
-->

<template>
  <div id="writeIdeal">
    <Headers :titleheader="titleheader" more="发送" @click="onSubmitBlog"></Headers>
    <div class="textarea">
      <textarea v-model="blogs" placeholder="这一刻想说点什么……"></textarea>
      <section id="img_uplaod" class="clearfix">
        <!-- upload -->
        <div
          class="isImg"
          v-for="(imgUrl,index) in fileDatas"
          :key="index"
          v-if="fileDatas.length > 0"
        >
          <img :src="imgUrl" alt>
          <i class="removeImgs" @click="removeImgs(index)">
            <svg
              t="1547566059410"
              class="icon"
              style
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2090"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200"
              height="200"
            >
              <path
                d="M583.168 523.776L958.464 148.48c18.944-18.944 18.944-50.176 0-69.12l-2.048-2.048c-18.944-18.944-50.176-18.944-69.12 0L512 453.12 136.704 77.312c-18.944-18.944-50.176-18.944-69.12 0l-2.048 2.048C46.08 98.304 46.08 129.536 65.536 148.48l375.296 375.296-375.296 375.296c-18.944 18.944-18.944 50.176 0 69.12l2.048 2.048c18.944 18.944 50.176 18.944 69.12 0l375.296-375.296 375.296 375.296c18.944 18.944 50.176 18.944 69.12 0l2.048-2.048c18.944-18.944 18.944-50.176 0-69.12l-375.296-375.296z"
                fill="#fff"
                p-id="2091"
              ></path>
            </svg>
          </i>
        </div>
        <div class="upload-btns" v-if="fileDatas.length < 9">
          <button class="btn_upload">
            <input type="file" name="file1" @change="getFile($event)" multiple accept="image/*">
          </button>
        </div>
      </section>
    </div>
    <div
      class="alert-time"
      @click="showTask"
      v-if="($route.params.typeId || sessionStorage.typeId ) == '3'"
    >
      <NavList style="text-align:left;" imageUrl="time" :name="alertName" path></NavList>
    </div>
    <mt-datetime-picker
      v-if="($route.params.typeId || sessionStorage.typeId ) == '3'"
      ref="picker"
      type="datetime"
      @confirm="handleConfirm"
      year-format="{value}"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 分"
      minute-format="{value} 秒"
    ></mt-datetime-picker>
  </div>
</template>

<script>
var formData = new FormData();
import Vue from "vue";
import { InfiniteScroll, DatetimePicker } from "mint-ui";

Vue.use(InfiniteScroll);

import Headers from "@/components/Header";
import NavList from "@/components/NavList";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "future",
  data() {
    return {
      fileDatas: [],
      blogs: "",
      titleheader: "",
      alertTime: "",
      alertName: "提醒时间"
    };
  },
  methods: {
    onSubmitBlog() {
      if (this.fileDatas.length > 0 || this.blogs) {
        formData.delete("topicContext");
        formData.append("topicContext", this.blogs);
        formData.append("topicType", this.$route.params.typeId);
        formData.append("whoCan", 0);

        // 等于三就是未来畅想
        if (this.$route.params.typeId == "3") {
          formData.delete("remindDate");
          formData.append("remindDate", this.alertTime);
          if (this.alertTime && this.blogs) {
            this.addTopic(formData)
          } else {
            Alerts("提醒时间不能为空~");
          }
          //心情日志
        }else if(this.$route.params.typeId == "2"){
          if (this.blogs) {
            this.addTopic(formData)
          } else {
            Alerts("文字内容或文件不能为空~");
          }
          // 作业
        }else {
          if (this.blogs) {
            this.addTopic(formData)
          } else {
            Alerts("文字内容或文件不能为空~");
          }
        }
      } else {
        Alerts("内容或图片不能为空~");
      }
    },
    getFile({ target: { files } }) {
      Array.from(files).forEach(file => {
        let imgUrl = this.getObjectURL(file);
        this.fileDatas.push(imgUrl);
        formData.delete("file1");
        formData.delete("file2");
        formData.append("file1", file);
        formData.append("file2", file);
      });
    },
    removeImgs(index) {
      this.fileDatas.splice(index, 1);
      return;
    },
    addTopic(formData){
      this.axios.post("/friend/addTopic", formData).then(res => {
              if (!null) {
                Alerts("发表成功！");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              }
            });
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    showTask() {
      this.$refs.picker.open();
    },
    handleConfirm(val) {
      // 处理时间戳
      this.alertTime = getDate.format(val, "yyyy-MM-dd hh:mm:ss");
      this.alertName = this.alertTime;
    }
  },
  created() {
    switch (this.$route.params.typeId || sessionStorage.typeId) {
      case "2":
        this.titleheader = "写心情日记";
        break;
      case "3":
        this.titleheader = "写给未来的自己";
        break;
    }
  },
  components: {
    Headers,
    NavList,
    "mt-datetime-picker": DatetimePicker
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#writeIdeal {
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: Rem(40);
  bottom: 0;
  .textarea {
    box-sizing: border-box;
    padding: Rem(22) Rem(14);
    textarea {
      border: 0;
      height: Rem(60);
      width: 100%;
      outline: none;
      font-size: Rem(14);
    }
  }
  .alert-time {
    border-top: Rem(1) solid #eee;
    border-bottom: Rem(1) solid #eee;
    a {
      border: 0;
    }
  }
  #img_uplaod {
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
    .btn_upload {
      width: 80%;
      height: 80%;
      outline: none;
      border: none;
      background: url("../../../../assets/xj.png") no-repeat;
      background-size: contain;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .isImg {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .removeImgs {
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        right: -6px;
        top: -6px;
        border-radius: 50%;
        svg {
          display: block;
          width: 65%;
          height: 65%;
          margin: 3px;
        }
      }
    }
  }
  #img_uplaod .upload-btns,
  #img_uplaod .isImg {
    width: 30%;
    text-align: center;
    height: Rem(90);
    line-height: Rem(90);
    float: left;
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
    padding: 0;
  }
}
</style>