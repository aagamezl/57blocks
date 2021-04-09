const test = require('ava')

const {
  transformation: { transform },
  translation: { translate }
} = require('./../src/')

test('should return original data if configuration is empty', t => {
  const data = []
  const configuration = {}

  t.deepEqual(transform(data, configuration), data)
})

test('should return original data if path doesn\'t exist', t => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[1].bar.c': (value) => value * 3
  }

  t.deepEqual(transform(data, configuration), data)
})

test('should return correct data for multiply operations', t => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value * 3
  }
  const expectedData = { a: [{ bar: { c: 9 } }] }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return correct data for addition operations', t => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value + 3
  }
  const expectedData = { a: [{ bar: { c: 6 } }] }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return correct data for subtraction operations', t => {
  const data = { a: [{ bar: { c: 3 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value - 3
  }
  const expectedData = { a: [{ bar: { c: 0 } }] }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return correct data for division operations', t => {
  const data = { a: [{ bar: { c: 12 } }] }
  const configuration = {
    'a[0].bar.c': (value) => value / 3
  }
  const expectedData = { a: [{ bar: { c: 4 } }] }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return correct data for translation operations', t => {
  const word = 'conversion'
  const language = 'spanish'
  const data = { a: [{ bar: { string: word } }] }
  const configuration = {
    'a[0].bar.string': (value) => translate(value, language)
  }
  const expectedData = { a: [{ bar: { string: `${word} translated to ${language}` } }] }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return correct data for multiples operations', t => {
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
  const expectedData = {
    a: [{ bar: { string: `${word} translated to ${language}` } }],
    b: { c: 6 }
  }

  t.deepEqual(transform(data, configuration), expectedData)
})

test('should return throw an error when deep level is greater than 10', t => {
  const language = 'spanish'
  const data = { a: { b: { c: { d: { e: { f: { g: { h: { i: { j: { k: { l: 'value' } } } } } } } } } } } }
  const configuration = {
    'a.b.c.d.e.f.g.h.i.j.k.l': (value) => translate(value, language)
  }
  const expectedData = 'a.b.c.d.e.f.g.h.i.j.k.l length (12) is greater than configurated deep level (10)'

  const error = t.throws(() => {
    transform(data, configuration)
  }, { instanceOf: Error })

  t.is(error.message, expectedData)
})
