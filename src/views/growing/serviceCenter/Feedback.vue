<template>
  <div id="Feedback">
    <Headers titleheader="意见反馈" more="提交" @click="submitFeedBack"></Headers>
    <div class="tab-select">
        <h5>反馈类型</h5>
        <ul>
            <li v-for="(item,index) in tabList" :key="index" @click="changeTabFlag(index,item.name)" :class="{active:tabFlag == index}">
                {{item.name}}
            </li>
        </ul>
    </div>
    <div class="upload-feedback">
        <textarea v-model="feedbackText" placeholder="请尽量详细描述您的问题，您的建议与反馈是我们前进的动力"></textarea>
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
    <div class="tab-select">
        <h5>联系方式</h5>
        <textarea placeholder="邮箱/手机号" v-model="phoneAndEmail"></textarea>
    </div>
  </div>
</template>

<script>
var formData = new FormData();
import Headers from "@/components/Header";
import {Alerts} from "../../../common/js/common.js"
export default {
  name: "Feedback",
  data(){
      return {
          tabList:[
              {name:'功能建议'},
              {name:'体验建议'},
              {name:'内容建议'},
              {name:'其他'}
          ],
          tabFlag:0,
          fileDatas:[],
          phoneAndEmail:'',
          feedbackText:'',
          label:''
      }
  },
  methods:{
      submitFeedBack() {
        formData.append('topicType',7)
        formData.append('topicContext',this.feedbackText)
        formData.append('address',this.phoneAndEmail)
        formData.append('descript',this.label)

        if (this.feedbackText && this.label && this.phoneAndEmail) {
          this.axios.post('/friend/addTopic',formData)
            .then(res => {
              if(!res) Alerts('反馈成功~');
              this.$router.push('/chengzhang');
            })
        }else{
          Alerts('请填写反馈选项在进行提交!')
        }
        
      },
      changeTabFlag(index,name) {
          this.label = name;
          this.tabFlag = index;
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
  },
  components: {
    Headers,
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Feedback {
    position: absolute;
    top: Rem(43);
    bottom: 0;
    width: 100%;
    .tab-select {
        box-sizing: border-box;
        padding: Rem(18) Rem(20);
        background-color: #fff;
        h5 {
            font-size: Rem(15);
            padding-bottom: Rem(13);
            border-bottom: Rem(1) solid #eee;
            color: #333;
        }
        ul {
            display: flex;
            justify-content: flex-start;
            padding: Rem(16) 0;
            li {
                color: #666;
                border-radius: Rem(25);
                border: Rem(1) solid #eee;
                padding: Rem(6) Rem(8);
                font-size: Rem(11);
                margin-right: Rem(11)
            }
        }
    }
    .upload-feedback {
        margin: Rem(10) 0;
        box-sizing: border-box;
        padding: Rem(20);
        text-align: center;
        background-color: #fff;
        textarea{
          width: 100%;
          height: Rem(40);
          border: 0;
          outline: none;
        }
        p {
            font-size: Rem(12);
            color: #999;
            padding-bottom: Rem(20);
        }
    }
    #img_uplaod {
    margin: 0 auto;
    box-sizing: border-box;
    .btn_upload {
      width: 80%;
      height: 80%;
      outline: none;
      border: none;
      background: url("../../../assets/add-phone.png") no-repeat;
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
  .tab-select {
      textarea {
          border: 0;
          width: 100%;
          outline: none;
          font-size: Rem(14);
          padding: Rem(10) 0;
          color: #333;
          height: Rem(170);
      }
  }
}
.active{
    background-color: #F45F94;
    border: 0  !important;
    color: #fff !important;
}
</style>