import React, { useEffect, useState } from 'react'
import Navbar from "../pages/navbar"
import { useNavigate } from 'react-router-dom'
import { BsArrowLeftShort } from 'react-icons/bs'
import {FcCancel, FcDeleteDatabase, FcFullTrash, FcSurvey} from "react-icons/fc"

const wishlist = () => {
  const [foods, setFoods] = useState([])
  const [toggle, setToggle] = useState(false)

  const navtigate = useNavigate()
  useEffect(() => {
    try {
      const data_string = localStorage.getItem("washlist")
      const data_array = JSON.parse(data_string)
      setFoods(data_array)
    } catch (error) {
      console.log(error)
    }
  }, [toggle])

  const handleRemove = (id) => {
    try {
      const items_strings = localStorage.getItem("washlist")
      if (!items_strings) return "nullddd"
      const items_array = JSON.parse(items_strings)
      const new_array = items_array.filter((item) => item.id !== id)
      localStorage.setItem("washlist", JSON.stringify(new_array))
      setToggle(prev => !prev)
    } catch (error) {
      console.log(error)
    }

  }

  const Back = () => {
    navtigate("/")
  }
  console.log(foods);
  return (
    <div className='container mx-auto px-4 my-50'>
        <Navbar/>
       
                <div className="w-full">
                <div className="px-2 w-full flex flex-row justify-between items-center">
                  <button className='items-center justify-around px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none flex border flex-row w-32' onClick={Back}> <BsArrowLeftShort/> <span>MENU</span> </button>
               
                  <div className='flex items-center gap-2'> <span>Sevimlilar ro'yxati</span> <FcSurvey/> </div>
                </div>
                
                <div className="overflow-y-scroll h-[70vh] py-2 px-2 xl:pl-0 xl:pr-4">
                  <div className="flex justify-evenly gap-x-3 flex-wrap">
                  {foods ?  foods.map((item) => (
                    <div className="border rounded-md my-1.5  flex justify-between items-center">
                      <div className="flex flex-row justify-stretch w-full items-center text-left py-2">
                        <div className="max-h-20 max-w-20 rounded-full cursor-pointer flex justify-center items-center ml-1 border">
                          <img src={item.image} alt=""  className='rounded-full transition-all duration-150 hover:scale-125 active:scale-75 w-16 h-16'/>
                        </div>
                        <div className="px-2">
                          <div className="">
                            <p className='truncate w-56'>{item.title}</p>
                            <p className='text-md font-normal'>{item.summa}</p>
                          </div>
                          <div className="text-xs">
                            <p className='truncate w-48 xl:96'>
                            {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleRemove(item.id)} className='mr-4 inline-flex items-center justify-center w-auto px-1 py-1 overflow-hidden font-bold text-gray-500 transition-all duration-500 border border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white'>
                        <FcFullTrash/>
                      </button>
                    </div>
                     )) : 
                     <>
                     <div className="flex justify-evenly gap-x-3 flex-wrap">
                      <div className="mt-20">
                        <div className="w-full flex justify-center items-center py-3">
                          <FcDeleteDatabase className='' width="1rem" hanging="1rem"/>
                        </div>
                        <div className="text-gray-400">Sevimlilar ro'yxati bosh <FcCancel/></div>
                      </div>
                     </div>
                     </>}
                  </div>
                  
                </div>
      
              </div>
        
      
    </div>
  )
}

export default wishlist