import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';



export function User ({item}:any) {


    const location = useLocation();



   

  return (
    <div>
        <Link to={{ pathname: "/single", search: `?id=${item.id}` }}>
    

        <img src={item.image} style={{height: "250px"}}/>
        <p>  {item.name}  </p>

        {/* <p> {item.status} </p> */}
        </Link>

    </div>
  );
}
