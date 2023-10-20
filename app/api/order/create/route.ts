import { IOrderCreate } from "@/interface/serverinterfaces";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

//generate a random string for orderID
function generateRandomID(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';
    for (let i = 0; i < length; i++) {
      randomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomID;
  }

  const randomID = generateRandomID();

  

export async function POST(req:Request){
    const body = await (req.json()) as IOrderCreate

    const orderId  = generateRandomID()
    const neworder = await prisma.orders.create({
        data:{...body,orderId}
    })

    return NextResponse.json(neworder,{status:200}) 
}

