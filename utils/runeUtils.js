const constants = require('../constants')
const mapping = require('./mapping')


const getRunesFromMobs = (unitList) =>
  unitList.reduce((runes, unit) => {
    const mobName = mapping.getMonsterName(unit.unit_master_id)
    const runesWithMobName = unit.runes.map(rune => {
      rune.mob = mobName
      return rune
    })
    return runes.concat(runesWithMobName)
  }, [])

const parseRunes = runes =>
  runes.map(rune => {
    const subs = getRuneSubs(rune)
    const innate = mapping.getRuneEffect(rune.prefix_eff)

    return {
      set: mapping.rune.sets[rune.set_id],
      quality: mapping.rune.quality[rune.rank],
      slot: rune.slot_no,
      grade: `+${rune.upgrade_curr}`,
      main: mapping.getRuneEffect(rune.pri_eff),
      innate,
      subs,
      mob: rune.mob || "inventory",
      score: getRuneScore(subs, innate)
    }
  })

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

const getRuneScore = (subs, innate) => {
  const subsWithInnate = addInnateToSubs(subs, innate)

  const score = subsWithInnate.reduce((acc, status) => {
    const numberPart = Number(status.match(/\d+/)[0])
    const stringPart = status.match(/.+?(?=\d)/)[0].trim()
    switch (stringPart) {
      case 'HP +':
        return acc + (numberPart / 10000) * 100
      case 'ATK +':
        return acc + (numberPart / 750) * 100
      case 'DEF +':
        return acc + (numberPart / 600) * 100
      case 'HP':
      case 'ATK':
      case 'DEF':
      case 'CRI Dmg':
        return acc + (numberPart)
      case 'SPD +':
        return acc + (numberPart * 2)
      case 'CRI Rate':
        return acc + (numberPart * 1.5)
      case 'Resistance':
        return acc + (numberPart * getResistanceMultiplier(numberPart))
      case 'Accuracy':
        return acc + (numberPart * 0.75)
      default:
        console.error('status not found', stringPart)
        return acc
    }
  }, 0)

  return score.toFixed(2)
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

const runeStringify = (runes) => {
  Object.entries(runes).forEach(([set, slots]) => {
    Object.entries(slots).forEach(([slot, runes]) => {
      if (runes.length !== 0)
        console.log(set, slot, runes)
    })
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
  parseRunes,
  getRunesFromMobs,
  convertSubArrayToProperties
}