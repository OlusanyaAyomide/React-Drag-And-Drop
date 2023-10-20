'use client'
import React from 'react'
import { Drawer } from "vaul";
import { Icons } from '@/utils/icons';
import OrderItem from './OrderItem';
import { IOrder } from '@/interface/clientinterfaces';
import { formatDate } from '@/lib/utils';


export default function OrderDrawer({orders,day}:{orders:IOrder[],day:string}) {
 
  return (
    <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
        <div className='absolute cursor-pointer hover:shadow-sm overflow-hidden group transition-all duration-500 hover:bg-[#1977F2]/50 bottom-0 group h-12 left-0 border-t border-main backdrop-blur-sm bg-background/40  w-full grid place-content-center '>
           <h1 className="text-center flex transition-all duration-300 group-hover:text-white">
            <span>Open All in Drawer</span>
            <span className="ml-1">
                <Icons.arrowUp className = "text-main text-xl transition-all group-hover:translate-x-10 duration-100 group-hover:scale-150 group-hover:text-white"/>
            </span>
           </h1>
        </div>
        </Drawer.Trigger>
        <Drawer.Portal>
        <Drawer.Overlay  className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="backdrop-blur-md  z-50  rounded-t-[10px] h-[96%] mt-20 fixed  bottom-0 left-0 right-0 ">
            <div className="max-w-[700px] overflow-scroll rounded-md default-scroll mx-auto bg-background h-full">
                <Drawer.Close className='block mx-auto'>
                  <div className='ml-auto block mb-2 rounded-full p-1 hover:bg-accent'>
                    <Icons.close className = "text-2xl "/>
                  </div>
                </Drawer.Close>
                <h1 className="text-center">Orders Scheduled for</h1>
                <h1 className="text-center font-semibold mt-1 mb-4 text-2xl sm:text-3xl">{formatDate(day)}</h1>
                <div className="flex rounded-md px-2  flex-wrap mt-2  bg-background mx-auto">
                    {orders.map((item,key)=>(
                        <div className='w-full sm:w-6/12 px-2' key={key}>
                            <OrderItem isEnabled={false} key={key} {...item}/>
                        </div>
                    ))}
                </div>
            </div>
            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>
      )
    }
