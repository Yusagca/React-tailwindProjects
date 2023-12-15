import React from 'react'

export default function Errormodal({visible}) {
  if(visible==1|| visible==undefined){
    return (
    <div className='fixed inset-0 text-blue-500 bg-white bg-opacity-5 flex justify-center items-center text-center'>
        <div className='fixed h-[180px] w-[330px] bg-white text-center flex flex-col items-center justify-center rounded-md'>
            <span className='font-black p-4'>Error!</span>
            <span className='font-2xl m-3'>Please enter a valid location.</span>
            <button id='okey' className='h-[30px] w-[70px] m-3 bg-blue-500 text-white rounded-md transition ease-in-out delay-150 hover:scale-105'>Okey.</button>
        </div>
    </div>
  )
    }
}
