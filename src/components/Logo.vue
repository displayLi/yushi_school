<template>
    <div id="logo" :style="'margin-top:' + marginTop / 38 + 'rem;'">
        <img src="../assets/logo.png" alt="logo">
    </div>
</template>

<script>
    export default {
        name:'logo',
        props:{
            marginTop:String
        }
    }
</script>

<style scoped lang="scss">
@import "../common/css/_mixin.scss";
#logo {
        width: Rem(130);
        height: Rem(111);
        margin: 0 auto Rem(19);
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>