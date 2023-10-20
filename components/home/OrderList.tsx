import React, { useContext } from 'react'
import { Card } from '../ui/card'
import { Icons } from '@/utils/icons'
import OrderItem from './OrderItem'
import { mockArray } from '../utils/constants'
import AllContext from '@/store/store'
import { useDroppable } from "@dnd-kit/core";

export default function OrderList() {
  const {orders} = useContext(AllContext)
  const {setNodeRef,isOver} = useDroppable({
    id: `order-list`
  });
  return (
   <Card ref={setNodeRef} className={`
   ${isOver?"border-2 border-main":""}
    py-4 px-3 min-w-[300px] min-h-[300px] sm:w-[380px] md:w-[400px] `}>
    <div className='flex mb-6'>
        <span><Icons.move className = "text-xl block  mt-1 text-shade"/></span>
        <h1 className="pl-3 grow text-base sm:text-xl text-center font-medium">Drag to Sort Orders</h1>
    </div>
    {orders.map((item,key)=>(
        <OrderItem key={key} isEnabled={true} {...item}/>
    ))}
    {orders.length === 0 && <div className='h-[320px] grid place-content-center'>
        <h1 className="text-base font-medium">
          No pending orders at the moment
        </h1>
        <h1 className="mt-2 text-center text-xs text-shade">Click on new  order to  create a new order</h1>
      </div>}
   </Card>
  )
}
