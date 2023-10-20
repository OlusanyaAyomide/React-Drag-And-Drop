import React, { useContext } from 'react'
import { Icons } from '@/utils/icons'
import ScheduleItem from './ScheduleItem'
import { mockDates } from '../utils/constants'
import AllContext from '@/store/store'

export default function OrderSchedule() {
  const {drawer} = useContext(AllContext)
  return (
    <div className='py-4 w-[310px] max-lg:ml-20 sm:w-[380px] md:w-[400px]'>
        <div className='flex mb-6'>
            <h1 className="pl-3 grow text-base sm:text-xl text-center justify-center font-medium flex ">
              <span><Icons.glass className = "text-base block mt-1  text-shade"/></span>
              <span>Drop to sort orders</span>
            </h1>
         </div>
         {drawer.map((item,key)=>(
            <ScheduleItem {...item} key={key}/>
         ))}
    </div>
  )
}
