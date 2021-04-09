const {
  transformation: { transform },
  translation: { translate }
} = require('./src');

(() => {
  const data = []
  const configuration = {}

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[1].bar.c': (value) => value * 3
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value * 3
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value + 3
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value - 3
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const data = { a: [{ bar: { c: 12 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value / 3
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const word = 'conversion'
  const language = 'spanish'
  const data = { a: [{ bar: { string: word } }] }
  const configuration = {
    'a[0].bar.string': (value) => translate(value, language)
  }

  console.log(JSON.stringify(transform(data, configuration)))
})();

(() => {
  const word = 'conversion'
  const language = 'english'
  const data = {
    a: [{ bar: { string: word } }],
    b: { c: 2 }
  }
  const configuration = {
    'b.c': (value) => value * 3,
    'a[0].bar.string': (value) => translate(value, language)
  }

  console.log(JSON.stringify(transform(data, configuration)))
})()
