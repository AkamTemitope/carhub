'use client'

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { CarState } from '@/types'
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'


export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([])
  const [loading, setLoading] = useState(false)
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState("2015")
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)
    try {
      const cars = await fetchCars({ 
        manufacturer: manufacturer || "", model: model || "", fuel: fuel || "", 
        year: Number(year), limit: limit })
        
      setAllCars(cars)
      
    } catch (error) {
      console.log(error)      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars()
  }, [manufacturer, model, fuel, year, limit])

  console.log("loading", loading)

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4xl'>Car catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className='home__filter-container'>
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => <CarCard car={car}/>)}
            </div>

            {loading && allCars.length < 1 && (
              <div className='mt-16 w-full flex-center flex'>
                <Image 
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'

                />
              </div>

            )}

            <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) :
        (!loading && allCars.length === 0 && (
          <div className='home__error-container'>
            <h1 className='text-black text-xl'>
              Oops, no results
            </h1>
            <p>{allCars?.message}</p>
          </div>
        ))
        }

      </div>
      
    </main>
  )
}
