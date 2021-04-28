import ExcelJS from "exceljs"

export const runesToXLSX = async (runes) => {
  parseSub(runes)
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
    rows: runes.reduce((acc, rune) => {
      const finalArray = new Array(19).fill('')
      Object.entries(rune).forEach(([key, value]) => {
        const index = columnsConfig.findIndex(({
          key: columnKey
        }) => key === columnKey)
        finalArray[index] = value
      })
      acc.push(finalArray)
      return acc
    }, []),
  })

  workbook.xlsx.writeFile('runes.xlsx')
}

const parseSub = (runes) => {
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


const sheetProperties = {
  properties: {
    defaultColWidth: 10
  },
  pageSetup: {
    printArea: 'A1:S1'
  }
}

const columnsConfig = [{
    header: 'Where',
    key: 'mob',
    width: 15
  }, {
    header: 'Set',
    key: 'set'
  },
  {
    header: 'Quality',
    key: 'quality'
  },
  {
    header: 'Slot',
    key: 'slot',
    style: {
      alignment: {
        horizontal: 'center'
      }
    }
  },
  {
    header: 'Grade',
    key: 'grade',
    style: {
      alignment: {
        horizontal: 'right'
      }
    }
  },
  {
    header: 'Main',
    key: 'main',
  },
  {
    header: 'Inat',
    key: 'inat',
    width: 15
  },
  {
    header: 'Score',
    key: 'score'
  },
  {
    header: 'spd',
    key: 'spd'
  },
  {
    header: 'crt rate',
    key: 'crt rate'
  },
  {
    header: 'crt dmg',
    key: 'crt dmg'
  },
  {
    header: 'atk %',
    key: 'atk %'
  },
  {
    header: 'def %',
    key: 'def %'
  },
  {
    header: 'hp %',
    key: 'hp %'
  },
  {
    header: 'acc',
    key: 'acc'
  },
  {
    header: 'res',
    key: 'res'
  },
  {
    header: 'atk +',
    key: 'atk +'
  },
  {
    header: 'def +',
    key: 'def +'
  },
  {
    header: 'hp +',
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
    name: 'Inat',
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