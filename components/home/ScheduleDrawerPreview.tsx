import { IOrder } from '@/interface/clientinterfaces'
import React from 'react'
import { Icons } from '@/utils/icons'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../ui/button';

interface IScheduleDrawerPreview{
    length:number
    position:number
    item:IOrder
    drawId:number
}
export default function ScheduleDrawerPreview({length,position,item,drawId}:IScheduleDrawerPreview) {
    const {attributes, listeners, setNodeRef, transform,isDragging} = useDraggable({
        id:`drawer-${item.id}`,
        data:{
            id:item.id,
            type:"backward",// used to check if item is going in or out of a draw
            oldId:drawId //keeps track  of the id of the parent drawer
        },
    })

    const style = {
        transform:CSS.Translate.toString(transform)
      }

    return (
    <div style={style} {...listeners} {...attributes} ref={setNodeRef}
    className={`w-full sm:w-6/12 py-1 sm:py-4 bg-background
    ${isDragging?"shadow-xl relative rounded-md z-40 border-2":""}
    ${position>1?"max-sm:hidden":""}
    ${(position===0 && length ===1)?"sm:w-full  border-r border-b":""}
    ${(position===2 && length ===3)?"sm:w-full":""}
    ${((position === 0 || position === 1) && length >= 4)?"border-b-0":""} 
    ${((position===0 || position ===2) && length >= 4 )?"border-r-0":""}
    border px-1  `}>
    <div>
        <div className="flex-center px-2 justify-between mb-1">
            <div className="rounded-full mb-[2px] grid place-content-center bg-gray-100  dark:bg-gray-600 shrink-0 h-8 w-8">{item.firstName[0]}{item.lastName[1]}</div>
            <Button size={"icon"} className='hover:bg-main group bg-accent rounded-full'>
                <Icons.move className ="text-shade text-xl group-hover:scale-110 group-hover:text-white"/>
            </Button>
        </div>

        <div className="grow pl-2" >
            <span>{item.firstName} {item.lastName}</span>
        </div>
    </div>
    <div className="flex justify-between text-xs">
            <h1 className='flex flex-wrap'>
                <Icons.location className="ml-1 text-xs"/>
                <span>{item.dropIn}</span>
            </h1>
            <h1 className='flex'>
                <Icons.location className="ml-1 text-xs"/>
                <span>{item.dropOf}</span>
            </h1>
        </div>
</div>
  )
}
