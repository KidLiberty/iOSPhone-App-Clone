import React from 'react'

import IOSPhone from './IOSPhone'

export default function IOSPhoneUtil(props) {
  const newPhoneNumber = [...props]

  const phoneNumberInRange = (min, max) =>
    newPhoneNumber.length <= min &&
    newPhoneNumber.length < max &&
    newPhoneNumber[0] !== '1' &&
    newPhoneNumber.includes('(') === false
  const usPhoneNumberInRange = length =>
    newPhoneNumber.length <= length && newPhoneNumber.includes('(') === false

  // backspaceCountryCode()
  const hasCountryCodeInRanges = (newPhoneNumber, numCeiling, numFloor) =>
    newPhoneNumber.length <= numCeiling &&
    newPhoneNumber.length > numFloor &&
    newPhoneNumber.includes('(', ')')
  const formatPhoneNumber = () => newPhoneNumber.splice(1, 0, ' ')
  newPhoneNumber.splice(2, 0, '(')
  newPhoneNumber.splice(6, 0, ')')
  newPhoneNumber.splice(7, 0, ' ')
  newPhoneNumber.splice(11, 0, '-')
  const numberLengthExceeded = () =>
    newPhoneNumber.length <= 11 &&
    newPhoneNumber.length > 1 &&
    newPhoneNumber.includes('(', ')') === false

  const utilValues = {
    phoneNumberInRange,
    usPhoneNumberInRange,
    hasCountryCodeInRanges,
    formatPhoneNumber,
    numberLengthExceeded
  }

  return utilValues
}
