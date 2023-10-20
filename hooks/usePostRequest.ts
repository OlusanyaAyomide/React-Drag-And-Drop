import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

interface IusePostRequest{
    successText?:string
    onSuccess?:(data:any)=>void
}

export  function usePostRequest({successText,onSuccess}:IusePostRequest){
    const [isLoading,setIsloading] = useState(false)
    const mutate =async ({body,url}:{body:any,url:string})=>{
        setIsloading(true)
        //using nextjs fetch APi with more advanced functionality than the conventional fetch 
        try{
            const res =await  fetch(url,{
                method:"POST",
                body:JSON.stringify(body)
            })
            const data  = await res.json()
            if(successText){
                toast({
                    duration:4000,
                    description:successText,
                    className:`border-green-500/50 border fixed top-2 whitespace-nowrap font-medium backdrop-blur-sm py-3 max-w-[350px] bg-transparent`
                })
            }
            // an Onsuccess callback where the fetched data is passed
            if(onSuccess){
                onSuccess(data)
            }
        }
        catch(err){
            toast({
                duration:4000,
                description:"Action could not be completed",
                className:`border-red-500/50 border fixed top-2 whitespace-nowrap font-medium backdrop-blur-sm py-3 max-w-[350px] bg-transparent`
            })
        }
        finally{
            setIsloading(false)
        }

    }
    return {mutate,isLoading}
}   