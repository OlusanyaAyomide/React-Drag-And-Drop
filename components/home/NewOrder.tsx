'use client'

import { useFormik } from 'formik'
import React,{useContext} from 'react'
import { IOrderCreate } from '@/interface/serverinterfaces'
import { validateNewOrder as validate } from '@/lib/utils'
import InputField from './InputField'
import { Button } from '../ui/button'
import { usePostRequest } from '@/hooks/usePostRequest'
import AllContext from '@/store/store'

export default function NewOrder() {
  const initialValues ={
    firstName:"",
  lastName:"",
  dropIn:"",
  dropOf:""
  }

  const {setOrders,setInfo} = useContext(AllContext)

  const {isLoading,mutate} = usePostRequest({successText:"New order has been added",
  //data returned is added to state 

  onSuccess:(data)=>{
    //new order created is added to state
    setOrders((prev=>[data,...prev]))

    //pending orders is increased by 1
    setInfo((prev)=>{
      if(prev){
        return {...prev,pending:prev?.pending+1,all:prev.all + 1}
      }else{return prev}
    })

    formik.resetForm()
  }})

  const formik = useFormik<IOrderCreate>({
    initialValues,validateOnChange:false,validateOnBlur:true,
    validate,
    onSubmit:(data)=>{
      mutate({url:"/api/order/create",body:data})
    }
  })
  return (
    <div className='px-2'>
      <h1 className="font-medium text-center text-base">Create New order</h1>
      <form className='mt-3 mb-6' onSubmit={formik.handleSubmit}>
        <InputField
          name='firstName'
          text='Client first Name'
          error={formik.touched.firstName?formik.errors.firstName:""}
          value={formik.values.firstName}
          placeholder='Johnson'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          name='lastName'
          text='Client lastName'
          error={formik.touched.lastName?formik.errors.lastName:""}
          value={formik.values.lastName}
          placeholder='Doris'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          name='dropIn'
          text='Drop in location'
          error={formik.touched.dropIn?formik.errors.dropIn:""}
          value={formik.values.dropIn}
          placeholder='7,grace street,lagos'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          name='dropOf'
          text='Drop off location'
          error={formik.touched.dropOf?formik.errors.dropOf:""}
          value={formik.values.dropOf}
          placeholder='1,Allen avenue, ikeja'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button disabled={isLoading} className='bg-main w-full hover:bg-blue-500 flex items-center justify-center text-white'>
          {!isLoading?<span>Submit</span>:<span className='border-2 h-4 w-4 rounded-full animate-spin border-white border-t-transparent'>
            </span>}
        </Button>
      </form>
    </div>
  )
}
