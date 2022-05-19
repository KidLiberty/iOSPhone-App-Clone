import React, { useState } from 'react'

import IOSPhoneUtil from './IOSPhoneUtil'
import {
  phoneNumberInRange,
  usPhoneNumberInRange,
  hasCountryCodeInRanges,
  formatPhoneNumber,
  numberLengthExceeded
} from './IOSPhoneUtil'

export default function IOSPhone() {
  const [phoneNumber, setPhoneNumber] = useState([])
  const ButtonValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#']

  const NumberButton = props => (
    <button className='btn' onClick={props.onClick}>
      {props.value}
    </button>
  )

  function dial(number) {
    if (
      (phoneNumber[0] === undefined && number === '1') ||
      phoneNumber[0] === '1'
    ) {
      dialNumberWithCountryCode(number)
    } else {
      dialNumberWithAreaCode(number)
    }
  }

  function backspace() {
    if (phoneNumber[0] === '1') {
      backspaceCountryCode()
    } else {
      backspaceAreaCode()
    }
  }

  function dialNumberWithCountryCode(number) {
    const newPhoneNumber = [...phoneNumber]
    const dialNumber = () => setPhoneNumber([...newPhoneNumber, number])
    const numberStartsWithOne = () =>
      newPhoneNumber.length === 1 && number === '1'
    const dialingFirstCountryCodeDigit = () => newPhoneNumber.length === 1
    const dialFirstCountryCodeDigit = () =>
      setPhoneNumber(`1 (${number}  )`.split(''))
    const dialingSecondCountryCodeDigit = () =>
      newPhoneNumber.length >= 1 &&
      newPhoneNumber.length <= 7 &&
      newPhoneNumber[4] === ' '
    const dialSecondCountryCodeDigit = () => {
      newPhoneNumber.splice(4, 1, number)
      setPhoneNumber([...newPhoneNumber])
    }
    const dialingThirdCountryCodeDigit = () =>
      newPhoneNumber.length >= 1 &&
      newPhoneNumber.length <= 7 &&
      newPhoneNumber[5] === ' '
    const dialThirdCountryCodeDigit = () => {
      newPhoneNumber.splice(5, 1, number)
      setPhoneNumber([...newPhoneNumber])
    }
    const dialingDigitsAfterCountryCode = () => {
      if (newPhoneNumber.length >= 7 && newPhoneNumber.length <= 8) {
        return true
      } else if (newPhoneNumber.length >= 9 && newPhoneNumber.length <= 10) {
        return false
      }
    }
    const dialDigitsAfterCountryCode = () => {
      if (dialingDigitsAfterCountryCode()) {
        setPhoneNumber([...newPhoneNumber, ' ', number])
      } else {
        setPhoneNumber([...newPhoneNumber, number])
      }
    }
    const dialingLineNumber = () =>
      newPhoneNumber.length >= 11 &&
      newPhoneNumber.length <= 12 &&
      newPhoneNumber.includes('(', ')')
    const dialLineNumber = () =>
      setPhoneNumber([...newPhoneNumber, '-', number])
    const phoneNumberLengthExceeded = () => newPhoneNumber.length >= 16

    if (numberStartsWithOne()) {
      dialNumber()
    } else if (dialingFirstCountryCodeDigit()) {
      dialFirstCountryCodeDigit()
    } else if (dialingSecondCountryCodeDigit()) {
      dialSecondCountryCodeDigit()
    } else if (dialingThirdCountryCodeDigit()) {
      dialThirdCountryCodeDigit()
    } else if (dialingDigitsAfterCountryCode()) {
      dialDigitsAfterCountryCode()
    } else if (dialingDigitsAfterCountryCode()) {
      dialDigitsAfterCountryCode()
    } else if (dialingLineNumber()) {
      dialLineNumber()
    } else if (phoneNumberLengthExceeded()) {
      formatExceededLengthNumber(number)
    } else {
      dialNumber()
    }
  }

  function dialNumberWithAreaCode(number) {
    if (phoneNumber.length > 2 && phoneNumber.length < 8) {
      appendAreaCodeToNumber(number)
    } else if (phoneNumber.length >= 7 && phoneNumber.length < 13) {
      shiftAreaCode(number)
    } else if (phoneNumber.length >= 13) {
      formatExceededLengthNumber(number)
    } else {
      setPhoneNumber([...phoneNumber, number])
    }
  }

  function appendAreaCodeToNumber(number) {
    const newPhoneNumber = [...phoneNumber]
    if (newPhoneNumber[3] !== '-') {
      newPhoneNumber.splice(4, 0, '-')
    }
    setPhoneNumber([...newPhoneNumber, number])
  }

  function shiftAreaCode(number) {
    const newPhoneNumber = [...phoneNumber]
    if (newPhoneNumber[3] === '-') {
      newPhoneNumber.splice(0, 0, '(')
      newPhoneNumber.splice(4, 0, ') ')
      newPhoneNumber.splice(5, 1)
      newPhoneNumber.splice(8, 0, '-')
    }
    setPhoneNumber([...newPhoneNumber, number])
  }

  function formatExceededLengthNumber(number) {
    const newPhoneNumber = [...phoneNumber]
    const areaCodeLengthExceeded = () =>
      newPhoneNumber.length >= 13 &&
      newPhoneNumber.length < 16 &&
      newPhoneNumber.includes('(', ') ', '-')
    if (areaCodeLengthExceeded()) {
      newPhoneNumber.splice(0, 1)
      newPhoneNumber.splice(3, 1)
      newPhoneNumber.splice(6, 1)
    } else if (
      newPhoneNumber.length >= 16 &&
      newPhoneNumber.includes('(', ')', ' ', '-')
    ) {
      newPhoneNumber.splice(1, 1)
      newPhoneNumber.splice(1, 1)
      newPhoneNumber.splice(4, 1)
      newPhoneNumber.splice(4, 1)
      newPhoneNumber.splice(7, 1)
    }
    setPhoneNumber([...newPhoneNumber, number])
  }

  function backspaceCountryCode() {
    const newPhoneNumber = [...phoneNumber]

    const deleteDigit = () => setPhoneNumber(newPhoneNumber)

    const numberExceedsLength = () =>
      newPhoneNumber.length <= 11 &&
      newPhoneNumber.length > 1 &&
      newPhoneNumber.includes('(', ')') === false
    const countryCodeLengthBetween = (max, min) =>
      newPhoneNumber.length <= max &&
      newPhoneNumber.length > min &&
      newPhoneNumber.includes('(', ')')
    const removeLineNumberHyphen = () => {
      newPhoneNumber.splice(11, 1)
      setPhoneNumber(newPhoneNumber)
    }
    const removeExchangeCode = () => {
      newPhoneNumber.splice(8, 1)
      newPhoneNumber.splice(7, 1)
      setPhoneNumber(newPhoneNumber)
    }
    const threeCountryCodeDigitsRemain = () =>
      newPhoneNumber.length <= 7 &&
      newPhoneNumber.length > 1 &&
      newPhoneNumber[5] !== ' '
    const removeLastCountryCodeDigit = () => {
      newPhoneNumber.splice(5, 1, ' ')
      newPhoneNumber.splice(6, 0, ')')
      setPhoneNumber(newPhoneNumber)
    }
    const twoCountryCodeDigitsRemain = () =>
      newPhoneNumber.length <= 7 &&
      newPhoneNumber.length > 1 &&
      newPhoneNumber[4] !== ' '
    const removeSecondCountryCodeDigit = () => {
      newPhoneNumber.splice(4, 1, ' ')
      newPhoneNumber.splice(6, 0, ')')
      setPhoneNumber(newPhoneNumber)
    }
    const oneCountryCodeDigitRemains = () =>
      newPhoneNumber.length <= 6 &&
      newPhoneNumber.length > 1 &&
      newPhoneNumber[3] !== ' '
    const removeFirstCountryCodeDigit = () => setPhoneNumber(['1'])

    newPhoneNumber.pop()

    if (numberExceedsLength()) {
      formatPhoneNumber()
    } else if (countryCodeLengthBetween(16, 13)) {
      deleteDigit()
    } else if (countryCodeLengthBetween(12, 11)) {
      removeLineNumberHyphen()
    } else if (countryCodeLengthBetween(11, 9)) {
      deleteDigit()
    } else if (countryCodeLengthBetween(8, 7)) {
      removeExchangeCode()
    } else if (threeCountryCodeDigitsRemain()) {
      removeLastCountryCodeDigit()
    } else if (twoCountryCodeDigitsRemain()) {
      removeSecondCountryCodeDigit()
    } else if (oneCountryCodeDigitRemains()) {
      removeFirstCountryCodeDigit()
    } else {
      deleteDigit()
    }
  }

  function backspaceAreaCode() {
    const newPhoneNumber = [...phoneNumber]
    const numberExceedsLength = () => newPhoneNumber.length >= 11
    const numberIsInRange = () =>
      newPhoneNumber.length >= 10 &&
      newPhoneNumber.includes('(', ') ', '-') === false
    const appendAreaCodeParenthesis = () => {
      newPhoneNumber.splice(0, 0, '(')
      newPhoneNumber.splice(4, 0, ') ')
      newPhoneNumber.splice(8, 0, '-')

      setPhoneNumber(newPhoneNumber)
    }
    const hasAreaCodeParenthesis = () =>
      newPhoneNumber.length >= 8 && newPhoneNumber.includes('(', ') ', '-')
    const removeAreaCodeParenthesis = () => {
      newPhoneNumber.splice(0, 1)
      newPhoneNumber.splice(3, 1)
      newPhoneNumber.splice(6, 1)
      newPhoneNumber.splice(3, 0, '-')
    }
    const removeHyphen = () => newPhoneNumber.splice(3, 1)

    newPhoneNumber.pop()

    if (numberExceedsLength()) {
      setPhoneNumber(newPhoneNumber)
    } else if (numberIsInRange()) {
      appendAreaCodeParenthesis()
    } else if (hasAreaCodeParenthesis()) {
      removeAreaCodeParenthesis()
      setPhoneNumber(newPhoneNumber)
    } else if (newPhoneNumber.length >= 8 && newPhoneNumber.includes('-')) {
      setPhoneNumber(newPhoneNumber)
    } else if (newPhoneNumber.length === 6 && newPhoneNumber.includes('-')) {
      setPhoneNumber(newPhoneNumber)
    } else if (newPhoneNumber.length === 4 && newPhoneNumber.includes('-')) {
      removeHyphen()
      setPhoneNumber(newPhoneNumber)
    } else {
      setPhoneNumber(newPhoneNumber)
    }
  }

  const phoneNumberLengthExceededFontSize = () => {
    const newPhoneNumber = [...phoneNumber]
    const phoneNumberMaxRange = () =>
      phoneNumber.length < 13 && phoneNumber.includes('(') === false
    const phoneNumberInRange = (min, max) =>
      newPhoneNumber.length <= min &&
      newPhoneNumber.length < max &&
      newPhoneNumber[0] !== '1' &&
      newPhoneNumber.includes('(') === false
    const usPhoneNumberInRange = length =>
      newPhoneNumber.length <= length && newPhoneNumber.includes('(') === false

    if (phoneNumberMaxRange()) {
      return 1.25
    } else if (phoneNumberInRange(14, 15)) {
      return 1.2
    } else if (phoneNumberInRange(15, 16)) {
      return 1.15
    } else if (phoneNumberInRange(16, 17)) {
      return 1.1
    } else if (phoneNumberInRange(17, 18)) {
      return 1.05
    } else if (phoneNumberInRange(18, 19)) {
      return 1
    } else if (usPhoneNumberInRange(14)) {
      return 1.25
    } else if (usPhoneNumberInRange(15)) {
      return 1.2
    } else if (usPhoneNumberInRange(16)) {
      return 1.15
    } else if (usPhoneNumberInRange(17)) {
      return 1.1
    } else if (usPhoneNumberInRange(18)) {
      return 1.05
    }
  }

  // Dev Tools
  const getLength = () => {
    console.log('Length: ' + phoneNumber.length)
    console.log(phoneNumber)
    console.log(phoneNumber.length === 7 && phoneNumber[5] !== ' ')
  }

  return (
    <div className='IOSPhone-container'>
      <div
        className='number-container'
        style={{ fontSize: `${phoneNumberLengthExceededFontSize()}rem` }}
      >
        {phoneNumber}
      </div>
      <div className='button-grid-container'>
        <div className='button-grid'>
          {ButtonValues.map(number => (
            <NumberButton
              key={number}
              value={number}
              onClick={() => {
                dial(number.toString())
              }}
            />
          ))}
          <button className='btn-call'></button>
          {phoneNumber.length > 0 && (
            <button className=' btn-delete' onClick={() => backspace()}>
              x
            </button>
          )}
        </div>
        <button className='btn' onClick={() => getLength()}>
          L
        </button>
      </div>
    </div>
  )
}
