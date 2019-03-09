<template>
  <div id="connectStu">
    <Headers titleheader="私信"></Headers>
    <ul ref="msgBox">
      <!-- 对方所说的话 -->
      <li class="clearfix" v-for="(item,index) in lists" :key="index">
        <div v-if="!item.mine.mine" class="left-avatar">
          <span>
            <img :src="item.mine.avatar" alt>
          </span>
          <p>{{item.mine.content}}</p>
        </div>
        <!-- 我说的话 -->
        <div v-if="item.mine.mine" class="right-avatar">
          <p>{{item.mine.content}}</p>
          <span>
            <img :src="item.mine.avatar" alt>
          </span>
        </div>
      </li>
    </ul>
    <footer class="charInput">
      <div class="inputGroup">
        <input v-model="message" type="text">
      </div>
      <div class="postMsg">
        <button :disabled="!message" :class="{active:message}" @click="postMessage">发送</button>
      </div>
    </footer>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import getDate, { Alerts } from "@/common/js/common.js";
import Socket from "@/common/js/socket";
export default {
  name: "connectStu",
  data() {
    return {
      lists: [],
      message: "",
      targetStu: {},
      indexItem: []
    };
  },
  methods: {
    postMessage() {
      if (this.message.trim()) {
        Socket.send(
          JSON.stringify({
            mine: {
              mine: true,
              avatar: JSON.parse(sessionStorage.userInfo).icon,
              id: JSON.parse(sessionStorage.userInfo).id,
              content: this.message,
              username: JSON.parse(sessionStorage.userInfo).nick_name
            },
            to: {
              name: this.targetStu.name,
              avatar: JSON.parse(sessionStorage.userInfo).icon,
              id: this.targetStu.user_id,
              type: "friend",
              username: this.targetStu.nick_name
            }
          })
        );
        // 添加到数组
        this.lists.push({
          mine: {
            mine: true,
            avatar: JSON.parse(sessionStorage.userInfo).icon,
            id: JSON.parse(sessionStorage.userInfo).id,
            content: this.message,
            username: JSON.parse(sessionStorage.userInfo).nick_name
          }
        });
        this.scrolls();
      }else {
        alert('不能发送空格！');
        this.scrolls();
      }
    },
    scrolls() {
      setTimeout(() => {
        var height = 0;
        Array.from(this.$refs.msgBox.children).forEach(el => {
          height += el.offsetHeight;
        });
        window.scrollTo(0, height);
        this.message = "";
      }, 1000);
    }
  },
  mounted() {
    this.$nextTick(e => {
      this.scrolls();
    });
  },
  created() {
    this.targetStu = JSON.parse(sessionStorage.user);
    let User = JSON.parse(sessionStorage.userInfo).id;
    // websocket
    Socket.init(
      User,
      message => {
        if (message.indexOf("您") != 0) {
          let msg = JSON.parse(message);
          this.lists.push({
            mine: msg
          });
          this.scrolls();
        }
      },
      err => {
        console.log(err);
      }
    );
    // 获取聊天记录
    this.axios
      .post("/message/getNoticeDetailById", {
        id: this.targetStu.contact_id
      })
      .then(res => {
        let item = 5;
        this.lists = res.list.map((el, index) => {
          item += index + 4;

          this.indexItem.push({
            item: item,
            time: el.add_time
          });

          if (el.type == 1) {
            return {
              mine: {
                mine: true,
                avatar: el.send_icon,
                content: el.context,
                flag: item
              }
            };
          } else {
            return {
              mine: {
                mine: false,
                avatar: el.recive_icon,
                content: el.context,
                flag: item
              }
            };
          }
        });

        // 插入时间蹉
        this.$nextTick(e => {
          let doms = document.querySelectorAll("li");
          let parent = this.$refs.msgBox;
          // dom

          this.indexItem.forEach((el, index) => {
            var li = document.createElement("li");
            li.setAttribute('class','time');
            var span = document.createElement("span");
            span.innerHTML = el.time;
            li.appendChild(span);

            if (doms[el.item]) {
              parent.insertBefore(li, doms[el.item]);
            }
          });
        });
      });
  },

  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#connectStu {
  position: absolute;
  top: Rem(43);
  width: 100%;
  bottom: 0;
  ul {
    padding-bottom: Rem(55);
  }
  ul li {
    box-sizing: border-box;
    padding: 10px;
  }
  ul li span {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    vertical-align: top;
  }
  ul li span img {
    width: 100%;
    height: 100%;
  }
  ul li p {
    display: inline-block;
    max-width: Rem(200);
    line-height: 20px;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 4px;
  }
  ul .right-avatar {
    float: right;
  }
  ul .right-avatar p {
    vertical-align: top;
    text-align: left;
    background-color: #62d653;
    word-break: break-all;
  }
  .left-avatar {
    float: left;
  }
  .left-avatar p {
    word-break: break-all;
    vertical-align: top;
    text-align: left;
    background-color: #fff;
    border: Rem(1) solid #eee;
  }
  .charInput {
    width: 100%;
    font-size: 0;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 10px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
  }
  .charInput div {
    display: inline-block;
  }
  .charInput .inputGroup {
    width: 72%;
    line-height: 49px;
  }
  .charInput .inputGroup input {
    background-color: #fff;
    width: 100%;
    padding: 5px 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  button {
    vertical-align: middle;
    margin-left: Rem(45);
    border: 0;
    color: #fff;
    font-size: rem(14);
    padding: Rem(5) Rem(10);
    border-radius: Rem(5);
    background-color: #75b56c;
    outline: none;
  }
  .active {
    background-color: #20af0e;
  }
}
</style>