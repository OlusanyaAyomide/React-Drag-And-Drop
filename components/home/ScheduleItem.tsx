import React from 'react'
import OrderDrawer from './OrderDrawer';
import { IDrawer } from '@/interface/clientinterfaces';
import { formatDate } from '@/lib/utils';
import ScheduleDrawerPreview from './ScheduleDrawerPreview';
import { useDroppable } from "@dnd-kit/core";

export default function ScheduleItem(schedule:IDrawer) {
    const {setNodeRef,isOver,over} = useDroppable({
        id: `drawer-${schedule.id}`,
        data:{
            id:schedule.id,
            type:"rotate"//item can switch draer position or retrun back to untracked
        }
      });

    return (
    <div className={`relative ${isOver?"scale-[106%] border-[2px] border-main":""} pb-2 pt-2 px-3 bg-background  full-shadow mb-8 rounded-md border transition-all duration-300`} ref={setNodeRef}>
        <h1 className="text-xs text-shade mb-6">
            Drag an item to remove from drawer
        </h1>
        <h1 className="text-shade text-xs">Orders for</h1>
        <h1 className='text-base sm:text-xl md:text-2xl font-semibold'>{formatDate(schedule.day)}</h1>
        <h1 className="text-shade">{schedule.orders.length} items</h1>
        <div className="flex flex-wrap mt-2">
            {schedule.orders.map((item,key)=>{
                if(key>3){return null}
                return(
                    <ScheduleDrawerPreview 
                        item={item} key={key}
                        position={key}
                        length={schedule.orders.length}
                        drawId={schedule.id}
                />
            )})} 
        </div>
        {schedule.orders.length > 0? <OrderDrawer day={schedule.day} orders={schedule.orders}/>:
            <div className='mt-3 py-2'>
                <span>No entry added for this day yet</span>
            </div>
        }
    </div>
  )
}
