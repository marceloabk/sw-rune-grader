import xlsx from "xlsx"

export const runesToXLSX = (runes) => {
  parseSub(runes)
  const workbook = xlsx.utils.book_new()
  var worksheetName = "runes"
  const worksheet = xlsx.utils.json_to_sheet(runes, {
    skipHeader: false,
    origin: 'A1'
  })
  xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName)
  xlsx.writeFile(workbook, 'runeList.xlsx')
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