import React, { useContext } from 'react'
import Info from './Info'
import { Icons } from '@/utils/icons'
import AllContext from '@/store/store'

export default function Statistic() {
  const {orders,info,drawer} = useContext(AllContext)
  return (
    <div>
        <h1 className="text-2xl font-semibold  mt-8 mb-5">Welcome Admin </h1>
        <div className="border-t shadow-md dark:border-b py-1 bg-background flex flex-wrap">
            <Info text='Total Entry' value={info?.all} Icon={Icons.sum}/>

            {/* total orderrs on the right side */}
            <Info text='Untracked orders' value={info?.pending}  className='max-md:border-r-0' Icon={Icons.untracked}/>

            {/* total orders delivered */}
            <Info text='Total set for delivery' value={info?.delivered} Icon={Icons.delivery}/>

            {/* recent keeps track of all orders added today */}
            <Info text='To be delivered today' value={drawer[0]?.orders.length} className='border-r-0' Icon={Icons.today}/>
        </div>
    </div>
  )
}
