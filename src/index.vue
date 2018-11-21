<template>
    <div class="dear-notice-widget animated pulse faster" v-if="show">
        <div class="notice-bg"></div>
        <div class="notice-box use-flex is-column box-shadow">
            <header class="use-flex is-center">
                <p style="text-align: center">{{title}}</p>
            </header>
            <section class="flex-1"  style="text-align: center;">
                <p v-html="content"></p>
            </section>
            <footer class="use-flex is-full-width" :class="showCancel ?'is-justify-between' : 'is-center' ">
                <button class="box-shadow" style="background-color: #bfbfbf;" @click="onCancelEv" v-if="showCancel">
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
        title: '',
        content: '',
        show: false,
        _CONTAINER: {},
        _NOTICE_NUM: 0,
        onCancel: null,
        onConfirm: null,
        showCancel: false,
      }
    },
    inject: [''],
    methods: {
      onCancelEv() {
        // this.$clickSound()
        this.show = false
        this.cancelBlur()
        this.onCancel && this.onCancel()
      },
      onConfirmEv() {
        // this.$clickSound()
        this.show = false

        this.cancelBlur()
        this.onConfirm && this.onConfirm()
      },
      blur() {
        const app = this._CONTAINER = document.querySelector('.app-page')
        app.style.filter = 'blur(10px)'
      },
      cancelBlur() {
        this._CONTAINER.style.filter = 'none'
      }
    },
    mounted() {
      this.blur()
    }
  }
</script>

<style scoped lang="scss">
    @import "index.scss";

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
            top: 40%;
            left: 50%;
            height: auto;

            min-height: 200px;
            max-height: 70vh;

            min-width: 180px;
            max-width: 380px;

            width: 80%;
            padding: 25px 15px;
            border-radius: 15px;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.95);

            animation: vkpulse 1s ;

            > header {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 40px;
                font-weight: bolder;
            }

            > section {
                margin: 20px 0;
                overflow: auto;

                color: #555555;
                max-height: 500px;
                text-align: center;
                word-break: break-word;
                -webkit-overflow-scrolling: touch;
            }

            > footer {
                width: 100%;
                height: 40px;
                font-size: 14px;

                button {
                    height: 100%;

                    color: #fff;
                    width: 45%;
                    border-radius: 20px;
                }
            }
        }
    }

    .box-shadow {
        box-shadow: 0 4px 0 0 rgba(0,0,0,.1);
    }
</style>
