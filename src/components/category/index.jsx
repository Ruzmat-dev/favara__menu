import React, { useState } from 'react'

const Category = ({ item, activeCat, setActiveCat }) => {
    return (
        <li onClick={() => setActiveCat(item.id)} className={activeCat === item.id ? "listCjasteFilter cursor-default border px-3 w-32 py-2 bg-blue-500 text-white" : "listCjasteFilter cursor-default border px-3 w-32 py-2"}> {item.title}</li>
    )
}

export default Category