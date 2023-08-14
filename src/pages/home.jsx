import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsHeart, BsSearch, BsChevronDoubleLeft, BsChevronDoubleRight, BsDashCircle } from "react-icons/bs"
import { getCategory, getProducts, getPaginations, getSearch, byPrice } from '../api/data'
import Category from '../components/category'
import Allfoods from "../components/allProdct/product"
import axios from 'axios'
import Pagination from '../components/pagination';
import Navbar from "../pages/navbar"

const Home = () => {
  const [next, setNext] = useState(null)
  const [isChange, setIsChange] = useState(false)
  const [previous, setPrevious] = useState(null)
  const [activeCat, setActiveCat] = useState(undefined)
  const [catLoading, setCatLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [dataNull, setDataNull] = useState([]);
  const [foods, setFoods] = useState([])
  const [btnActiv, setBtnActiv] = useState(false)
  const [page, setPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [like, setLike] = useState([])
  const [likeLength, setLikeLength] = useState(null)
  const [paginationsItem, setPaginationsItem] = useState(1)

  const fetchCategory = async () => {
    try {
      setCatLoading(true)
      const res = await getCategory()
      setData(res.data)
      const parentCategories = res.data.filter((item) => item.parent === null)
      setDataNull(parentCategories)
      setCatLoading(false)
    } catch (error) {
      setCatLoading(false)
      console.log(error)
    }
  }

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const res = await getProducts(activeCat)
      setFoods(res.data.results)
      setPage(res.data.count);
      setNext(res.data.next)
      setPrevious(res.data.previous)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }


  const fetchNextData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(next)
      setFoods(res.data.results)
      setPrevious(res.data.previous)
      setNext(res.data.next)
      console.log(res);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  const fetchBackData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(next)
      setFoods(res.data.results)
      setPrevious(res.data.previous)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.log(error);
    }
  }


  useEffect(() => {
    fetchCategory()
    fetchFoods()
  }, [activeCat])

  const pageNumbers = []
  const pageLength = Math.ceil(page / 10)
  for (let i = 1; i <= pageLength; i++) {
    pageNumbers.push(i)
  }

  const getPageValue = async (e) => {
    try {
      setLoading(true)
      const res = await getPaginations(e)
      setFoods(res.data.results)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
    setPaginationsItem(e);
    console.log(paginationsItem);
  }



  const getValue = async (e) => {
    console.log(e.target.value);
    const res = await getSearch(e.target.value)
    setFoods(res.data.results)
    console.log(res);
    console.log(foods);
  }

  const Decrease = async () => {
    const res = await byPrice(`${foods}&ordering=-summa`)
    setFoods(res.data.results)
    console.log(1);
  }

  const getPrice = async (e) => {
    if (e == "Kamayish boyicha") {
      setLoading(true)
      const res = await byPrice("-summa")
      setFoods(res.data.results)
      setLoading(false)
    } else if (e == "Kopayish boyicha") {
      setLoading(true)
      const res = await byPrice("summa")
      setFoods(res.data.results)
      setLoading(false)
    } else {
      setLoading(true)
      const res = await getProducts(activeCat)
      setFoods(res.data.results)
      setLoading(false)
    }
  }


  return (
    <div className='container mx-auto px-4 my-50'>
      <Navbar isChange={isChange} />

      <div className='flex items-center justify-between w-full px-2 md:px-0'>
        <div className="relative w-96">
          <BsSearch style={{ width: "1rem", height: "1rem", fontSize: "24px" }} className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3' />
          <input type="text" placeholder='Qidirish....' onChange={getValue} className='w-full border py-2 pl-10 focus:outline-1 outline-blue-500' />
        </div>



        <select onChange={event => getPrice(event.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultChecked>Narh boyicha filtirlag </option>
          <option > Kamayish boyicha </option>
          <option > Kopayish boyicha </option>
        </select>

      </div>

      <div className='hidden md:flex mt-4'>
        <ul className='flex flex-row transition-all duration-75 justify-center xl:justify-start flex-wrap gap-2 py-2'>
          <li className={!activeCat ? "bg-blue-500 text-white listCjasteFilter cursor-pointer border px-3 w-32 py-2" : "listCjasteFilter cursor-pointer border px-3 w-32 py-2"} onClick={() => setActiveCat(undefined)} >Hammasi</li>
          {
            catLoading ? (
              <div className="dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : dataNull.map((item, index) => (
              <Category key={index} item={item} activeCat={activeCat} setActiveCat={setActiveCat} />))
          }
        </ul>
      </div>



      <div className="shadow mt-5 md:mt-0 mb-10">
        <div className="overflow-y-scroll h-[70vh] py-2 px-2 xl:pl-0 xl:pr-4 ">
          <div className="flex justify-evenly gap-x-3 flex-wrap">
            {loading ? (
              <div className="box">
                <div className="coin"></div>
              </div>
            ) : (foods.length ? (foods.map((el, index) => (
              <Allfoods key={index} el={el} setIsChange={setIsChange} isChange={isChange} />
            )
            )) : <h1 className='flex gap-5 self-center text-center items-center mb-6'> <span>Uzir bu kategorydai tavomlar hali mavjud emas</span> <BsDashCircle /></h1>)
            }
          </div>
        </div>
      </div>

      <div className='mb-5 flex justify-center'>
        <button className=' flex self-center text-center justify-center  listCjasteFilter cursor-pointer border px-3 w-32 py-2 mr-5 bg-blue-500 text-white focus:outline-none focus:ring focus:ring-blue-300' onClick={fetchBackData}> <BsChevronDoubleLeft />  </button>
        <ul className='flex gap-5'>
          {
            pageNumbers.length ? (
              pageNumbers.map((number) =>
                <li key={number} className='cursor-pointer ' onClick={() => getPageValue(number)}>
                  {/* <a href="#"    className='page-link'> */}
                  
                  <span className={paginationsItem == number ? "bg-blue-400 p-2 rounded-xl" : "" }> {number} </span>

                  {/* </a> */}
                </li>
              )
            ) : <p>...</p>
          }
        </ul>
        <button className='flex self-center text-center justify-center  listCjasteFilter cursor-pointer border px-3 w-32 py-2 bg-blue-500 text-white focus:outline-none focus:ring focus:ring-blue-300 ml-5' onClick={fetchNextData}>
          <BsChevronDoubleRight /> </button>
      </div>
    </div>
  )
}

export default Home