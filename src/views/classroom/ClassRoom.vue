<template>
  <div class="box_cont">
    <div class="top_search_box">
      <div class="top_search">
        <div class="input_box">
          <img src="/static/img/sousuo.png">
          <input type="text" v-model="searchText" @focus="tosearch" class="search_input" placeholder="搜索课程">
        </div>
        <span class="tosearch" @click="toshaixuan">筛选</span>
      </div>
    </div>
    <div class="shaixuan" v-show="isshowchose">
      <div class="kc_type">
        <span v-for="(item, index) of lables"
              :class="item.id === activeLable?'activeLable':''" @click="saveactiveLable(item.id)">
          {{item.category}}
        </span>
      </div>
      <div class="kc_btns">
        <span @click="tochongzhi">重置</span>
        <span @click="switchLable(activeLable)">确定</span>
      </div>
    </div>
    <!--<div class="top_nav_box">-->
      <!--<div class="top_nav">-->
        <!--<span :class="subjectActive==item.subject.id?'actnav':''" v-for="item of subjectList" @click="switchSubject(item.subject.id)">{{item.subject.name}}</span>-->
      <!--</div>-->
    <!--</div>-->
    <div id="wrapper">
      <ul>
        <li :class="subjectActive==item.subject.id?'active':''" v-for="item of subjectList" v-show="item.courseList.list.length!=0" @click="switchSubject(item.subject.id)">
          {{item.subject.name}}
        </li>
      </ul>
    </div>
    <div class="shipin_list_box">
      <div class="shipin_list">
        <div class="shipin_item" @click="todetail(item.course_id)" v-for="item of courseList" >
          <img :src="item.logo">
          <div class="item_right">
            <p class="p1">{{item.course_name}}</p>
            <p class="p2">{{item.title}}</p>
            <p class="p3">
              <span class="p3_left">{{item.page_viewcount}}人参与</span>
              <span class="p3_right">
                <img src="/static/img/shipin_logo.png" v-if="item.isVideo == 2">
                <img src="/static/img/yinpin_logo.png" v-if="item.isVideo == 1" style="width:15px;height:19px;position:relative;top:3px;">
                <span :class="item.buyHistory==2?'hong':''">{{item.buyHistory==0?'免费':item.buyHistory==1?'已购买':item.source_price}}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
  import Footers from "../../components/Footers.vue";
  import Vue from "vue";
  import MintUI from 'mint-ui'
  import { InfiniteScroll , Toast , Navbar, TabItem} from "mint-ui";
  Vue.use( MintUI , InfiniteScroll , Toast ,Navbar, TabItem);
  export default {
    name: "ClassRoom",
    data() {
      return {
        searchText:'',
        subjectList: [],
        subjectActive: '',
        activeLable: 0,
        lables: [],
        courseList: [],
        isshowchose:false,
        selected:'1'
      };
    },
    methods: {
      tochongzhi () {
        this.activeLable=0
        this.switchLable(this.activeLable)
      },
      saveactiveLable(lid){
        this.activeLable=lid
      },
      tosearch () {
        this.$router.push({ path: "/ketangjieguo"})
      },
      toshaixuan () {
        this.isshowchose=!this.isshowchose
      },
      todetail (id) {
        this.$router.push({ path: "/ketangxiangqing",query:{id: id}})
      },
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
      // 获取学科列表
      getSubjectList () {
        let self = this
        this.axios.post('/course/getCourseListAll', {
          videoType: 2,
          page: 1,
          rows: 1
        }).then(data => {
          // 展示前5课程
          self.subjectList = data
          // 默认显示第一个课程
          for (let item of self.subjectList) {
            if (item.courseList.list.length!=0) {
              self.switchSubject(item.subject.id)
              break
            }
          }
          // self.switchSubject(data[0].subject.id)
        })
      },
      switchSubject (id) {
        this.subjectActive = id
        this.activeLable = 0
        this.getCourseBySubject()
        this.getLables()
      },
      getCourseBySubject () {
        let self = this
        this.axios.post('/course/getCourseBySubjectAll', {
          subjectId: self.subjectActive,
          categoryId: self.activeLable
        }).then(data => {
          self.courseList = data.list
        })
      },
      getLables () {
        this.axios.post('/course/getCategaryBySubjectId', {subjectId: this.subjectActive})
          .then(data => {
            // this.lables = [{
            //   category: "全部",
            //   id: 0
            // }]
            this.lables = this.lables.concat(data)
          })
      },
      switchLable (id) {
        this.activeLable = id
        this.getCourseBySubject()
      },
    },
    components: { Footers },
    mounted () {
      this.getSubjectList()
      var myScroll = new IScroll('#wrapper',{
        mouseWheel: true,
        scrollbars: true,
        scrollX: true
        // 横向滚动导航栏
      });
      // 初始化
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #6EB35C;
.box_cont{
  width:100%;
  min-height: 100vh;
  background: #ffffff;
  .top_search_box{
    width:100%;
    height:Rem(45);
    background: $background;
    position: fixed;
    top:0;
    z-index: 1000;
    .top_search{
      width:Rem(375);
      height:Rem(45);
      margin:0 auto;
      padding-top:Rem(8);
      display: flex;
      .input_box{
        width:Rem(300);
        height:Rem(29);
        line-height:Rem(29);
        background: #ffffff;
        border-radius: Rem(4);
        box-sizing: border-box;
        padding:0 Rem(7);
        margin-left:Rem(17);
        img{
          width:Rem(12);
          height:Rem(11);
          position:relative;
          top:Rem(-9);
          left:Rem(3);
        }
        input.search_input{
          width:80%;
          border:none;
          outline: none;
          height:Rem(29);
          line-height:Rem(29);
          margin-left:Rem(2);
          font-size: Rem(14);
          position:relative;
          top:Rem(-5);
          background: transparent;
        }
        input::placeholder{
          font-size: Rem(14);
          color:#999999;
        }
      }
      span.tosearch{
        font-size: Rem(15);
        line-height:Rem(27);
        color:#ffffff;
        margin-left: Rem(16);
      }
    }
  }
  .shaixuan{
    width:100%;
    background: #ffffff;
    position: fixed;
    top:Rem(45);
    z-index: 1000;
    border-bottom:Rem(1) solid #EAEDF3;
    .kc_type{
      width:Rem(375);
      height:Rem(45);
      margin:0 auto;
      box-sizing: border-box;
      padding-left:Rem(15);
      padding-right:Rem(15);
      display: flex;
      span{
        display: inline-block;
        min-width:Rem(90);
        height:Rem(30);
        line-height:Rem(30);
        text-align: center;
        margin-top: Rem(19);
        margin-right: Rem(35);
        border: 1px solid #EEEEEE;
        font-size: Rem(15);
        color:#666666;
        border-radius: Rem(4);
      }
      span.activeLable{
        background:$background;
        border: 1px solid $background;
        color:#ffffff;
      }
    }
    .kc_btns{
      width:Rem(265);
      margin:0 auto;
      margin-top:Rem(28);
      margin-bottom:Rem(24);
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      span{
        display: inline-block;
        width:Rem(120);
        height:Rem(33);
        line-height:Rem(33);
        text-align: center;
        border:1px solid #5AB454;
        font-size: Rem(15);
        color:#5AB454;
        border-radius: Rem(4);
      }
      span:last-child{
        background:#5AB454;
        color:#ffffff;
      }
    }
  }
  #wrapper{
    height: Rem(50);
    /*background: red;*/
    overflow: hidden;
    margin-top:Rem(45) !important;
    border: Rem(1) solid #EEEEEE;
  }
  #wrapper{
    margin: 0;
    padding: 0;
    font-size: Rem(13);
    list-style: none;
  }
  #wrapper ul{
    min-width: Rem(1300);
    display: flex;
    box-sizing: border-box;
    padding-left:Rem(20);
    padding-right:Rem(20);
  }
  #wrapper li{
    min-width: Rem(60);
    height: Rem(48);
    /*background: #ccc;*/
    /*float: left;*/
    text-align: center;
    line-height: Rem(48);
    cursor: pointer;
    color:#999999;
    font-size: Rem(13);
    margin-right: Rem(30);
  }
  #wrapper li.active{
    border-bottom: Rem(1.5) solid $background;
    color:#333333;
  }
  .top_nav_box{
    /*width:Rem(375);*/
    height:Rem(42);
    border: Rem(1) solid #EEEEEE;
    margin-top:Rem(45);
    overflow: hidden;
    .top_nav{
      width: Rem(375);
      height:Rem(42);
      box-sizing: border-box;
      padding-left:Rem(20);
      padding-right:Rem(20);
      display: flex;
        span{
          display: inline-block;
          min-width: Rem(100);
          height:Rem(40);
          line-height: Rem(40);
          color:#999999;
          font-size:Rem(14);
          position:relative;
          bottom:Rem(2);
          margin-right: Rem(36);
          text-align: center;
        }
        span.actnav{
          border-bottom: Rem(1.5) solid $background;
          color:#333333;
        }
    }
    /*.top_nav::-webkit-scrollbar{display: none;}*/
  }
  .shipin_list_box{
    width:100%;
    .shipin_list{
      width:Rem(350);
      margin: 0 auto;
      padding-bottom:Rem(100);
      .shipin_item{
        margin-top:Rem(21);
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        img{
          width:Rem(119);
          height:Rem(77);
        }
        .item_right{
          position:relative;
          width:Rem(211);
          height:Rem(77);
          .p1{
            height:Rem(18);
            overflow: hidden;
            color:#333333;
            font-size:Rem(15);
          }
          .p2{
            height:Rem(16);
            overflow: hidden;
            color:#666666;
            font-size:Rem(12);
            margin-top:Rem(10);
          }
          .p3{
            width: 100%;
            position:absolute;
            bottom:Rem(-4);
            .p3_left{
              line-height: Rem(0);
              color:#999999;
              font-size:Rem(12);
            }
            .p3_right{
              position:absolute;
              right:0;
              bottom:Rem(7);
              line-height: Rem(0);
              img{
                width:Rem(12);
                height:Rem(8);
              }
              span{
                color:$background;
                font-size:Rem(15);
                margin-left:Rem(10);
              }
              span.hong{
                color:#FE0001;
              }
            }
          }
        }
      }
    }
  }
}
</style>
