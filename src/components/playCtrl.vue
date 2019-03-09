<template>
    <div id="playCtrl">
        <!-- 播放暂停 -->
        <span class="play-puase" @click="isPlay">
            <img v-if="!playFlag" src="../assets/puase.png" alt="播放中">
            <img v-if="playFlag" src="../assets/play.png" alt="暂停中">
        </span>
        <!-- 进度条 -->
        <div class="speed" ref="getWidth">
            <div class="peed-active" :style="'width:'+ widths + 'px'"></div>
        </div>
        <!-- audio -->
        <audio autoplay v-if="audioUrl" ref="audios">
            <source :src="audioUrl" type="audio/mp3">
        </audio>
    </div>
</template>

<script>
    export default {
        name:'playCtrl',
        props:{
            audioUrl:{
                type:String,
                required:true
            }
        },
        data() {
            return {
                playFlag:true,
                timer:null,
                widths:0
            }
        },
        methods:{
            isPlay() {
                // 获取audio的dom节点
                let audios = this.$refs.audios;

                // 判断播放状态
                if (this.playFlag) {
                   audios.pause();   // 暂停播放
                   this.playFlag = false;   // 设置状态
                   clearInterval(this.timer);  // 暂停清除定时器
                }else {
                    audios.play();   // 开始播放
                    this.playFlag = true;  // 设置状态
                    this.getMusicDetail();   // 播放重新调用
                }
            },
            getMusicDetail(){
                this.$nextTick(_ => {
                    let audios = this.$refs.audios;  // 获取dom节点
                    let getWidth = this.$refs.getWidth.offsetWidth;

                    this.timer = setInterval(_ => {
                        this.widths = getWidth / audios.duration * audios.currentTime;    // 计算滚动条的长度

                        if (this.widths >= getWidth) {   // 判断是不是自然播放完毕，如果是自然播放完毕改变按钮状态庆清除定时器
                            clearInterval(this.timer);
                            this.playFlag = false
                        }

                    },1000)
                })
            }
        },
        created() {

            if (this.audioUrl) {
                setTimeout(_ => {
                    this.getMusicDetail();
                },100)   
            }
        },
        destroyed() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    @import "../common/css/_mixin.scss";
    #playCtrl{
        width: 100%;
        height: Rem(45);
        font-size: 0;
        background-color: #5FB655;
        .play-puase {
            display: inline-block;
            vertical-align: middle;
            padding: Rem(12) Rem(14);
            img {
                width: Rem(20);
                height:Rem(20);
                object-fit: contain;
            }
        }
        .speed {
            vertical-align: middle;
            display: inline-block;
            width: Rem(310);
            height: Rem(3);
            border: Rem(1) solid #fff;
            border-radius: Rem(2);
            .peed-active {
                width: 0%;
                height: 100%;
                background-color: #fff;
            }
        }
    }
</style>