const ExcelJS = require("exceljs")
const {
  convertSubArrayToProperties
} = require('./runeUtils')

const runesToXLSX = async (runes) => {
  convertSubArrayToProperties(runes)

  const workbook = new ExcelJS.Workbook({
    creator: 'Marcelo Cristiano Araujo Silva'
  })
  const sheet = workbook.addWorksheet('runes', sheetProperties)
  sheet.columns = columnsConfig
  sheet.addTable({
    name: 'MyTable',
    ref: 'A1',
    headerRow: true,
    style: {
      theme: 'TableStyleMedium19',
      showRowStripes: true,
    },
    columns: tableConfig,
    rows: createTableRows(runes),
  })

  workbook.xlsx.writeFile('runes.xlsx')
}

const createTableRows = runes =>
  runes.reduce((rows, rune) => rows.concat([runeToRow(rune)]), [])

// each row is represented by an array with 19 columns 
const runeToRow = rune => {
  const finalArray = new Array(19).fill('')
  Object.entries(rune).forEach(([key, value]) => {
    const index = findColumnIndexForKey(key)
    finalArray[index] = value
  })
  return finalArray
}

const findColumnIndexForKey = key =>
  columnsConfig.findIndex(({
    key: columnKey
  }) => key === columnKey)

module.exports = {
  runesToXLSX
}

// table properties

const sheetProperties = {
  properties: {
    defaultColWidth: 10
  },
  pageSetup: {
    printArea: 'A1:S1'
  }
}

const columnsConfig = [{
    key: 'mob',
    width: 15
  }, {
    key: 'set'
  },
  {
    key: 'quality'
  },
  {
    key: 'slot',
    style: {
      alignment: {
        horizontal: 'center'
      }
    }
  },
  {
    key: 'grade',
    style: {
      alignment: {
        horizontal: 'right'
      }
    }
  },
  {
    key: 'main',
  },
  {
    key: 'innate',
    width: 15
  },
  {
    key: 'score'
  },
  {
    key: 'spd'
  },
  {
    key: 'crt rate'
  },
  {
    key: 'crt dmg'
  },
  {
    key: 'atk %'
  },
  {
    key: 'def %'
  },
  {
    key: 'hp %'
  },
  {
    key: 'acc'
  },
  {
    key: 'res'
  },
  {
    key: 'atk +'
  },
  {
    key: 'def +'
  },
  {
    key: 'hp +'
  },
]

const tableConfig = [{
    name: 'Where',
    filterButton: true,
  },
  {
    name: 'Set',
    filterButton: true,
  },
  {
    name: 'Quality',
    filterButton: true,
  },
  {
    name: 'Slot',
    filterButton: true,
  },
  {
    name: 'Grade',
    filterButton: true,
  },
  {
    name: 'Main',
    filterButton: true,
  },
  {
    name: 'Innate',
    filterButton: true,
  },
  {
    name: 'Score',
    filterButton: true,
  },
  {
    name: 'spd',
    filterButton: true,
  },
  {
    name: 'crt rate',
    filterButton: true,
  },
  {
    name: 'crt dmg',
    filterButton: true,
  },
  {
    name: 'atk %',
    filterButton: true,
  },
  {
    name: 'def %',
    filterButton: true,
  },
  {
    name: 'hp %',
    filterButton: true,
  },
  {
    name: 'acc',
    filterButton: true,
  },
  {
    name: 'res',
    filterButton: true,
  },
  {
    name: 'atk +',
    filterButton: true,
  },
  {
    name: 'def +',
    filterButton: true,
  },
  {
    name: 'hp +',
    filterButton: true,
  },
]