<template>
  <div id="jing">
    <Headers :titleheader="titleFlag == 1 ? '涂鸦' : '畅想' "></Headers>
    <div class="icon-font">静</div>
    <p>慢慢调整自己的心境，深深呼气，将注意力集中在自己的呼吸上，在呼吸中让自己沉静下来。如果喜欢，可以采用静坐或听轻音乐的方式，让浮躁的意识平静下来。此刻，你的心如明镜，一切静待呈现。</p>
    <ul v-if="manDitu.length > 0">
      <li v-for="(item,index) in manDitu" :key="index" @click="goToSi(item)">
        <img :src="item.img" alt>
      </li>
    </ul>
    <div class="cx" v-if="titleFlag == 2" @click="goToSi(imgSrc)">
      <p>{{manGuanqiaName}}</p>
      <img :src="imgSrc" alt>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "jing",
  data() {
    return {
      manDitu: [],
      titleFlag: 0,
      manGuanqiaName: "",
      imgSrc: require("../../../assets/no-image.png")
    };
  },
  created() {
    this.titleFlag = JSON.parse(sessionStorage.item).type;
    this.axios("interest/getGuanQiaById", {
      params: { id: JSON.parse(sessionStorage.item).id }
    }).then(res => {
      this.manGuanqiaName = res.manGuanqia.name;
      if (res.manDitu[0].img) {
        this.manDitu = res.manDitu.map(el => {
          return {
            img: el.img.replace(
              "http://0.0.0.0:8200",
              "https://app.ziyushi.com"
            )
          };
        });
      }
    });
  },
  methods: {
    goToSi(item) {
      if (this.titleFlag == 2) {
        this.$router.push({ name: "hua", params: { item } });
        sessionStorage.img = item;
      } else {
        this.$router.push({ name: "si", params: { item } });
        sessionStorage.img = item.img;
      }
    }
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#jing {
  padding-top: Rem(43);
  background-color: #fff;
  .icon-font {
    margin: Rem(16) auto Rem(24);
    width: Rem(60);
    font-size: Rem(20);
    text-align: center;
    line-height: Rem(60);
    background-color: #5fb655;
    border-radius: 50%;
    color: #fff;
  }
  p {
    box-sizing: border-box;
    padding: 0 Rem(28) Rem(37);
    line-height: Rem(24);
    color: #666;
    font-size: Rem(15);
  }
  ul {
    padding-bottom: Rem(30);
    li {
      display: inline-block;
      margin: Rem(15);
      border: Rem(1) solid #eee;
      width: Rem(150);
      height: Rem(150);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .cx {
    width: Rem(195);
    margin: 0 auto;
    p {
      text-align: center;
      color: #5fb655;
    }
    img {
      text-align: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>