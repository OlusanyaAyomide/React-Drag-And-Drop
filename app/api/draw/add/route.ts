import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IAddtoDraw } from "@/interface/serverinterfaces";

//ads a new object to  a drawer
export async function POST(req:Request){
    const {id,drawerId} = await  (req.json()) as IAddtoDraw

    const order = await prisma.orders.update({
        where:{id},
        data:{
            drawerId
        }
    })
    return NextResponse.json(order,{status:200})
}    
