import Map from '@/components/AboutPage/Map'
import Advantages from '@/components/LeasingPage/Advantages'
import Banner from '@/components/main/Banner'
import InfoSection from '@/components/main/InfoSection'
import React from 'react'

export default function index() {
    return (
        <main className='!pt-20'>
            <Banner title='Location et financement' backgroundImage='https://placehold.co/1080x600' />
            <InfoSection title={'Équipement de qualité'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus.'}
                img={'https://placehold.co/500x400.png'}
                alt={'DNA'}
                imgOrder={'order-2'}
            />
            <Advantages />
        </main>
    )
}
