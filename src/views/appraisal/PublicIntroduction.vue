<template>
    <div id="PublicIntroduction">
        <Headers titleheader="专业测评"></Headers>
        <div class="test-container">
            <h3 class="titles">{{paramsData.titles}}</h3>
            <p class="content" v-html="paramsData.details"></p>
        </div>
        <router-link class="btn" :to="'/answer/' + paramsData.type">
            <btnSubmit
            :disabled="false"
            width="160"
            height="45"
            radius="22.5"
        >开始测试</btnSubmit>
        </router-link>
    </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
    export default {
        name:'publicIntroduction',
        data(){
            return {
                paramsData:{}
            }
        },
        components: {
            Headers,
            btnSubmit
        },
        created() {
            // 如果路由参数是true的话 进行存缓存
            if (this.$route.params.titles) {
                sessionStorage.paramsData = JSON.stringify(this.$route.params);
            }
            // 给路由参数赋值
            this.paramsData = JSON.parse(sessionStorage.paramsData) || this.$route.params;
        }
    }
</script>

<style scoped lang="scss">
 @import "src/common/css/_mixin.scss";
#PublicIntroduction {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
   @include bgImg("../../assets/Screenshot.png", cover);
   .test-container {
       box-sizing: border-box;
       padding: Rem(65) Rem(23);
        margin-top: Rem(60);
       color: #666666;
       h3 {
           text-align: center;
           font-size: Rem(16);
           margin-bottom: Rem(25);
       }
       p {
           text-indent: Rem(25);
           font-size: Rem(12);
           line-height: Rem(18);
       }
   }
   .btn {
       display: block;
       text-align: center;
   }
}
</style>