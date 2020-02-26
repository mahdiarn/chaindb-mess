var Trie = require('merkle-patricia-tree/secure')
var levelup = require('levelup')
var leveldown = require('leveldown')
var utils = require('ethereumjs-util')
var rlp = require('rlp')
const BN = utils.BN

const bufBE8 = n => n.toArrayLike(Buffer, 'be', 8)
const bodyKey = (n, hash) => Buffer.concat([Buffer.from('b'), bufBE8(n), hash])
const headerKey = (n, hash) => Buffer.concat([Buffer.from('h'), bufBE8(n), hash])
const recptKey = (n, hash) => Buffer.concat([Buffer.from('r'), bufBE8(n), hash])

var db
try{
    db = levelup(leveldown(process.cwd()))
}catch{
    console.log('error')
}

if (process.argv[2] === 'read') {
    console.log('Stream started')
    db.createReadStream()
    .on('data', function (data) {
      console.log('key')
      console.log(utils.bufferToHex(data.key), true)
      console.log('value')
      console.log(data.value.toString())
    })
    .on('end', function () {
      console.log('Stream ended')
    })
  
} else if (process.argv[2] === 'modify') {
    console.log('Stream started')
    db.createReadStream()
    .on('data', function (data) {
      db.put(data.key, process.argv[3])
    })
    .on('end', function () {
      console.log('Stream ended')
    })
}

db.get(headerKey(new BN(672),utils.toBuffer("0x1ff443c08673eebfa54f6ab7e896e0dbadc507f955954fded49ad4087c618eab")),{
  keyEncoding: 'binary',
  valueEncoding: 'binary'
}, function (err, value) {
  let data = rlp.decode(value)
  console.log('header')
  // console.log(data)
  let arr = []
  data[0].forEach(el => {
    arr.push(el.toString())
    console.log(utils.bufferToHex(el))
    // console.log(el.toString())
  })

  console.log(arr)
})

db.get(bodyKey(new BN(672),utils.toBuffer("0x1ff443c08673eebfa54f6ab7e896e0dbadc507f955954fded49ad4087c618eab")),{
  keyEncoding: 'binary',
  valueEncoding: 'binary'
}, function (err, value) {
  let data = rlp.decode(value)
  console.log('body')
  console.log(data)
  data[0][0].forEach(el => {
    console.log(utils.bufferToHex(el))
  })
})

db.get(recptKey(new BN(672),utils.toBuffer("0x1ff443c08673eebfa54f6ab7e896e0dbadc507f955954fded49ad4087c618eab")),{
  keyEncoding: 'binary',
  valueEncoding: 'binary'
}, function (err, value) {
  let data = rlp.decode(value)
  console.log('recpt')
  // console.log(data)
  data[0][0].forEach(el => {
    console.log(el.toString())
  })
})


let a = 'abc'


console.log(rlp.decode(rlp.encode(a)).toString())