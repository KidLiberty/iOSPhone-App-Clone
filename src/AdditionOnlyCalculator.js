import React, { useState, useCallback, useMemo, useRef } from 'react'

export default function AdditionOnlyCalculator() {
  const [first, setFirst] = useState()
  const [second, setSecond] = useState()
  const [current, setCurrent] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [input, setInput] = useState()
  const [names, setNames] = useState()
  const inputRef = useRef()
  const numberArray = useMemo(() => {
    return [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  }, [])

  const Number = props => (
    <button
      className='btn grid-item'
      onClick={() => handleCurrent(props.onClick)}
    >
      {props.value}
    </button>
  )

  const handleCurrent = props => {
    if (toggle === true) {
      setCurrent(props)
      setSecond(props)
      setToggle(false)
    } else {
      setCurrent(props)
    }
  }

  const addition = useCallback(() => {
    if (first === undefined && toggle === false) {
      setToggle(true)
      setFirst(current)
    } else if (second === undefined && toggle === false) {
      setToggle(true)
      setSecond(current)
      setCurrent(first + second)
    } else if (
      first !== undefined &&
      second !== undefined &&
      toggle === false
    ) {
      setToggle(true)
      setSecond(current)
    } else if (toggle === false) {
      setToggle(true)
      setFirst(first + second)
      setSecond(current)
      setCurrent(first + second)
    }
  }, [toggle, current, first, second])

  const equals = () => {
    if (toggle === true) {
      setToggle(false)
      setSecond(first)
      setCurrent(first + first)
      setFirst(first + first)
    } else {
      setToggle(false)
      setCurrent(first + second)
      setFirst(first + second)
    }
  }

  console.log(`First: ${first}`)
  console.log(`Second: ${second}`)
  console.log(current)
  console.log(toggle)

  return (
    <div className='container'>
      <div className='total'>{current}</div>
      <div className='grid'>
        {numberArray.map(number => (
          <Number key={number} value={number} onClick={number} />
        ))}
        <button
          className='btn btn-plus grid-item'
          style={toggle ? { color: 'orange', backgroundColor: 'white' } : null}
          onClick={() => addition()}
        >
          +
        </button>
        <button className='btn btn-equals grid-item' onClick={() => equals()}>
          =
        </button>
        <button
          className='btn btn-AC grid-item'
          onClick={() => {
            setFirst(0)
            setSecond(0)
            setCurrent(0)
            setToggle(false)
          }}
        >
          {current === 0 ? 'AC' : 'C'}
        </button>
      </div>
    </div>
  )
}
