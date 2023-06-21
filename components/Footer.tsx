import Image from 'next/image'
import React from 'react'
import { footerLinks } from '@/constants'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5 vorder-t border-gray-100'>
      <div className='flex max-md:flex-col flex-wrap justify-between jap-5 sm:px-16 px-6 py-10'>
        <div className='flex flex-col justify-start items-start gap-6'>
          <Image src='/logo.svg' alt='logo'
            width={120} height={20}
            className='object-contain'
          />
          <p className='text-base text-gray-700'> CarHub 2023 <br />
            All rights reserved &copy;
          </p>

        </div>
        <div className='footer__links'>
          {footerLinks.map((link) => (
            <div key={link.title} className='footer__link'>
              <h3 className='font-bold'>{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} href={item.url}>
                  {item.title}
                </ Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between items-center flex-wrap mt-10 border-t corder-gray-200 sm:px-16 px-6 py-10 '>
        <p>@2023 CarHub. All Rights Reserved</p>
        <div className='footer__copyrights-link'>
          <Link href='/'>Privacy Policy</Link>
          <Link href='/'>Terms of use</Link>

        </div>

      </div>


      
      
    </footer>
  )
}

export default Footer