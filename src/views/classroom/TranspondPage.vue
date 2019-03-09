<template>
  <div class="classDetail">
    <div @click="$router.go(-1)" style="cursor: pointer;font-size:14px;font-family:MicrosoftYaHei;font-weight:bold;color:rgba(153,153,153,1);position:relative;left:-100px;"> < 返回</div>
    <div class="top">
      <!-- 视频播放 -->
      <div class="video">
        <h3>{{obj.course_name}}</h3>
        <video :src="obj.videoUrl" controls="controls" controlslist="nodownload"
               :style="`background: url(${/mp3$/.test(obj.videoUrl)?obj.logo:''}); background-size: 100% 100%`"></video>
        <p class="feature">
          <span @click="collection">{{obj.favourite_history == 1?'取消收藏':'收藏'}}</span>
          <img :src="`/static/img/${obj.favourite_history == 1?'collection_active':'collection'}.png`">
          <span>{{obj.page_viewcount}}人参与</span>
        </p>
      </div>

      <!-- 目录 -->
      <!--<div class="catalog">-->
      <!--<div class="title">-->
      <!--<h3>目录</h3>-->
      <!--</div>-->
      <!--<ul>-->
      <!--<li v-for="(item, index) of catalog" @click="switchCourseItem(item.videoUrl)">{{`${index+1}. ${item.catalogName}`}}</li>-->
      <!--</ul>-->
      <!--</div>-->
    </div>
    <div class="bottom">
      <div class="title">
        <span :class="active === 1? 'active' : ''" @click="switchActive(1)">课程详情</span>
        <span :class="active === 3 ? 'active' : ''" @click="switchActive(3)">目录</span>
        <span :class="active === 2 ? 'active' : ''" @click="switchActive(2)">留言</span>
        <!-- <span :class="active === 3? 'active' : ''" @click="switchActive(3)">上传作业</span> -->
      </div>
      <div class="content">
        <!-- 课程详情 -->
        <div class="detail" v-if="active === 1">
          <p>{{obj.course_name}}</p>
          <p v-if="obj.live_begin_time">{{`开始时间：${obj.live_begin_time}`}}</p>
          <p>{{`观看权限:${obj.buyHistory == 0 ? '免费' : obj.buyHistory == 1 ? '已购买' : '未购买'}`}}</p>
          <p>{{obj.title}}</p>
          <img :src="item" v-for="item of JSON.parse(obj.teacher_content)">
        </div>
        <!--目录-->
        <div class="detail" v-if="active === 3 ">
          <div>
            <ul>
              <li v-for="(item, index) of catalog" @click="switchCourseItem(item.videoUrl)">{{`${index+1}. ${item.catalogName}`}}</li>
            </ul>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment" v-if="active === 2">
          <div class="comment-title">
            <span>全部留言{{comments.length}}</span>
            <span @click="addComment">发表留言</span>
          </div>
          <div class="content">
            <ul>
              <li class="comment-item" v-for="(item, index) of comments">
                <div class="userImg">
                  <img :src="item.icon">
                </div>
                <div class="comment-detail">
                  <p>
                    <span class="name">{{item.nick_name}}</span>
                    <span class="date">{{item.add_time}}</span>
                  </p>
                  <p>{{item.content}}</p>
                  <div class="btn-comment" @click="addComment2(item)"><span>评论</span></div>

                  <!-- 回复 -->
                  <ul class="reply">
                    <li class="comment-item" v-for="(reply, index) of item.replyList">
                      <div class="userImg">
                        <img :src="reply.icon">
                      </div>
                      <div class="comment-detail">
                        <p>
                          <span class="name">{{reply.nick_name}}</span>
                          <span class="date">{{reply.add_time}}</span>
                        </p>
                        <p>{{reply.content}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 作业 -->
        <div class="homework"></div>
      </div>
    </div>
    <Modal v-model="isShowComment" :footer-hide="true" title="发布留言">
      <div class="content">
        <textarea v-model="courseContext" rows="5" placeholder="请输入你的留言 ... ..."></textarea>
        <div class="submit" @click="submit(commentObj)">提交</div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Toast , MessageBox } from "mint-ui";
  // Vue.component(DatetimePicker.name, DatetimePicker)
  // Vue.component(Picker.name, Picker)
  // Vue.component(Button.name, Button)
  // Vue.component(Button.name, Button)
  import MintUI from 'mint-ui'
  Vue.use(MintUI , Toast , MessageBox )
  export default{
    data () {
      return {
        isShowComment: false,
        active: 1,
        courseContext: '',
        commentType: 1, // 1 一级评论  2二级评论
        catalog: [],
        commentObj: {},
        comments: [
          {
            icon: '/static/img/voiceBox1.png',
            nick_name: '昵称',
            add_time: '2018',
            content: '评论内容'
          },
          {
            icon: '/static/img/voiceBox1.png',
            nick_name: '昵称',
            add_time: '2018',
            content: '评论内容'
          }
        ],
        obj: {}
      }
    },
    methods: {
      collection () {
        let url = '/course/deleteFavourite'
        if (this.obj.favourite_history == 0) {
          url = '/course/setFavourite'
        }
        this.axios.post(url, {courseId: this.$route.query.id})
          .then(data => {
            this.getData(this.$route.query.id)
          })
      },
      switchActive (index) {
        this.active = index
      },
      getData (id) {
        this.axios.post('/course/getCourseDetailWeb', {courseId: id})
          .then(data => {
            this.obj = data.course
            this.catalog = data.courseCatalogList
          })
      },
      // 获取课程评论
      getComment (id) {
        this.axios.post('/friend/getCourseCommentList', {otherId: id})
          .then(data => {
            this.comments = data.list
          })
      },
      // 提交评论
      submit (commentObj = {}) {
        // if (this.commentType === 1) {
        //   this.$axios.post('/course/addCourseComment', {
        //     context: this.courseContext,
        //     courseId: this.$route.query.id
        //   }).then(data => {
        //     this.courseContext = ''
        //     this.isShowComment = false
        //     this.getComment(this.$route.query.id)
        //   })
        // } else {
        //   this.$axios.post('/friend/addComment', {
        //     content: this.courseContext,
        //     otherId: this.$route.query.id,
        //     toUserId: commentObj.user_id,
        //     type: 1,
        //     parentId: commentObj.comment_id

        //   }).then(data => {
        //     this.courseContext = ''
        //     this.isShowComment = false
        //     this.getComment(this.$route.query.id)
        //   })
        // }
        this.axios.post('/friend/addComment', {
          content: this.courseContext,
          otherId: this.$route.query.id,
          toUserId: commentObj.user_id,
          type: 1,
          parentId: commentObj.comment_id

        }).then(data => {
          this.courseContext = ''
          this.isShowComment = false
          this.getComment(this.$route.query.id)
        })

      },
      // 评论对话框
      addComment () {
        this.commentType = 1
        this.isShowComment = true
      },
      // 二级评论
      addComment2 (commentObj) {
        this.commentType = 2
        this.commentObj = commentObj
        this.isShowComment = true
      },

      switchCourseItem (videoUrl) {
        this.obj.videoUrl = videoUrl
      },
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
    },
    mounted () {
      console.log(this.$route.query.id)
      this.getData(this.$route.query.id)
      this.getComment(this.$route.query.id)
    }
  }
