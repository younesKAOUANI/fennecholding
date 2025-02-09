import React from 'react'

export default function Title({ title, children }) {
    return (
        <div className='bg-white p-4 shadow-md flex justify-between items-center mb-6 rounded-md'>
            <h1 className='font-bold text-3xl'>{title} </h1>
            {children}
        </div>
    )
}
