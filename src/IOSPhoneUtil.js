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
  '+',
  ' ',
  'A B C',
  'D E F',
  'G H I',
  'J K L',
  'M N O',
  'P Q R S',
  'T U V',
  'W X Y Z'
]

/* dialNumberWithCountryCode */
export const numberStartsWithOne = (newPhoneNumber, number) =>
  newPhoneNumber.length === 0 && number === '1'
export const secondDigitIsOne = (newPhoneNumber, number) =>
  (newPhoneNumber.length <= 13 &&
    newPhoneNumber[0] === '1' &&
    newPhoneNumber.includes('(') === false &&
    number === '1') ||
  newPhoneNumber[1] === '1'
export const dialingFirstCountryCodeDigit = newPhoneNumber =>
  newPhoneNumber.length === 1
export const dialingSecondCountryCodeDigit = newPhoneNumber =>
  newPhoneNumber.length >= 1 &&
  newPhoneNumber.length <= 7 &&
  newPhoneNumber[4] === ' '
export const dialingThirdCountryCodeDigit = newPhoneNumber =>
  newPhoneNumber.length >= 1 &&
  newPhoneNumber.length <= 7 &&
  newPhoneNumber[5] === ' '
export const dialingDigitsAfterCountryCode = newPhoneNumber => {
  if (newPhoneNumber.length >= 7 && newPhoneNumber.length <= 8) {
    return true
  } else if (newPhoneNumber.length >= 9 && newPhoneNumber.length <= 10) {
    return false
  }
}
export const dialingLineNumber = newPhoneNumber =>
  newPhoneNumber.length >= 11 &&
  newPhoneNumber.length <= 12 &&
  newPhoneNumber.includes('(', ')')
export const countryCodeLengthExceeded = newPhoneNumber =>
  newPhoneNumber.length >= 16
/* backspaceCountryCode */
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

/* formatExceededLengthFont */
export const phoneNumberMaxRange = newPhoneNumber =>
  newPhoneNumber.length < 13 && newPhoneNumber.includes('(') === false
export const phoneNumberInRange = (newPhoneNumber, min, max) =>
  newPhoneNumber.length <= min &&
  newPhoneNumber.length < max &&
  newPhoneNumber[0] !== '1' &&
  newPhoneNumber.includes('(') === false
export const usPhoneNumberInRange = (newPhoneNumber, length) =>
  newPhoneNumber.length <= length && newPhoneNumber.includes('(') === false
