'use client'

import { useEffect, useState } from 'react';
import { CarProps } from '@/types'
import { calculateCarRent, generateCarImageUrl, getImageUrls } from '@/utils';
import Image from 'next/image';
import CustomButton from './CustomButton';
import CarDetails from './CarDetails';

interface CarCardProps {
    car: CarProps;
}

const CarCard =  ({ car }: CarCardProps ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const { city_mpg, drive, fuel_type, make, model, transmission, year } = car
    const carRent = calculateCarRent(city_mpg, year)

    useEffect(() => {
        setLoading(true)
        const getUrl = async () => {
            const query = `${make}' '${model}`
            const url = await getImageUrls(query)
            setImageUrl(url[0])     
            setLoading(false)       
        }
        getUrl()

    }, [make])

    
    return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>{make} {model}</h2>
        </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
                $
            </span>
            {carRent}
            <span className='self-end text-[14px] font-semibold'>
                /day
            </span>
        </p>
        <div className='relative w-full md:h-40 h-60 my-3 object-contain'>
            {loading ? (
                <Image src='/loader.svg' alt ='car model' fill priority 
                    className='object contain'
                />
            ) : 
            (
                <Image src={imageUrl} alt ='car model' fill priority 
                    className='object contain'
                />
            )}

        </div>
        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between text-gray'>
                <div className='flex flex-col justify-center item-center gap-2'>
                    <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
                    <p className='text-[14px]'>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                </div>
                <div className='flex flex-col justify-center item-center gap-2'>
                    <Image src='/tire.svg' width={20} height={20} alt='tire' />
                    <p className='text-[14px]'>{drive.toUpperCase()}</p>
                </div>
                <div className='flex flex-col justify-center item-center gap-2'>
                    <Image src='/gas.svg' width={20} height={20} alt='gas' />
                    <p className='text-[14px]'>{city_mpg} MPG</p>
                </div>
            </div>
            <div className='car-card__btn-container'>
                <CustomButton 
                    title='View More'
                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                    rightIcon='/right-arrow.svg'
                    handleClick={() => setIsOpen(true)}
                />
            </div>
        </div> 
        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />       
    </div>
    )
}

export default CarCard