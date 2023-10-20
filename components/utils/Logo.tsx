import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='h-[50px] relative w-[120px] flex items-center font-semibold text-lg'>
      <Image src={'/OMS.png'} alt='' fill className='object-contain h-full w-full'/>
    </div>
  )
}
