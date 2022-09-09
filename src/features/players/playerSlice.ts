import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';


const initialState: any = {
    count: 0,
    users: [],
    info: {},
    singleCharacter: {},
    favouritesList : [],
    userStatus: "loading"
}


export const singleCharacter = createAsyncThunk(
    'players/single',
    async (char:any) => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${char}`);
      const dat = await response.json()
      return dat
    }
)


export const fetchJson = createAsyncThunk(
    'players/fetchJson',
    async (url:any) => {
      const response = await fetch(`${url}`);
      const dat = await response.json()
      return dat
    }
  );

  export const fetchTodos = createAsyncThunk(
    'players/fetchtodos',
    async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const dat = await response.json()
      return dat
    }
  );
  
export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {

    increment: (state,action) => {

        state.count+=1;
    },

    addToFavourites: (state,action) => {
      
      const favLength = state.favouritesList.length;
      
        const favIds = state.favouritesList.map((item:any) => item.id)
        favIds.forEach((id:any) => {
            if(id == action.payload.id){
              const found = state.favouritesList.find((fav:any) => fav.id == action.payload.id);
              found.quantity+=1
            }
        });
        if(!favIds.includes(action.payload.id)){
          action.payload = {...action.payload,quantity: 1}
          state.favouritesList = [...state.favouritesList,action.payload]
        
      }
    },

    removeFromFavourites:(state,action)=>{

      const filtered = state.favouritesList.filter((item:any) => item.id !== action.payload);
      state.favouritesList = filtered;
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJson.pending, (state) => {
        state.userstatus = 'loading';
      })
      .addCase(fetchJson.fulfilled, (state, action) => {


        // const split = action.payload?.info?.next?.split("=")[1] - 1;

        state.userstatus = 'fulfilled';
        state.users = [...action.payload.results];
        state.info = action.payload?.info

      })
      .addCase(fetchJson.rejected, (state) => {
        state.userstatus = 'failed';
      });



      builder
      .addCase(singleCharacter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(singleCharacter.fulfilled, (state, action) => {
        console.log("pl",action.payload)
        state.status = 'idle';
        state.singleCharacter = action.payload;
      })
      .addCase(singleCharacter.rejected, (state) => {
        state.status = 'failed';
      });



  },
  
});

export const { increment ,addToFavourites,removeFromFavourites} = playerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayer = (state: RootState) => state.players.count
export const allusers = (state: RootState) => state.players.users
export const info = (state: RootState) => state.players.info
export const single = (state: RootState) => state.players.singleCharacter
export const favourites = (state: RootState) => state.players.favouritesList
export const playerState = (state: RootState) => state.players





export default playerSlice.reducer;
