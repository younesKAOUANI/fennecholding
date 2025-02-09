import React from 'react'
import { FaCheck } from "react-icons/fa";
const advantages = [
  { id: 1, title: 'No initial investment', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed' },
  { id: 2, title: 'No maintenance costs', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed' },
  { id: 3, title: 'Flexibility', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed' },
  { id: 4, title: 'Tax benefits', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed' },
];
export default function Advantages() {
  return (
    <section style={{ backgroundImage: "url(texture.png)" }} className='bg-no-repeat bg-cover bg-center text-white'>
      <div className='section'>
        <h2 className='font-semibold text-4xl text-left' data-aos="fade-down">Advantages</h2>
        <p className='mt-4 text-xl text-justify' data-aos="fade-in">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed</p>
        <div className='grid md:grid-cols-2 gap-y-4 gap-x-8 py-4'>
          {advantages.map(({ id, title, description }) => (
            <div key={id} className=" flex  gap-2 items-center" data-aos="fade-up" data-aos-delay={id * 200}>
              <FaCheck className='text-primary text-2xl mb-2' />
              <h3 className="text-xl font-medium mb-2">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
