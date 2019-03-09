<template>
    <div id="notData">
        <img src="../assets/not-found.png" alt="">
    </div>
</template>

<script>
    export default {
        name:'notData'
    }
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#notData {
    position: absolute;
    top: 50%;
    left: 50%;
    width: Rem(130);
    height: Rem(120);
    transform: translate(-50%,-50%);
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

</style>