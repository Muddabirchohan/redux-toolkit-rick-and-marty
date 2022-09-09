import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectPlayer,
  increment,
  fetchJson,
  allusers,
  fetchTodos,

  info,
  playerState
} from './playerSlice';
import { User } from './user';
import "./players.css"
import { Button,Spin } from 'antd';


export function Player() {
  const users = useAppSelector(allusers);

  const infor = useAppSelector(info);
  const charctersstate = useAppSelector(playerState);

  console.log("state",charctersstate)


  const dispatch = useAppDispatch();


  useEffect(()=>{
   dispatch(fetchJson("https://rickandmortyapi.com/api/character"))

  },[])


  const nextPage = () => {
    dispatch(fetchJson(infor?.next))
  }

  const prevPage = () => {

    dispatch(fetchJson(infor?.prev))
  }


  if(charctersstate.userstatus == "loading"){
    return <> <Spin/> </>
  }


  return (
    <div>
      <div>
        
        <div className='players-parent  '> 
          {users && users.map((item:any) => <User item={item} key={item.id}/>)}
        </div>  

          <Button type="primary" disabled={infor.prev == null} onClick={prevPage}> prev </Button>
        <Button type="primary" disabled={infor.next == null}  onClick={nextPage}> next </Button>
      </div>
    </div>
  );
}
