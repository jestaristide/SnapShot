import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey } from "../../api/config";
import axios from "axios";

const initialState = {
    mountain:false,
    beach:false,
    bird:false,
    food:false,
    search:false,
    image: {},
    modalView:false,
    modalLoading:true
}

const runSearch = async query => {
    let result = null;
    await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${query}&format=json&nojsoncallback=1`)
      .then(response => {
          result =  response.data.photo;
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });

      return result
  };


export const loadImage = createAsyncThunk('fetchImage', async (id) => {
    const response = await runSearch(id)
    return response
  })


export const xhrSlice = createSlice({
  name: 'xhr',
  initialState: initialState,
  reducers: {
    addMountain: (state, action) => {
      state.mountain = action.payload;
    },
    addBeach: (state, action) => {
      state.beach = action.payload;
    },
    addBird: (state, action) => {
      state.bird = action.payload;
    },
    addFood: (state, action) => {
      state.food = action.payload;
    },
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    addImageInfo: (state, action) => {
      state.image = action.payload;
      state.modalView = true;
    },
    doOpenModal: (state, action) => {
      state.modalView = true;
    },
    doCloseModal: (state, action) => {
      state.modalView = false;
    },
  },
  extraReducers:{
    [loadImage.pending]: (state, action) => {
        state.modalView = true;
        state.modalLoading = true
        state.image={}
    },
    [loadImage.fulfilled]: (state, action) => {
        const image = action.payload
        const url = `https://farm66.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`
        state.modalLoading = false
        state.image = {...action.payload, url}
    },
    [loadImage.rejected]: (state, action) => {
        state.modalView = false;
        state.image={}
    }
  }
});





export const { addMountain, addBeach, addBird, addFood, addSearch, addImageInfo , doCloseModal, doOpenModal} = xhrSlice.actions;


export default xhrSlice.reducer;