export const ButtonNumberValues = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '*',
  '0',
  '#'
]
export const ButtonLetterValues = [
  ' ',
  ' ',
  'A B C',
  'D E F',
  'G H I',
  'J K L',
  'M N O',
  'P Q R S',
  'T U V',
  'W X Y Z',
  '+'
]

// backspaceCountryCode()
export const numberExceedsLength = newPhoneNumber =>
  newPhoneNumber.length <= 11 &&
  newPhoneNumber.length > 1 &&
  newPhoneNumber.includes('(', ')') === false
export const formatPhoneNumber = newPhoneNumber => {
  newPhoneNumber.splice(1, 0, ' ')
  newPhoneNumber.splice(2, 0, '(')
  newPhoneNumber.splice(6, 0, ')')
  newPhoneNumber.splice(7, 0, ' ')
  newPhoneNumber.splice(11, 0, '-')
  return newPhoneNumber
}
export const phoneNumberLengthBetween = (newPhoneNumber, max, min) =>
  newPhoneNumber.length <= max &&
  newPhoneNumber.length > min &&
  newPhoneNumber.includes('(', ')')
export const threeCountryCodeDigitsRemain = newPhoneNumber =>
  newPhoneNumber.length <= 7 &&
  newPhoneNumber.length > 1 &&
  newPhoneNumber[5] !== ' '
export const twoCountryCodeDigitsRemain = newPhoneNumber =>
  newPhoneNumber.length <= 7 &&
  newPhoneNumber.length > 1 &&
  newPhoneNumber[4] !== ' '
export const oneCountryCodeDigitRemains = newPhoneNumber =>
  newPhoneNumber.length <= 6 &&
  newPhoneNumber.length > 1 &&
  newPhoneNumber[3] !== ' '
