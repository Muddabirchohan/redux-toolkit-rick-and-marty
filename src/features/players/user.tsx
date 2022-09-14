import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';
import { singleUser } from './player';



export function User (item:singleUser) {


    const location = useLocation();

  return (
    <div>
        <Link to={{ pathname: "/single", search: `?id=${item.id}` }}>
    
        <img src={item.image} style={{height: "260px",}}/>
        <p>  {item.name}  </p>
        </Link>

    </div>
  );
}
