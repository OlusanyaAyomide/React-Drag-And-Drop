export interface IOrderCreate{
    // orderId: string;
    firstName: string;
    lastName: string;
    dropIn: string;
    dropOf: string;
}

export interface IAddtoDraw{
    drawerId:number
    id:number 
}

export interface IRemoveDraw{
    id:number
}