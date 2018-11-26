<template>
    <div class="dear-notice-widget animated pulse faster" v-if="show">
        <div class="notice-bg"></div>
        <div class="notice-box use-flex is-column box-shadow">
            <header class="use-flex is-center">
                <p v-text="title"></p>
            </header>
            <section class="flex-1">
                <p v-html="content"></p>
            </section>
            <footer :class="showCancel ?'is-justify-between' : 'is-center'">
                <button class="box-shadow" style="background-color: #bfbfbf;" @click="onCancelEv" v-if="true ||showCancel">
                    <span>{{cancel}}</span>
                </button>
                <button class="box-shadow" style="background-color:#FF6600;"  @click="onConfirmEv">
                    <span>{{confirm}}</span>
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {
        // 内容
        title: '',
        content: '',

        // 展示状态
        show: false,

        // 控制组件
        onCancel: null,
        onConfirm: null,
        showCancel: false,

        backgroundEffectEl: null,
        backgroundEffect: 'blur'
      }
    },
    methods: {
      onCancelEv() {
        this.show = false
        this.onCancel && this.onCancel()
        this.backgroundEffectEl && this.cancelBackgroundEffect()
      },
      onConfirmEv() {
        this.show = false

        this.onConfirm && this.onConfirm()
        this.backgroundEffectEl && this.cancelBackgroundEffect()
      },
      showBackgroundEffect() {
        document.querySelector(this.backgroundEffectEl).style.filter = 'blur(20px)'
      },
      cancelBackgroundEffect() {
        document.querySelector(this.backgroundEffectEl).style.filter = 'none'
      }
    },
    mounted() {
      console.log(this.backgroundEffectEl, 'backgroundEffectEl')
      this.backgroundEffectEl && this.showBackgroundEffect()
    }
  }
</script>

<style scoped lang="scss">
    @import "base";
    @import "layout";

    .debug {border: 1px solid red;}
    .dear-notice-widget {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        font-size: 18px;
        font-family: "PingFang SC", sans-serif;

        .notice-bg {
            position: absolute;
            left: 0; top: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .4);
        }

        .notice-box {
            position: absolute;
            overflow: hidden;
            top: 45%;
            left: 50%;
            height: auto;

            min-height: 200px;
            max-height: 70vh;

            min-width: 180px;
            max-width: 380px;

            width: 80%;
            will-change: auto;
            border-radius: 15px;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.95);

            animation: noticeShow 1s ease-in;

            @keyframes noticeShow {
                0% {

                }
            }

            > header {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-weight: bolder;
            }

            > section {
                overflow: auto;
                margin: 0 15px 80px;

                color: #555555;
                max-height: 500px;
                text-align: center;
                word-break: break-word;
                -webkit-overflow-scrolling: touch;
            }

            > footer {
                position: absolute;
                bottom: 20px;
                text-align: center;

                width: 100%;
                height: 44px;
                box-sizing: border-box;
                button {
                    width: 45%;
                    height: 100%;

                    color: #fff;
                    font-size: 16px;
                    border-radius: 20px;
                }
            }
        }
    }

    .box-shadow {
        box-shadow: 0 4px 0 0 rgba(0,0,0,.1);
    }
</style>
