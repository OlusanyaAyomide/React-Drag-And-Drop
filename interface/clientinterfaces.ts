export interface IOrder{
    id:number
    orderId: string;
    firstName: string;
    lastName: string;
    dropIn: string;
    dropOf: string;
    createdAt:string
    drawerId:null | number
}

export interface IDrawer{
    id:number
    day:string
    orders:IOrder[]
}

export interface IInfo{
    all:number
    pending:number
    delivered:number
}
export interface IStoreContext{
   orders:IOrder[]
   drawer:IDrawer[]    
   setOrders:React.Dispatch<React.SetStateAction<IOrder[]>>
   setDrawer:React.Dispatch<React.SetStateAction<IDrawer[]>>
   info:IInfo | null
   setInfo:React.Dispatch<React.SetStateAction<IInfo | null>>
   addToDraw:(data:ImoveTodrawer)=>void
   moveWithinDraw:(data:ImoveWithinDraw)=>void
   removeFromDraw:(data:ImoveTodrawer)=>void
}

export interface ImoveTodrawer{
    orderId:number
    drawerId:number

}
export interface ImoveWithinDraw{
    oldId:number
    newId:number
    orderId:number
}

