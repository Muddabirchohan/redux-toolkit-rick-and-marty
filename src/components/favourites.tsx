import { Button, Col, Divider, InputNumber, Row, Typography } from 'antd';
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
import { singleUser } from '../features/players/player';
const { Title, Text } = Typography;



interface SingleUserExtender extends singleUser {
    quantity: number
}


const styles: React.CSSProperties = {  marginTop: '55px'};


export function Favourites({ item }: any) {



    const favourite: SingleUserExtender[] = useAppSelector(favourites);
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


    const onChange = (value: any,item: any) => {
        const data = { ...item, type: value}
        dispatch(addToFavourites(data))
    };




    if (favourite && favourite.length < 1) {
        return <div className='favourites-error'> No Items in Favourites</div>
    }

    const renderFavourites = () => {
        return favourite.map((item: SingleUserExtender) => {
            return (
                <Row>
                    <Col span={6}>
                        <p> <img src={item.image} style={{ height: "150px", width: "150px" }} /></p>
                    </Col>
                    
                    <Col style={styles} span={6}>
                        <p> {item.name} </p>

                    </Col>
                    <Col 
                    style={styles}
                     span={6}>
              
              {/* {item.quantity >= 10 && <span> Discount  </span>} */}
                <InputNumber 
                    onChange={(e:any) => onChange(e,item)}
                    className='input-quanity'
                    value={item.quantity} 
                />
               
                    </Col>
                    <Col 
                    style={styles}
                    span={6}>
                        <Popconfirm
                            title="Are you sure to delete this character?"
                            onConfirm={() => confirm(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <div>
            <br />
            <Title level={3} type="secondary"> Favourites ({favourite.length}) </Title>

            <Row>
                <Col span={6}>
                    <Title level={5}>  </Title>
                </Col>
                <Col span={6}>
                    <Title level={5}> name </Title>
                </Col>
                <Col span={6}>
                    <Title level={5}>   quantity </Title>
                </Col>

                <Col span={6}>
                    <Title level={5}> action </Title>
                </Col>
            </Row>

            <Divider />
            {renderFavourites()}
        </div>
    );
}
