<template>
  <pre id="style-text" contenteditable v-html="text">
  </pre>
</template>

<script>
  import { writeMixin } from 'common/js/mixin'

  const styleText = [0, 1, 2].map((i) => {
    return require('raw-loader!./styles' + i + '.css')
  })

  export default {
    name: 'style-text',
    mixins: [writeMixin],
    methods: {
      async write(index) {
        await this.writeTo(this.$el, styleText[index], 0, this.speed, true, 1)
      }
    }
  }
</script>
