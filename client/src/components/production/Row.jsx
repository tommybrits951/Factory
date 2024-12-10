import { useEffect, useRef, useState } from 'react'

export default function Row({ machine }) {
  const [timer, setTimer] = useState()
  const timerRef = useRef(null)
  


  return (
    <div className='row'>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.number}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.priority}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.job}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.partName}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.partNumber}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.material}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.lot}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.amount}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.time}
        </div>
      </div>
      <div className='border-2 border-stone-900 text-center cellDiv'>
        <div className='cell'>
          {machine.status}
        </div>
      </div>
    </div>
  )
}
