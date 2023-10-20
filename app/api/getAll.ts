import prisma from "@/prisma/client";

//this function checks if any day between now annd the next seven days is missing, if it is the day is created before getting all the daes between now and the next seven days
async function createMissingDrawerDate(){
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      // Extract the date portion from the current date (without time)
      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
  
      const existingDrawer = await prisma.drawer.findFirst({
        where: {
          day: currentDateOnly,
        },
      });
  
      if (!existingDrawer) {
        // If a Drawer  with the specified date doesn't exist for the current date, is is been inserted
        await prisma.drawer.create({
          data: {
            day: currentDateOnly,
          },
        });
  
        console.log(`Drawer for ${currentDateOnly.toDateString()} inserted.`);
      }
    }
}

export default async function getAllOrders(){
    const allDates = prisma.drawer.findMany()
    await createMissingDrawerDate()
    //get orders that have not been allocated to any drawer
    const orders = await prisma.orders.findMany({
        where:{
            drawerId:null
        }
    })
    const date = new Date()

    const oneWeekFromToday = new Date(date);

    
    oneWeekFromToday.setDate(date.getDate() + 7)

    //get only dates between now and a week from today
    const drawers = await prisma.drawer.findMany({
        where:{
            day:{
                gte:date,   
                lte:oneWeekFromToday 
            }
        },
        include:{
            orders:true
        }
    })
    const all = (await prisma.orders.findMany()).length
    const pending = (await prisma.orders.findMany({
      where:{
        drawerId:null
      }
    })).length
    const delivered = all - pending
    return {orders,drawers,info:{all,pending,delivered}}

}