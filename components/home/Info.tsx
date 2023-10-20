import { cn } from '@/lib/utils'
import { Icons } from '@/utils/icons'
import React from 'react'
export type IconType = typeof Icons.moon
interface IInfo{
    Icon:IconType
    text:string
    value?:number
    className?:string //conditonally apply className


}

export default function Info({Icon,text,value,className}:IInfo) {
  return (
    <div className={cn('w-6/12 py-4 px-2 border-r md:w-3/12 mb-1 h-[120px] flex-col rounded-md hover:relative hover:scale-[102%] overflow-hidden transition-all duration-300 hover:bg-accent',className)}>
      <h1><Icon className = "text-xl text-main mb-2"/></h1>
      <h1 className='text-[15px] opacity-70 mb-1 capitalize'>{text}</h1>
      <h1 className="font-semibold text-2xl md:text-2xl">{value}</h1>
    </div>
  )
}
