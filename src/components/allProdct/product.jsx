import React, { useEffect, useState } from 'react'
import { BsHeart , BsX, BsXLg } from "react-icons/bs"

const product = ({ el, setIsChange, isChange }) => {

    const [chekModal , setChekModal] = useState(false)

  const heandleClik = (el) => {
    let foods_string = localStorage.getItem("washlist")
    if (!foods_string) {
      try {
        const washlist = [el]
        localStorage.setItem("washlist", JSON.stringify(washlist))
        setIsChange(prev => !prev)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        let foods_array = JSON.parse(foods_string)
        const foodExist = foods_array.find((item) => item.id === el.id)
        if (foodExist) {
          const removedItems = foods_array.filter((item) => item.id !== el.id)
          localStorage.setItem("washlist", JSON.stringify(removedItems))
          setIsChange(prev => !prev)
        } else {
          const washlist = [...foods_array, el]
          localStorage.setItem("washlist", JSON.stringify(washlist))
          setIsChange(prev => !prev)
        }
      } catch (error) {
        console.log(error)
      }
    }
}

    const checkColor = () => {
        try {
            const foods_array = JSON.parse(localStorage.getItem("washlist"))
            const foodExist = foods_array.find((item) => item.id === el.id)
            return foodExist
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        checkColor()
    }, [isChange])

    const getModal = () => {
        console.log(el);
        setChekModal(true)
        console.log(chekModal);
    }

    const closeModal = () => {
        setChekModal(false)
    }

    return (
        <div className='opacity: 1; transform: none;'>

            <div className={chekModal ? "fixed inset-0 z-10 overflow-y-auto" : "fixed inset-0 z-10 overflow-y-auto hidden"}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[1000px] opacity-100 translate-y-0 sm:scale-100">
                        <div className="flex flex-row ">
                            <div className="basis-2/2 md:basis-1/2 flex justify-center items-center">
                                <div className="md:w-[560px] md:h-[500px] w-full h-[350px]">
                                    <img src={el.image} alt="" />
                                </div>
                            </div>

                            <div className="basis-2/2 md:basis-1/2 flex flex-col w-full items-center py-5 md:py-10 px-5">
                                <button onClick={closeModal} className='absolute top-2 right-2 p-2 border-0 md:border hover:bg-slate-100 active:bg-slate-200'> <BsXLg/> </button>
                                
                                <div className="flex md:mt-5 mt-0 flex-row w-full justify-between items-center">
                                    <h2 className="text-xl xl:mx-4 mx-0">
                                    {el.title}
                                    </h2>
                                </div>
                                {/* <span className='mt-5 md:px-3 px-2 bg-orange-100 text-orange-800 rounded-full'>

                                </span> */}
                                <div className='flex flex-col gap-5'>
                                    
                                <div className="flex justify-start flex-col w-full md:px-5 px-1 mt-10">
                                    <h1 className='text-xs'> tarkib : </h1>
                                    <p>{el.text}</p>
                                </div>

                                <div className="flex justify-start flex-col w-full md:px-5 px-1">
                                    <h1 className='text-xs'> narxi </h1>
                                    <p>{el.summa}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='border rounded-md my-1.5  flex justify-between items-center'>
                <div className="flex flex-row justify-stretch w-full items-center text-left py-2">
                    <div className="max-h-20 max-w-20 rounded-full cursor-pointer flex justify-center items-center ml-1 border">
                        <img src={el.image} onClick={getModal} alt="" className='rounded-full transition-all duration-150 hover:scale-125 active:scale-75 w-16 h-16' />
                    </div>
                    <div className="px-2">
                        <div>
                            <p className='truncate w-56'>{el.title}</p>
                            <p className='text-md font-normal'>{el.summa}</p>
                        </div>

                        <div className="text-xs">
                            <div className="truncate w-48 xl:96">{el.text}</div>
                        </div>
                    </div>

                </div>

                <div className="pr-4">
                    <button >
                        <BsHeart className={`${checkColor() ? "bg-red-600" : "bg-white"}`} onClick={() => heandleClik(el)} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default product