</script>

<style lang="scss" scoped>
  $background: #6EB45C;
  /deep/ .ivu-modal-body{
    .content{
      padding: 10px;
      textarea{
        resize: none;
        width: 100%;
      }
      .submit{
        width: 90px;
        padding: 5px 10px;
        margin: 20px auto;
        background-color: $background;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }

    }
  }

  .classDetail{
    padding: 20px;
    width: 1010px;
    height: auto;
    margin:0px auto;
    .top{
      display: flex;
      .video{
        width: 510px;
        .title{
          line-height: 20px;
          span:nth-child(1){
            color: #333333;
            font-weight: bold;
            font-size: 20px;
          }
          span:nth-child(2){
            float: right;
          }
        }
        video{
          width: 710px;
          height: 341px;
          margin: 0px;
          padding: 0px;
        }
        .feature{
          span{
            float: right;
            width: 70px;
          }
          img{
            width: 18px;
            height: 18px;
            float: right;
            vertical-align: -10%;
          }
        }
      }
      .catalog{
        flex: 1;
        padding: 0 20px;
        .title{
          border-bottom: 1px solid #eeeeee;
          h3{
            line-height: 30px;
            display: inline-block;
            border-bottom: 2px solid $background;
          }
        }
        ul{
          li{
            font-weight: bold;
            margin: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .bottom{
      width: 710px;
      .title{
        border-bottom: 1px solid #eeeeee;
        span{
          width: 70px;
          line-height: 30px;
          padding: 5px;
          text-align: center;
          display: inline-block;
          font-weight: bold;
          cursor: pointer;
        }
        .active{
          border-bottom: 2px solid $background;
        }
      }
      .content{
        .detail{
          p{
            font-weight: bold;
            margin: 10px 0;
          }
          img{
            width: 100%;
          }
        }
        .comment{
          padding: 10px;
          .comment-title{
            height: 40px;
            line-height: 40px;
            span:nth-child(2){
              width: 90px;
              height: 27px;
              margin-top: 10px;
              border-radius: 10px;
              color: $background;
              line-height: 27px;
              text-align: center;
              display: inline-block;
              border: 1px solid $background;
              float: right;
              cursor: pointer;

            }
          }
          .comment-item{
            display: flex;
            .userImg{
              margin: 10px;
              img{
                width: 45px;
                height: 45px;
              }
            }
            .comment-detail{
              width: 100%;
              padding: 20px 10px;
              p{
                margin: 5px;
                .name{
                  font-weight: bold;
                  color: #666666;
                }
                .date{
                  float: right;
                }
              }
              .btn-comment{
                height: 40px;
                span{
                  padding: 5px 10px;
                  border: 1px solid #eeeeee;
                  border-radius: 5px;
                  float: right;
                  cursor: pointer;
                }
              }
              .reply{
                span{
                  font-size: 10px;
                }
                img{
                  width: 30px;
                  height: 30px;
                  margin-top: 5px;
                  border-radius: 50%;
                }
                .comment-detail{
                  padding: 20px 0;
                }
              }

            }
          }
        }
      }
    }
  }
</style>
