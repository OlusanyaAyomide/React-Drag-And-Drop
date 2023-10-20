import { NextResponse } from "next/server";
import getAllOrders from "../getAll";



export async function GET(req:Request){
    const data = await getAllOrders()
    return NextResponse.json(data,{status:200})
}