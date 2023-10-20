import { IDrawer, IInfo, IOrder, IStoreContext, ImoveTodrawer, ImoveWithinDraw } from "@/interface/clientinterfaces"
import { createContext,useState } from "react"


const AllContext = createContext<IStoreContext >({} as IStoreContext)


export const AllContextProvider = ({children}:{children:React.ReactNode})=>{
    const [orders,setOrders] = useState<IOrder[]>([])    
    const [drawer,setDrawer] = useState<IDrawer[]>([])
    const [info,setInfo]  = useState<IInfo | null>(null)

    //moves an item from order to a drawer
    const addToDraw=({orderId,drawerId}:ImoveTodrawer)=>{

        if((isNaN(orderId))|| isNaN(drawerId)){return}
        const newOrder:IOrder[]=[]
        let oldOrder:IOrder | null
        orders.map((item)=>{
            if (item.id !== orderId){
                newOrder.push(item)
            }else{
                oldOrder = item
            }
        })
        const newDrawer:IDrawer[]=[]
        drawer.map((item)=>{
            if(item.id !== drawerId){
                newDrawer.push(item)
            }else if(oldOrder){
                newDrawer.push({
                    ...item,orders:[
                        oldOrder,...item.orders
                    ]
                })
            }
        })
        setOrders(newOrder)
        setDrawer(newDrawer)
        setInfo((prev=>{
            if(prev){
                return ({...prev,delivered:prev.delivered+1,pending:prev.pending-1})
            }else return null
        }))
    }

    const moveWithinDraw = ({oldId,newId,orderId}:ImoveWithinDraw)=>{

        if(isNaN(oldId) || isNaN(newId) || isNaN(orderId)){return}
        if(oldId === newId){return}
        const order = orders.find((obj=>obj.id === orderId))
        const oldDrawer = drawer.find((obj=>obj.id === oldId))

        const removdDrawerorder:IOrder[]=[]
        let removedOrder:IOrder | null = null 

        //remove order from drawer order 
        oldDrawer?.orders.map((item)=>{
            if(item.id !== orderId){
                removdDrawerorder.push(item)
            }else{
                removedOrder = item
            }
        })

        const newDrawer:IDrawer[] =[]
        //set drawer to an updated value
        drawer.map((item)=>{
            if(item.id === oldId){
                newDrawer.push({...item,
                    orders:removdDrawerorder
                })
            }else if((item.id === newId) && removedOrder){
                newDrawer.push({...item,
                orders:[removedOrder,...item.orders]
            })
            }
            else{
                newDrawer.push(item)
            }
        })
        setDrawer(newDrawer)
    }

    const removeFromDraw=({orderId,drawerId}:ImoveTodrawer)=>{

        if((isNaN(orderId)) || (isNaN(drawerId))){return}
        const oldDrawer = drawer.find((obj=>obj.id === drawerId))

        const updatedOrder:IOrder[] = []
        let removedOrder:IOrder = {} as IOrder
        
        oldDrawer?.orders.map((item)=>{
            if(item.id !== orderId){
                updatedOrder.push(item)
            }else{
                removedOrder = item
            }
        })

        const updatedDrawer :IDrawer[]= []
        drawer.map((item)=>{
            if(item.id !== drawerId){updatedDrawer.push(item)}
            else{
                updatedDrawer.push({
                    ...item,orders:updatedOrder
                })
            }
        })
        setDrawer(updatedDrawer)
        if(removedOrder){
            setOrders((prev=>{return [removedOrder,...prev]}))
        }
        setInfo((prev=>{
            if(prev){
                return ({...prev,delivered:prev.delivered-1,pending:prev.pending+1})
            }else return null
        }))

    }



    const context ={orders,setOrders,drawer,setDrawer,addToDraw,info,setInfo,moveWithinDraw,removeFromDraw
    }
  return <AllContext.Provider value={context}>{children}</AllContext.Provider>
  
}

export default AllContext

