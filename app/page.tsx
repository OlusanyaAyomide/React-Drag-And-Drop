import Main from '@/components/home/Main'
import React,{Suspense} from 'react'
import getAllOrders from './api/getAll'
import { IDrawer, IOrder,IInfo } from '@/interface/clientinterfaces'



export default async function Home() {
  const getData = async ()=>{
    const {drawers,orders,info} = await getAllOrders() as {drawers:unknown,orders:unknown,info:unknown}
    return {drawers:drawers as IDrawer[],orders:orders as IOrder[],info:info as IInfo}
  }
    const {drawers,orders,info} = await getData()

  return (
    <Suspense fallback={<p className='b'>Loading</p>}>
        <Main drawers={drawers} orders={orders} info ={info}/>
    </Suspense>

  )
}

