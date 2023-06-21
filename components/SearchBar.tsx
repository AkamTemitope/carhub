'use client'

import { useState } from 'react'
import SearchManufacturer from './SearchManufacturer'
import Image from 'next/image'
import { searchBarProps } from '@/types'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`ml-3 z-10  ${otherClasses}`}>
        <Image
            src='/magnifying-glass.svg'
            alt='magnifying glass'
            width={40} 
            height={40}
            className='object-contain'
        />
    </button>
)

const SearchBar = ({ setManufacturer, setModel } : searchBarProps ) => {
    const [searchManufacturer, setSearchManufacturer] = useState('')
    const [searchModel, setSearchModel] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (searchManufacturer === ''){
            alert("Please fill in the search bar")

        }
        setModel(searchModel)
        setManufacturer(searchManufacturer)
    }

    return (
        <form id='search' className='searchbar' onSubmit={handleSubmit}>
            <div className='searchbar__item'>
                <SearchManufacturer 
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <div className='searchbar__item'>
                <Image 
                    src='/model-icon.png'
                    alt='car searchModel'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                />
                <input 
                    type='text'
                    name='searchModel'
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                    placeholder='corolla'
                    className='searchbar__input'
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <SearchButton otherClasses='max-sm:hidden' />
        </form>
    )
}

export default SearchBar