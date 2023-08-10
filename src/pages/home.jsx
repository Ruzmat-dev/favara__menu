import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {BsHeart , BsSearch} from "react-icons/bs"
import { getCategory } from '../api/data'
const Home = () => {

  const [data , setData] = useState([])
  const [dataNull, setDataNull] = useState([]);

const fetchData = async() => {
  try {
    const res = await getCategory()
    setData(res.data)
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  fetchData()
}, [])


data.map((el) =>{
  if(!el.parent) {
dataNull.push(el)
  }
})

console.log(dataNull);
    
  return (
    <div className='container mx-auto px-4'>
      <div className="w-full flex justify-between px-1 md:px-0 mb-5 items-center gap-5">
        <Link to="/"> <img src="../../public/main.png" style={{width: "150px"}} alt="" /> </Link>
        <div> 
          <button className='mr-2 p-2 inline-block border rounded-lg hover:bg-slate-100 active:bg-slate-50'>
          <BsHeart/>
          <span></span>
          </button>
        </div>
      </div>

      <div className='flex items-center w-full px-2 md:px-0'>
          <div className="relative w-96">
              <BsSearch style={{width: "1rem" , height: "1rem" , fontSize: "24px"}} className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3'/>
              <input type="text" placeholder='Qidirish....' className='w-full border py-2 pl-10 focus:outline-1 outline-blue-500'/>
          </div>
      </div>

      <div className='hidden md:flex mt-4'>
          <ul className='flex flex-row transition-all duration-75 justify-center xl:justify-start flex-wrap gap-2 py-2'>
              <li className='bg-blue-500 text-white listCjasteFilter cursor-pointer border px-3 w-32 py-2'>Hammasi</li>
              {
                dataNull.map((item , index) => {
                  return (
                    <li key={index} className='listCjasteFilter cursor-default border px-3 w-32 py-2'> {item.title}</li>
                  )
                })
              }
          </ul>
      </div>
    </div>
  )
}

export default Home