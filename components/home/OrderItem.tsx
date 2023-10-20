import { Icons } from '@/utils/icons'
import React from 'react'
import { Button } from '../ui/button'
import { IOrder } from '@/interface/clientinterfaces'
import { formatDate } from '@/lib/utils'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

interface IOrderItems extends IOrder{
    isEnabled:boolean
}
export default function OrderItem(item:IOrderItems) {
    // a draggable for moving items and firing several events in the process
    const {attributes, listeners, setNodeRef, transform,isDragging} = useDraggable({
        id:`sort-${item.id}`,
        data:{
            id:item.id,
            type:"forward"// used to check if item is going in or out of a draw
        },
        disabled:!item.isEnabled
    })
    const style = {
        transform:CSS.Translate.toString(transform)
      }

    return (
    <div style={style} {...listeners} {...attributes} ref={setNodeRef} className={`w-full  bg-card  full-shadow ${item.isEnabled?"mb-10 py-2":"py-6 mb-8"} border-t rounded-md shadow-md px-2 ${isDragging?"shadow-xl relative z-40 border-2 bg-black/20 dark:bg-white/20 backdrop-blur-md scale-[50%]" :""}`}>
        <div className="flex justify-between">
            <span  className='font-medium text-[13px]'>OrderId {item.orderId}</span>
            <h1 className='flex whitespace-nowrap text-shade text-xs'>
                <Icons.today className= "text-base text-main mr-1"/>
                <span>{formatDate(item.createdAt)}</span>
            </h1>
        </div>
        <div className="flex">
                <div className='rounded-full shrink-0 h-10 w-10  bg-gray-100 dark:bg-gray-600 grid place-content-center'>
                    <span className='text-base font-medium'>{item.firstName[0]}{item.lastName[0]}</span>
                </div>
                <div className='grow pl-1'>
                    <h1 className='mb-[2px] font-medium text-lg'>{item.firstName} {item.lastName}</h1>
                    <h1 className='text-xs text-shade flex whitespace-nowrap'>
                        <span className='text-shade opacity-60'>{<Icons.location className ="text-shade opacity-75 text-[13px]"/>}</span>
                        <span className='mx-1'>pick up</span>
                        <span>{item.dropIn}</span>
                    </h1>
                    <h1 className='text-xs text-shade flex whitespace-nowrap'>
                        <span className='text-shade  opacity-60'>{<Icons.location className ="text-shade opacity-75 text-[13px]"/>}</span>
                        <span className='mx-1 '>drop off</span>
                        <span>{item.dropOf}</span>
                    </h1>
                </div>
            </div>
            {item.isEnabled &&  <Button className='bg-main-accent hover:bg-main hover:text-white text-foreground block my-4 w-full text-white'>
                {isDragging?"Drop into a drawer":"Hold to drop off"}
            </Button>}
    </div>
  )
}
