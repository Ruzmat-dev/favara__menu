import { inctanse } from "./inctanse";

export const getCategory =  async() => {
    try{
        const res = await inctanse.get("/category")
        return res
    }catch(error){
        console.log(error)
    }
}

export const getProducts = async (category = "") => {
    try{
        const data = await inctanse.get(`/sections/?category=${category}`)
        return data
    }catch(error) {
        console.log(error);
    }
}


export const getPaginations = async (item = "" ) => {
    try {
        const el = await inctanse.get(`/sections/?category=&page=${item}`)
        return el
    }catch (error) {
        console.log(error);
    }
}

export const getSearch = async( el = "") => {
    try {
        const item = await inctanse.get(`/sections/?search=${el}`)
        return  item
    } catch (error){
        console.log(error);
    }
}

export const byPrice = async ( el = "" ) => {
    try {
        const price = await inctanse.get(`sections/?search=favvora&ordering=${el}`)
        return price
    } catch(error) {
        console.log(error);
    }
}