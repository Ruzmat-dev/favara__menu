import React, { useEffect, useState } from 'react'
import { BsHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const navbar = ({ isChange }) => {
    const [leangth , setLeangth] = useState()


    useEffect(()=> {
        try {
            const foods_array = JSON.parse(localStorage.getItem("washlist"))
          setLeangth(foods_array.length);
        } catch (error) {
            console.log(error)
          }
    }, [isChange])
    

    return (
        <div className="w-full flex justify-between px-1 md:px-0 mb-5 items-center gap-5">
            <Link to="/"> <img src="../../public/main.png" style={{ width: "150px" }} alt="" /> </Link>
            <Link to="/wishlist">
                <button className='mr-2 p-2 inline-block border rounded-lg hover:bg-slate-100 active:bg-slate-50'>
                    <BsHeart />
                    <span>{leangth}</span>
                </button>
            </Link>
        </div>
    )
}

export default navbar