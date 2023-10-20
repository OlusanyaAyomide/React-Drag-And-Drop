import { IAddtoDraw, IRemoveDraw } from "@/interface/serverinterfaces";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

//removes an order from the drawer
export async function POST(req:Request){
    const {id} = await (req.json()) as IRemoveDraw
    const order = await prisma.orders.update({
        where:{
            id
        },
        data:{
            drawer:{
                disconnect:true
            }
        }
    })
    return NextResponse.json(order,{status:200})
}