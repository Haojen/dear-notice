<style scoped lang="scss">
    @import "index";

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

        .notice-wrapper {
            position: absolute;
            top: 0; right: 0;
            left: 0;bottom: 0;

            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notice-box {

            display: flex;
            flex-direction: column;

            overflow: hidden;

            width: 80%;
            height: auto;

            min-height: 200px;
            max-height: 70vh;

            min-width: 180px;
            max-width: 380px;

            will-change: auto;
            border-radius: 15px;
            background-color: rgba(255, 255, 255, 0.95);

            > header {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-weight: bolder;
            }

            > section {
                flex: 1;
                overflow: auto;
                margin: 0 15px 0;

                color: #555555;
                max-height: 500px;
                text-align: center;
                word-break: break-word;
                -webkit-overflow-scrolling: touch;
            }

            > footer {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 100%;
                height: 80px;
                box-sizing: border-box;

                button {
                    width: 45%;
                    height: 44px;

                    color: #fff;
                    font-size: 16px;
                    border-radius: 20px;
                    background-color:#FF6600;
                }

                .cancel-btn {
                    margin-right: 2%;
                    background-color: #bfbfbf;
                }
            }
        }
    }
    .box-shadow {
        box-shadow: 0 4px 0 0 rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="dear-notice-widget animated pulse faster" v-if="show">
        <div class="notice-bg" ref="overlay"></div>
        <div ref="noticeContainer" class="notice-wrapper">
            <div class="notice-box box-shadow" ref="notice">
                <header class="use-flex is-center">
                    <p v-text="title"></p>
                </header>
                <section>
                    <p v-html="content"></p>
                </section>
                <footer>
                    <button class="box-shadow cancel-btn" @click="onCancelEv" v-if="cancel">
                        <span>{{cancel}}</span>
                    </button>
                    <button class="box-shadow"  @click="onConfirmEv">
                        <span>{{confirm}}</span>
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  import Anime from 'animejs'

  export default {
    name: "notice",
    data() {
      return {
        // 内容
        title: '',
        content: '',
        cancel: null,
        confirm: null,

        // 展示状态
        show: false,

        // 控制组件
        onCancel: null,
        onConfirm: null,

        triggerEl: null,
        backgroundEffect: null,
        backgroundEffectEl: null,
      }
    },
    methods: {
      onCancelEv() {
        Anime({
          targets: this.$refs.notice,
          opacity: 0,
          duration: 280,
          easing: 'easeInOutSine',
          translateY: window.innerHeight / 2,
        })
        .complete = () => {
          this.show = false
          this.onCancel && this.onCancel()
          this.backgroundEffectEl && this.cancelBackgroundEffect()
        }
      },
      onConfirmEv() {
        const tl = new Anime.timeline

        tl.add({
          targets: this.$refs.notice,
          scaleX: 1.3,
          scaleY: 0.7,
          translateY: 120,
          easing: 'easeInOutSine',
          duration: 200
        })
        .add({
          targets: this.$refs.notice,
          translateY: -window.innerHeight / 3,
          opacity: 0,
          scaleX: 0.4,
          scaleY: 1.2,
          duration: 280,
          easing: 'easeInOutSine',
        })
        .complete = () => {
          this.show = false
          this.onConfirm && this.onConfirm()
          this.backgroundEffectEl && this.cancelBackgroundEffect()
        }
      },
      cancelBackgroundEffect() {
        document.querySelector(this.backgroundEffectEl).style.filter = 'none'
      },
      insertedDOM() {
        Anime({
          targets: this.$refs.notice,
          opacity: [0, 1],
          duration: 260,
          easing: 'easeInOutSine',
          translateY: [window.innerHeight / 2, 0],
          scale: [0.2, 1],
        })
      }
    },
  }
</script>
