import React from 'react'

export default function Banner({ title, override }) {
  const [firstWord, ...rest] = title.split(' ');
  return (
    <div className='section !pt-12 !pb-2 overflow-hidden'>
      <h1 className='md:text-7xl text-5xl font-bold uppercase text-black font-cobe text-center md:text-left rtl:text-right' data-aos='fade-right'>
        {override ? <span>{title}</span> :
          <>
            <span className='block'>{firstWord}</span>
            <span className='block'>{rest.join(' ')}</span>
          </>
        }
      </h1>
    </div>
  )
}

