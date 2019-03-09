<template>
  <div class="box_cont">
    <div class="top_search_box">
      <div class="top_search">
        <img @click="$router.go(-1)" src="/static/img/fh.png">
        <div class="input_box">
          <input type="text" ref="searchInput" v-model="searchText" class="search_input" placeholder="搜索课程">
        </div>
        <span class="tosearch" @click="searchdata">搜索</span>
      </div>
    </div>
    <div class="shipin_list_box">
      <div class="shipin_list">
        <div class="shipin_item" @click="todetail(item.course_id)" v-for="item of courseList">
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
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    name: "SearchResult",
    data() {
      return {
        actnav: 1,
        searchText:'',
        courseList:[],
      };
    },
    methods: {
      todetail (id) {
        this.$router.push({ path: "/ketangxiangqing",query:{id: id}})
      },
      searchdata () {
        if (!this.searchText) {
          this.tos('搜索内容不能为空')
          return
        }
        // if (!sessionStorage.getItem('token')) {
        //   this.$router.push('/loginbeforesz')
        //   return
        // }
        this.axios.post('/course/searchCourseAll', {
          courseName: this.searchText
        }).then(data => {
          this.courseList = data
          // this.$router.push({path:'/manage/searchResult'})
        })
      },
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
    },
    mounted () {
      this.$refs.searchInput.focus()
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
      .top_search{
        width:Rem(375);
        height:Rem(45);
        margin:0 auto;
        padding-top:Rem(8);
        display: flex;
        img{
          width:Rem(7);
          height:Rem(12);
          padding:Rem(8) Rem(13);
          position:relative;
          top:Rem(0);
        }
        .input_box{
          width:Rem(288);
          height:Rem(29);
          line-height:Rem(29);
          background: #ffffff;
          border-radius: Rem(4);
          box-sizing: border-box;
          padding:0 Rem(15);
          margin-left:Rem(5);
          input.search_input{
            width:100%;
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
          font-size: Rem(12);
          height:Rem(27);
          line-height:Rem(27);
          color:#ffffff;
          margin-left: Rem(11);
        }
      }
    }
    .shipin_list_box{
      width:100%;
      .shipin_list{
        width:Rem(350);
        margin: 0 auto;
        .shipin_item{
          margin-top:Rem(16);
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
