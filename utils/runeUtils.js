import constants from '../constants.js'
export const runeStringify = (runes) => {
  Object.entries(runes).forEach(([set, slots]) => {
    Object.entries(slots).forEach(([slot, runes]) => {
      if (runes.length !== 0)
        console.log(set, slot, runes)
    })
  })
}

export const getResistanceMultiplier = (number) => {
  let multiplier = 0

  if (number >= constants.MIN_RESISTENCE) {
    multiplier = 1
  }

  return multiplier
}

export const bestRunesSorter = ({
  score: a
}, {
  score: b
}) => {
  return b - a
}

export const worseRunesSorter = ({
  score: a
}, {
  score: b
}) => {
  return a - b
}