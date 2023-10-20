'use client'
import React, { useCallback, useContext, useEffect } from 'react'
import Statistic from './Statistic'
import OrderSort from './OrderSort'
import { IDrawer, IInfo, IOrder } from '@/interface/clientinterfaces'
import AllContext from '@/store/store'

interface IMain{
  orders:IOrder[]
  drawers:IDrawer[]
  info:IInfo
}

export default function Main({orders,drawers,info}:IMain) {
  const {setOrders,setDrawer,setInfo} = useContext(AllContext)

    //data gotten from SSR is set into global state
    useEffect(()=>{
      setOrders(orders)
      setDrawer(drawers)
      setInfo(info)
    },[])

  return (
    <div className='mx-auto  max-w-[1100px] overflow-hidden mt-4 paddingx'>
        <Statistic/>
        <OrderSort/>
    </div>
  )
}
