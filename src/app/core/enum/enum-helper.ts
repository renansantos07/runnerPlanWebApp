export class EnumHelper {    
    public static GetDescription(e: any, id: number): string {        
           return e[e[id].toString() + "Description"];    
   }
}