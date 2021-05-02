const constants = require('../constants')
const mapping = require('./mapping')

const runeStringify = (runes) => {
  Object.entries(runes).forEach(([set, slots]) => {
    Object.entries(slots).forEach(([slot, runes]) => {
      if (runes.length !== 0)
        console.log(set, slot, runes)
    })
  })
}

const getRuneSubs = rune => rune.sec_eff.map(mapping.getRuneEffect)

const addInnateToSubs = (subs, innate) => {
  let subsWithInnate = subs.slice()
  if (innate !== '')
    subsWithInnate.push(innate)
  return subsWithInnate
}

const getResistanceMultiplier = (number) => {
  let multiplier = 0

  if (number >= constants.MIN_RESISTENCE) {
    multiplier = 1
  }

  return multiplier
}


const convertSubArrayToProperties = (runes) => {
  runes.forEach(rune => {
    rune.subs.forEach(status => {
      const number = Number(status.match(/\d+/)[0])
      const string = status.match(/.+?(?=\d)/)[0].trim()
      switch (string) {
        case 'HP +':
          rune['hp +'] = number
          break
        case 'ATK +':
          rune['atk +'] = number
          break
        case 'DEF +':
          rune['def +'] = number
          break
        case 'HP':
          rune['hp %'] = number
          break
        case 'ATK':
          rune['atk %'] = number
          break
        case 'DEF':
          rune['def %'] = number
          break
        case 'CRI Dmg':
          rune['crt dmg'] = number
          break
        case 'SPD +':
          rune['spd'] = number
          break
        case 'CRI Rate':
          rune['crt rate'] = number
          break
        case 'Resistance':
          rune['res'] = number
          break
        case 'Accuracy':
          rune['acc'] = number
          break
        default:
          console.log('não achei esse status', string)
      }
    })
    delete rune.subs
  })
}


const bestRunesSorter = ({
  score: a
}, {
  score: b
}) => {
  return b - a
}

const worseRunesSorter = ({
  score: a
}, {
  score: b
}) => {
  return a - b
}

module.exports = {
  runeStringify,
  getResistanceMultiplier,
  bestRunesSorter,
  worseRunesSorter,
  getRuneSubs,
  addInnateToSubs,
  convertSubArrayToProperties
}