const {
  readFile
} = require('fs/promises')
const {
  getRunesFromMobs,
  parseRunes
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

runeGrader()