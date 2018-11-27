<template>
    <div class="dear-notice-widget animated pulse faster" v-if="show">
        <div class="notice-bg" ref="overlay"></div>
        <div ref="noticeContainer" style="position: absolute; top: 0; right: 0;left: 0;bottom: 0;justify-content: center; align-items: center;">
            <div class="notice-box box-shadow" ref="notice">
                <header class="use-flex is-center">
                    <p v-text="title"></p>
                </header>
                <section class="flex-1">
                    <p v-html="content"></p>
                </section>
                <footer >
                    <button class="box-shadow" style="background-color: #bfbfbf;" @click="onCancelEv" v-if="showCancel">
                        <span>{{cancel}}</span>
                    </button>
                    <button class="box-shadow" style="background-color:#FF6600;"  @click="onConfirmEv">
                        <span>{{confirm}}</span>
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  // import {tween, easing, transform, chain, delay, parallel, css} from 'popmotion'
  // const {interpolate} = transform
  const vRange = [0, 1]

  let  dimmerRenderer,
       modalRenderer,
       modalContainerRenderer,
       trigger;

  let Popmotion;

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

        triggerEl: {},
        backgroundEffect: 'blur',
        backgroundEffectEl: null,
      }
    },
    methods: {
      onCancelEv() {
        this.show = false
        this.onCancel && this.onCancel()
        this.backgroundEffectEl && this.cancelBackgroundEffect()
      },
      onConfirmEv() {
        // this.show = false

        this.onConfirm && this.onConfirm()
        this.backgroundEffectEl && this.cancelBackgroundEffect()

        this.submitModal()
      },
      showBackgroundEffect() {
        document.querySelector(this.backgroundEffectEl).style.filter = 'blur(20px)'
      },
      // Return the center x, y of a bounding box
      findCenter({ top, left, height, width }) {
        return {
          x: left + (width / 2),
          y: top + (height / 2)
        };
      },
      generateModalTweener(sourceBBox, destinationBBox) {
        const interpolate = Popmotion.transform.interpolate
        const sourceCenter = this.findCenter(sourceBBox);
        const destinationCenter = this.findCenter(destinationBBox);

        const toX = interpolate(vRange, [sourceCenter.x - destinationCenter.x, 0]);
        const toY = interpolate(vRange, [sourceCenter.y - destinationCenter.y, 0]);
        const toScaleX = interpolate(vRange, [sourceBBox.width / destinationBBox.width, 1]);
        const toScaleY = interpolate(vRange, [sourceBBox.height / destinationBBox.height, 1]);

        return v => modalRenderer.set({
            opacity: v,
            x: toX(v),
            y: toY(v),
            scaleX: toScaleX(v),
            scaleY: toScaleY(v)
        })

      },
      openModal(e) {
          trigger = e.target;
         const {tween, easing, transform, chain, delay, parallel} = Popmotion

        const triggerBBox = trigger.getBoundingClientRect()
        const modalBBox = this.$refs.notice.getBoundingClientRect()
        const modalTweener = this.generateModalTweener(triggerBBox, modalBBox)

        tween({
          duration: 200,
          onUpdate: (v) => dimmerRenderer.set('opacity', v)
        }).start()

        chain(
          delay(75),
          tween({
              duration: 200,
              ease: easing.easeOut,
            }
          )).start({
          update: modalTweener
        })

      },
      cancelBackgroundEffect() {
        document.querySelector(this.backgroundEffectEl).style.filter = 'none'
      },

      submitModal() {
        if (!window.WeakSet) {
          this.show = false
          return
        }
        const {tween, easing, transform, parallel} = Popmotion
        const interpolate = transform.interpolate

        const toScaleXIn = interpolate(vRange, [1, 1.2]);
        const toScaleYIn = interpolate(vRange, [1, 0.8]);

        const toScaleXOut = interpolate(vRange, [1.2, 0.6]);
        const toScaleYOut = interpolate(vRange, [0.8, 1.6]);

        modalRenderer.set('transform-origin', '50% 100%')

        tween({
          duration: 300,
        }).start({
          update: v => modalRenderer.set({
            scaleX: toScaleXIn(v),
            scaleY: toScaleYIn(v),
            y: v * 100
          }),
          complete: () => {
            parallel(
              tween({
                from: dimmerRenderer.get('opacity'),
                to: 0,
              }).start({
                update: (v) => dimmerRenderer.set('opacity', v)
              }),
              tween({
                duration: 200,
              }).start({
                update: (v) => modalRenderer.set({
                  opacity: 1 - v,
                  scaleX: toScaleXOut(v),
                  scaleY: toScaleYOut(v),
                  y: - 50 * easing.easeIn(v)
                }),
                complete: () => {
                  this.show = false
                }
              })
            )
          }
        })
      },
      insertedDOM() {
        if (!window.WeakSet) return

        Popmotion = require('popmotion')

        this.backgroundEffectEl && this.showBackgroundEffect()

        this.$refs.notice.style.top = 'unset'
        this.$refs.notice.style.left = 'unset'
        modalRenderer = Popmotion.css(this.$refs.notice);
        dimmerRenderer = Popmotion.css(this.$refs.overlay);
        modalContainerRenderer = Popmotion.css(this.$refs.noticeContainer);

        modalRenderer.set('opacity',0).render()
        dimmerRenderer.set('display', 'block').render()
        modalContainerRenderer.set('display', 'flex').render()

        this.openModal(this.triggerEl)
      }
    },
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
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

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
