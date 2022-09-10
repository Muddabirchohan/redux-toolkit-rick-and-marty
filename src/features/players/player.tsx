import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectPlayer,
    increment,
    fetchJson,
    allusers,
    fetchTodos,
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



const { Search } = Input;






export function Player() {
    const users = useAppSelector(allusers);

    const infor = useAppSelector(info);
    const charctersstate = useAppSelector(playerState);



    const dispatch = useAppDispatch();

    const [filteredUser,setFilteredUser] = useState(users)


    useEffect(() => {
        dispatch(fetchJson("https://rickandmortyapi.com/api/character"))

    }, [])


    const nextPage = () => {
        dispatch(fetchJson(infor?.next))

    }

    const prevPage = () => {

        dispatch(fetchJson(infor?.prev))



    }

    const onSearch = debounce((e: any) => {

        // const data = users.filter((item:any) => item.name.toLowerCase().includes(e.target.value))
        // setFilteredUser(data)
            return dispatch(filterCharacter(e.target.value))

    },500);



    if (charctersstate.userstatus == "loading") {
        return <> <Spin /> </>
    }


    const filtered = filteredUser.length > 0 ? filteredUser : users

    return (
        <div>
            <div>

                <div>
                    <br/>
                <Row >
      <Col span={12} push={5}>
      <Search placeholder="input search text" onSearch={onSearch} onChange={onSearch} enterButton size='middle' />

      </Col>
    </Row>
                </div>

                <div className='players-parent  '>
                    {filtered && filtered?.map((item: any) => <User item={item} key={item.id} />)}
                </div>

                <Button type="primary" disabled={infor.prev == null} onClick={prevPage}> prev </Button>
                <Button type="primary" disabled={infor.next == null} onClick={nextPage}> next </Button>
            </div>
        </div>
    );
}
