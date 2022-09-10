import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    singleCharacter,
    single,
    addToFavourites,
    favourites,
    removeFromFavourites
} from './../features/players/playerSlice';

import "./favourite.css"
import { message, Popconfirm } from 'antd';



export function Favourites({ item }: any) {


    const favourite = useAppSelector(favourites);
    const dispatch = useAppDispatch();

    const confirm = (item: any) => {
        removeItem(item)
        message.success("Item Removed", 1);
    };

    const cancel = (e: any) => {
        console.log(e);
    };



    const removeItem = (item: any) => {
        dispatch(removeFromFavourites(item.id))
    }


    if (favourite && favourite.length < 1) {
        return <div className='favourites-error'> No Items in Favourites</div>
    }



    const renderFavourites = () => {
        return favourite.map((item: any) => {
            return (
                <div className="favoritesParent">
                    <p> <img src={item.image} style={{ height: "150px", width: "150px" }} /></p>
                    <p> {item.name} </p>
                    <p> {item.quantity} </p>
                    <Popconfirm
                        title="Are you sure to delete this character?"
                        onConfirm={() => confirm(item)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>

                        {/* <Button onClick={()=>removeItem(item)}> Remove </Button>  */}
                    </Popconfirm>


                </div>
            )
        })
    }

    return (
        <div>

            {renderFavourites()}
        </div>
    );
}
