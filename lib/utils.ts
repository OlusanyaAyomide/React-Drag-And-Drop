import { IOrderCreate } from "@/interface/serverinterfaces";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export function formatDate(inputDate: string): string {

//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const date = new Date(inputDate);

//   if (isNaN(date.getTime())) {
//     // Handle invalid input date
//     return "Invalid Date";
//   }

//   const day = date.getDate();
//   const month = months[date.getMonth()];
//   const year = date.getFullYear();
//   return `${day}, ${month}, ${year}`;
// }

export function formatDate(inputDate:string) {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    // Handle invalid input date
    return "Invalid Date";
  }

  // Calculate the GMT offset in minutes
  const gmtOffset = -date.getTimezoneOffset();
  
  // Create a string representing the GMT offset
  const gmtOffsetString = gmtOffset >= 0 ? `+${gmtOffset}` : `-${Math.abs(gmtOffset)}`;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${day}, ${month}, ${year} `;
}


//check if all values prestnt in an object are all empty
export function areAllValuesEmpty(obj:any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "object" && !Array.isArray(value)) {
        // Recursive call for nested objects
        if (!areAllValuesEmpty(value)) {
          return false;
        }
      } else if (Array.isArray(value)) {
        // Check each element in the array
        for (const element of value) {
          if (typeof element === "object" && !areAllValuesEmpty(element)) {
            return false;
          } else if (typeof element !== "object" && element !== "") {
            return false;
          }
        }
      } else if (value !== "") {
        return false;
      }
    }
  }
  return true;
}

//custom validator function to validate new form
export const validateNewOrder = (data:IOrderCreate)=>{
  const errors = {} as IOrderCreate
  errors.firstName = data.firstName?"":"FirstName is required"
  errors.lastName = data.lastName?"":"LastName is required"
  errors.dropIn = data.dropIn?"":"Dropnin location is required",
  errors.dropOf = data.dropOf?"":"Drop off locstion is required"
  //if an error is present the onSubmit is not triggered
  if (!areAllValuesEmpty(errors)){
    return errors
  }
}