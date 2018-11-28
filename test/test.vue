<template>
    <div class="test-page">
        <button class="modal-trigger" @click="onclickTest">test</button>
        <button class="modal-trigger" style="margin: 500px" @click="onclickTest">center</button>
        <button class="modal-trigger" style="position: absolute;top: 200px;" @click="onclickTest">top</button>
    </div>
</template>

<script>
  export default {
    name: "test",
    methods: {
      onclickTest() {
        this.$notice({
          // cancel: 'ha',
          content: '声律启蒙是旧时学校启蒙读物之一，为康熙年间进士车万育所著。按韵分编，包罗天文、地理、花木、鸟兽、人物、器物等的虚实应对。含单字对、双字对、三字对、五字对、七字对、十一字对等。从单字到多字的层层组对，读起来如唱歌般朗朗上口，较之其它全用三言、四言句式的《三字经》、《千字文》更见韵味，在启蒙读物中独具一格，经久不衰'
        })
      }
    }
  }
</script>

<style scoped>
    .test-page {
        position: absolute;
        left: 0;
        top: 0;

        width: 100vw;
        height: 100vh;
        background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543806728&di=fe0908098dbb7feec299996534b3e283&imgtype=jpg&er=1&src=http%3A%2F%2Foss.gkstk.com%2Fimages%2F2017%2F2%2F24154654454.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>