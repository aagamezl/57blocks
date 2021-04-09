const {
  benchmark: { run },
  transformation: { transform },
  translation: { translate }
} = require('./../src')

const word = 'conversion'
const language = 'spanish'
const data = {
  a: [{ bar: { string: word } }],
  b: { c: 2 }
}
const configuration = {
  'b.c': (value) => value * 3,
  'a[0].bar.string': (value) => translate(value, language)
}

const subject = () => {
  transform(data, configuration)
}

console.table(run(subject))
