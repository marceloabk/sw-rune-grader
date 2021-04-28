import mapping from './utils/mapping.js'
import {
  readFile
} from 'fs/promises'
import {
  getResistanceMultiplier
} from './utils/runeUtils.js'
import {
  runesToXLSX
} from './utils/xlsx.js'


const main = async () => {
  const file = await readFile('./invetory.json')
  const {
    runes,
    unit_list: unitList
  } = JSON.parse(file)

  const unitListRunes = getUnitListRunes(unitList)
  const parsedRunes = parseRunes([...runes, ...unitListRunes], unitList)
  runesToXLSX(parsedRunes)
}

const parseRunes = (runes, unitList) => runes.map(rune => {
  const subs = rune.sec_eff.map(eff =>
    mapping.getRuneEffect(eff)
  )

  const inat = mapping.getRuneEffect(rune.prefix_eff)
  let subsWithInat = subs.slice()
  if (inat !== '')
    subsWithInat.push(inat)

  return {
    set: mapping.rune.sets[rune.set_id],
    quality: mapping.rune.quality[rune.rank],
    slot: rune.slot_no,
    grade: `+${rune.upgrade_curr}`,
    main: mapping.getRuneEffect(rune.pri_eff),
    inat,
    subs,
    mob: getMobFromRune(rune, unitList),
    score: gradeRune(subsWithInat).toFixed(2)
  }
})

const getMobFromRune = (rune, unitList) => {
  let mob
  if (rune.occupied_id === 0) {
    mob = 'inventory'
  } else {
    const unit = unitList.find(({
      unit_id: unitId
    }) => unitId === rune.occupied_id)

    mob = mapping.monster.names[unit.unit_master_id]
  }
  return mob
}

const getUnitListRunes = (unitList) =>
  unitList.reduce((runes, unit) => {
    return runes.concat(unit.runes)
  }, [])

const gradeRune = (subs) =>
  subs.reduce((acc, status) => {
    const number = Number(status.match(/\d+/)[0])
    const string = status.match(/.+?(?=\d)/)[0].trim()
    switch (string) {
      case 'HP +':
        return acc + (number / 10000) * 100
      case 'ATK +':
        return acc + (number / 750) * 100
      case 'DEF +':
        return acc + (number / 600) * 100
      case 'HP':
      case 'ATK':
      case 'DEF':
      case 'CRI Dmg':
        return acc + (number)
      case 'SPD +':
        return acc + (number * 2)
      case 'CRI Rate':
        return acc + (number * 1.5)
      case 'Resistance':
        return acc + (number * getResistanceMultiplier(number))
      case 'Accuracy':
        return acc + (number * 0.75)
      default:
        console.log('não achei esse status', string)
        return acc
    }
  }, 0)


main()