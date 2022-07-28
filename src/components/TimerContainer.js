import React from 'react'

function TimerContainer(props) {
  return (
    <>
        <div className='flex flex-row justify-evenly w-4/6   mx-auto'>
          <div className='flex flex-col'>
            <h2 id={props.labelid} className=' font-bold text-3xl mt-6 hover:text-slate-800'>{props.title}</h2>
            <div className='flex flex-row justify-around'>
              <button id={props.decid} ><i className='fa-solid fa-arrow-down hover:text-slate-500 text-xl' onClick={props.handleDec}></i></button>
              <p id={props.idlength} className='font-semibold text-xl'>{props.count}</p>
              <button id={props.incid}><i  className='fa-solid fa-arrow-up hover:text-slate-500 text-xl' onClick={props.handleInc}></i></button>
            </div>
          </div>
        </div>
    </>
  )
}

export default TimerContainer