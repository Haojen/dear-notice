# Dear-Notice

一个基于 `Vue` 创造的通知框组件

## Install

    npm install dear-notice --save

## Usage

    // import
    import Vue from 'vue'
    import DearNotice from 'dear-notice'

    // config
    Vue.use(DearNotice, [config options])

    // use in vue
    new Vue({
        created() {
            this.$notice('Hello')
        }
    })

## Config

### Init Config (挂载到Vue时的配置)

`prefix`

DEFAULT: $notice

prefix 是一个挂载到 Vue 实例中的 namespace，用来唤起弹框，例如 `this.$notice({string | [options]})`

    Vue.use(DearNotice, {
        prefix: '$notice'
    })

`backgroundEffectEl`
类型：string | HTMLElement
用来操作弹出框后面的背景元素，比如给其添加模糊效果

### Runtime Config
提供了两种调用方式，第一种简写的方式 `this.$notice('hello')`
和第二种完整的调用方式，如下：

    this.$notice({
        title: '',
        content: '', // notice text
        cancel: '', // cancel button
        confirm: '', // confirm button
        onCancel: () => {}, // cancel callback
        onConfirm: () => {}, // confirm callback
    })






