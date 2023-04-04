import {createSlice}  from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  locations : [],
  location: {},
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
   
    setLocations: (state,action)=>{
      state.locations = action.payload.locations;
    },
    setLocation: (state,action)=>{
      state.location = action.payload.location;
    }
  }
})
export const {setMode, setLocations, setLocation} = slice.actions;
export default slice.reducer;