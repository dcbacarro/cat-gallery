/* eslint-disable default-case */

import produce from 'immer'
import {
  LOAD_BREEDS,
  SET_CURRENT_BREED,
  SET_LOADING,
  SET_IMAGE
} from '../actions'

const initialState = {
  breeds: [],
  loading: false,
  currentBreed: null
}

export default produce((draft, action) => {
  switch(action.type) {
    case SET_LOADING:
      draft.loading = action.loading
    break
    case LOAD_BREEDS:
      draft.breeds = action.breeds
    break
    case SET_CURRENT_BREED:
      draft.currentBreed = action.breed
    break
    case SET_IMAGE:
      const index = draft.breeds.findIndex(breed => breed.id === action.id)
      draft.breeds[index].image = action.image
    break
  }
}, initialState)