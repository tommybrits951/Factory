import {useState, useEffect, useRef} from 'react'

export default function Timer(props) {
  const {num} = props
  const [timer, setTimer] = useState("00:00:00")
  const timeRef = useRef(null)
  
  function getRemaining(num) {
    const total = num
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60))
    return {total, seconds, minutes, hours}
  }
  function startTimer() {
    let {total, seconds, minutes, hours} = getRemaining(num)
    if (total >= 0) {
      setTimer((hours > 9 ? hours : "0" + hours) + 
      ":" + (minutes > 9 ? minutes : "0" + minutes) + ":"
     + (seconds > 9 ? seconds : "0" + seconds) )
    }
  }

  function clearTimer(num) {
    
    if (timeRef.current) clearInterval(timeRef.current)
      const id = setInterval(() => {
        startTimer(num)
      }, 1000)
      timeRef.current = id
  }

  function getDeadTime() {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 10)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime())
  }, [])
  function clickReset() {
    clearTimer(getDeadTime)
  }
  
  
    return (
    <div>
      <div>{timer}</div>
      
    </div>
  )
}
