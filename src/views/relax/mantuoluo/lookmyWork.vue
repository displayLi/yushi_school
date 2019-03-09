<template>
  <div id="lookWork">
    <Headers titleheader="我的作品"></Headers>
    <div class="work-container">
      <img :src="$route.params.img" alt>
    </div>
    <ul>
      <li>
        <p class="title">你现在的心情如何？</p>
        <p>{{$route.params.answer1}}</p>
      </li>
      <li>
        <p class="title">今天什么事让你印象深刻？</p>
        <p>{{$route.params.answer2}}</p>
      </li>
      <li>
        <p class="title">请给你的作品取个名字？</p>
        <p>{{$route.params.answer3}}</p>
      </li>
      <li>
        <p class="title">你的作品让你联想到什么？</p>
        <p>{{$route.params.answer4}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "lookWork",
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#lookWork {
  padding-top: Rem(43);
  .work-container {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    background-color: #fff;
    img {
      object-fit: contain;
      margin-top: Rem(10);
      width: Rem(150);
      height: Rem(150);
      border: Rem(1) solid #eee;
    }
  }
  ul {
    li {
      margin: Rem(10) 0;
      background-color: #fff;
      .title {
        border-bottom: Rem(1) solid #eee;
        padding-left: Rem(10);
        position: relative;
        color: #666;
        margin: 0;
      }
      .title::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: Rem(6);
        height: Rem(16);
        background-color: #5fb655;
      }
      p {
        padding: Rem(10) 0;
        font-size: Rem(15);
        margin-left: Rem(15);
      }
    }
  }
}
</style>