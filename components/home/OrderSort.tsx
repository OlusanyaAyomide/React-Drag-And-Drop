import React, { useContext } from 'react'
import OrderList from './OrderList'
import OrderSchedule from './OrderSchedule'
import { DndContext ,DragEndEvent} from '@dnd-kit/core'
import AllContext from '@/store/store'
import { usePostRequest } from '@/hooks/usePostRequest'

export default function OrderSort() {
  const {addToDraw,moveWithinDraw,removeFromDraw} = useContext(AllContext)
  const {mutate} = usePostRequest({successText:"Action completed succesfully"})

  const handleDragEnd = (e:DragEndEvent)=>{
    const current = e.active.data.current

    //if forward keyword is in the event argument the order is moved to scheduled item
    if(current?.type === "forward"){
      const drawerId = e.over?.data.current?.id
      addToDraw({drawerId:Number(drawerId),orderId:Number(current.id)})
      mutate({url:"/api/draw/add",body:{id:current.id,drawerId:drawerId}})
    }
    //if type keyword is backward and we are not dropping on order list, this means the order is being rotated within drawer 
    if((current?.type === "backward") && (e.over?.id !== 'order-list')){

      const oldId = current?.oldId
      const newId = e.over?.data?.current?.id
      const orderId = current.id
      moveWithinDraw({
        orderId:Number(orderId),
        oldId:Number(oldId),
        newId:Number(newId)
      })
      if(newId !== oldId){
        mutate({url:"/api/draw/add",body:{id:current.id,drawerId:newId}})
      }
    }
    //if type keyword is  backward and we are dropping on the orderlist items are moved back into an untracked state
    if((current?.type === "backward") && (e.over?.id === 'order-list')){
      const drawerId = current?.oldId
      const orderId = current?.id
      removeFromDraw({
        drawerId:Number(drawerId),
        orderId:Number(orderId)
      })
      mutate({url:"/api/draw/remove",body:{id:orderId}})
    } 
  }

  return (
    <div className='mt-10  flex overflow-scroll px-2  default-scroll-x my-3 pb-1'>
        <div className='flex justify-between w-[1100px]'>
          {/* a wrapper context to enable drag and drop between both columns */}
          <DndContext 
              onDragEnd={handleDragEnd}
            >
            <OrderList/>
            <OrderSchedule/>
          </DndContext>
        </div>
 
    </div>
  )
}
