import React from 'react'
import Logo from '../utils/Logo'
import SwitchTheme from '../utils/SwitchTheme'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Icons } from '@/utils/icons'
import NewOrder from '../home/NewOrder'

export default function Header() {
  return (
    <div className='shadow-sm border-b z-30 bg-background py-1 justify-between   paddingx fixed top-0 left-0 w-full flex-center'>
        <Logo/>
        <div className="grow  grid place-content-center font-semibold text-lg mx-2 max-md:hidden">
            <span>Order Management System</span>
        </div>
        <div className="flex-center">
            <SwitchTheme/>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <Button className='bg-main whitespace-nowrap px-6 text-white'>
                            <span>Add New</span>
                            <span className='max-sm:hidden ml-1'>Order</span>
                            <span className='text-lg ml-2'>
                                <Icons.plus/>
                            </span>
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <div className='px-2 py-2'>
                        <NewOrder/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    </div>
  )
}
