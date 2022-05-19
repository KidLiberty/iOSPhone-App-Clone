export const phoneNumberInRange = (min, max, newPhoneNumber) =>
  newPhoneNumber.length <= min &&
  newPhoneNumber.length < max &&
  newPhoneNumber[0] !== '1' &&
  newPhoneNumber.includes('(') === false
export const usPhoneNumberInRange = (length, newPhoneNumber) =>
  newPhoneNumber.length <= length && newPhoneNumber.includes('(') === false
// backspaceCountryCode()
export const hasCountryCodeInRanges = (newPhoneNumber, numCeiling, numFloor) =>
  newPhoneNumber.length <= numCeiling &&
  newPhoneNumber.length > numFloor &&
  newPhoneNumber.includes('(', ')')
export const formatPhoneNumber = newPhoneNumber => {
  newPhoneNumber.splice(1, 0, ' ')
  newPhoneNumber.splice(2, 0, '(')
  newPhoneNumber.splice(6, 0, ')')
  newPhoneNumber.splice(7, 0, ' ')
  newPhoneNumber.splice(11, 0, '-')
}
export const numberLengthExceeded = newPhoneNumber =>
  newPhoneNumber.length <= 11 &&
  newPhoneNumber.length > 1 &&
  newPhoneNumber.includes('(', ')') === false
