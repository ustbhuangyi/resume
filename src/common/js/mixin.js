import Promise from 'bluebird'
import { handleChar } from 'common/js/util'

const endOfSentence = /[？！。~：]$/
const comma = /\D[，；、]$/
const endOfBlock = /[^/]\n\n$/

const debug = process.env.NODE_ENV !== 'production'

export const writeMixin = {
  data() {
    return {
      text: '',
      speed: debug ? 0 : 16
    }
  },
  created() {
    this.styleBuffer = ''
  },
  methods: {
    async writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval) {
      if (this.$root.animationSkipped) {
        throw new Error('SKIP IT')
      }
      let chars = message.slice(index, index + charsPerInterval)
      index += charsPerInterval

      el.scrollTop = el.scrollHeight

      if (mirrorToStyle) {
        this.writeChar(chars)
      } else {
        this.writeSimpleChar(chars)
      }

      if (index < message.length) {
        let thisInterval = interval
        let thisSlice = message.slice(index - 2, index)
        if (comma.test(thisSlice)) {
          thisInterval = interval * 30
        }
        if (endOfSentence.test(thisSlice)) {
          thisInterval = interval * 70
        }
        thisSlice = message.slice(index - 2, index + 1)
        if (endOfBlock.test(thisSlice)) {
          thisInterval = interval * 50
        }

        do {
          await Promise.delay(thisInterval)
        } while (this.$root.paused)

        return this.writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval)
      }
    },
    writeChar(char) {
      this.text = handleChar(this.text, char)
      this.styleBuffer += char
      if (char === ';') {
        this.$root.$emit('styleAppend', this.styleBuffer)
        this.styleBuffer = ''
      }
    },
    writeSimpleChar(char) {
      this.text += char
    }
  }
}
