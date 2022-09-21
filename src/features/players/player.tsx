import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectPlayer,
    increment,
    fetchJson,
    allusers,
    filterCharacter,
    info,
    playerState
} from './playerSlice';
import { User } from './user';
import "./players.css"
import { Button, Spin } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import SingleMap from "./../../components/maps"





const { Search } = Input;


export type singleUser = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: object;
    location: object;
    image: string;
    episode: object;
    createdAt: object
}




 function Player() {
    const users = useAppSelector(allusers);
    const infor = useAppSelector(info);
    const charctersstate = useAppSelector(playerState);
    const dispatch = useAppDispatch();
    const [filteredUser, setFilteredUser] = useState(users)
    const [search, searchChange] = useState(false)
    const searchValue = useRef("");

    
    useEffect(() => {
        fetchPrevious()
    }, [])


    const fetchPrevious = () => {
        searchChange(false)
        dispatch(fetchJson("https://rickandmortyapi.com/api/character"))
    }


    const nextPage = () => {
        dispatch(fetchJson(infor?.next))

    }

    const prevPage = () => {

        dispatch(fetchJson(infor?.prev))
    }

    const onSearch = debounce((e: any) => {

        searchChange(true)
        // const data = users.filter((item:any) => item.name.toLowerCase().includes(e.target.value))
        // setFilteredUser(data)
        return dispatch(filterCharacter(e))

    }, 500);


    // if (charctersstate.userstatus == "loading") {
    //     return <> <Spin /> </>
    // }

    const filtered: singleUser[] = users

    return (
        <div >
            <div>
                <div>
                    <br />
                    <Row >
                        <Col span={12} push={5}>
                            <Search placeholder="input search text" onSearch={onSearch} enterButton size='middle' />
                        </Col>
                    </Row>
                    {search && <Button onClick={fetchPrevious}> clear search</Button>}

                </div>
                <div className='players-parent  '>
                    {filtered && filtered?.map((item: singleUser) => <User {...item} key={item.id} />)}
                </div>
                {/* <SingleMap /> */}
                <Button type="primary" disabled={infor.prev == null} onClick={prevPage}> prev </Button>
                <Button type="primary" disabled={infor.next == null} onClick={nextPage}> next </Button>
            </div>
        </div>
    );
}

export default Player;