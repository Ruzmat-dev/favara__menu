import { inctanse } from "./inctanse";

export const getCategory =  async() => {
    try{
        const res = await inctanse.get("/category")
        return res
    }catch(error){
        console.log(error)
    }
}