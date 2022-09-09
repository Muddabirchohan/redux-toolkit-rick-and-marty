import { PageHeader } from 'antd';
import React from 'react';
import { Button, Descriptions, } from 'antd';
import { useSelector } from 'react-redux';

import { useAppSelector, useAppDispatch } from './../app/hooks';
import {
    singleCharacter,
    single,
    addToFavourites,
    favourites
} from './../features/players/playerSlice';
import { Link } from 'react-router-dom';


export const Header = () => {
    const favourite = useAppSelector(favourites);


    return (
        <PageHeader
            className="site-page-header"
            title="Rick and Morty"
            subTitle="store"
            extra={[
                <Button key="1" type="primary">
                    <Link to="/favourites">Favourites {favourite.length > 0 ? `(${favourite.length})` : null} </Link>
                </Button>
            ]}
        />
    )
}



