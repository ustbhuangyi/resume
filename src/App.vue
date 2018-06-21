<template>
  <div id="app">
    <style-text ref="styleText"></style-text>
    <work-text ref="workText"></work-text>
  </div>
</template>

<script>
  import StyleText from './components/style-text/style-text'
  import WorkText from './components/work-text/work-text'
  import Promise from 'bluebird'

  export default {
    name: 'App',
    components: {
      StyleText,
      WorkText
    },
    mounted() {
      this.startAnimation()
    },
    methods: {
      async startAnimation() {
        await this.$refs.styleText.write(0)
        await this.$refs.workText.write()
        await this.$refs.styleText.write(1)
        this.$refs.workText.showWorkBox()
        await Promise.delay(2000)
        await this.$refs.styleText.write(2)
      }
    }
  }
</script>

<style lang="stylus">
  #app
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 20px
</style>
