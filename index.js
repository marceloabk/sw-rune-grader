const mapping = require('./utils/mapping')
const {
  readFile
} = require('fs/promises')
const {
  getResistanceMultiplier,
  getRuneSubs,
  addInnateToSubs
} = require('./utils/runeUtils')
const {
  runesToXLSX
} = require('./utils/xlsx')


const runeGrader = async () => {
  const file = await readFile('./sw.json')
  const {
    runes: inventoryRunes,
    unit_list: unitList
  } = JSON.parse(file)

  const runesOfMobs = getRunesFromMobs(unitList)
  const parsedRunes = parseRunes([...inventoryRunes, ...runesOfMobs])
  runesToXLSX(parsedRunes)
}

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

const getRunesFromMobs = (unitList) =>
  unitList.reduce((runes, unit) => {
    const mobName = mapping.getMonsterName(unit.unit_master_id)
    const runesWithMobName = unit.runes.map(rune => {
      rune.mob = mobName
      return rune
    })
    return runes.concat(runesWithMobName)
  }, [])

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

runeGrader()