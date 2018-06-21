let openComment = false
const commentRegex = /(\/\*(?:[^](?!\/\*))*\*)$/
const keyRegex = /([a-zA-Z- ^\n]*)$/
const valueRegex = /([^:]*)$/
const selectorRegex = /(.*)$/
const pxRegex = /\dp/
const pxRegex2 = /p$/

export function handleChar(fullText, char) {
  if (openComment && char !== '/') {
    fullText += char
  } else if (char === '/' && openComment === false) {
    openComment = true
    fullText += char
  } else if (char === '/' && fullText.slice(-1) === '*' && openComment === true) {
    openComment = false
    fullText = fullText.replace(commentRegex, '<span class="comment">$1/</span>')
  } else if (char === ':') {
    fullText = fullText.replace(keyRegex, '<span class="key">$1</span>:')
  } else if (char === '') {
    fullText = fullText.replace(valueRegex, '<span class="value">$1</span>')
  } else if (char === '{') {
    fullText = fullText.replace(selectorRegex, '<span class="selector">$1</span>{')
  } else if (char === 'x' && pxRegex.test(fullText.slice(-2))) {
    fullText = fullText.replace(pxRegex2, '<span class="value px">px</span>')
  } else {
    fullText += char
  }
  return fullText
}
