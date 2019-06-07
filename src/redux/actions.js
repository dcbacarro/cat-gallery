export const LOAD_BREEDS       = "LOAD_BREEDS"
export const SET_CURRENT_BREED = "SET_CURRENT_BREED"
export const SET_LOADING       = "SET_LOADING"
export const SET_IMAGE         = "SET_IMAGE"

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading
})

export const loadBreeds = (breeds) => ({
  type: LOAD_BREEDS,
  breeds
})

export const setCurrentBreed = (breed) => ({
  type: SET_CURRENT_BREED,
  breed
})

export const setImage = (id, image) => ({
  type: SET_IMAGE,
  id,
  image
})

export const fetchBreeds = () => {
  return dispatch => {
    dispatch(setLoading(true))
    fetch(`https://api.thecatapi.com/v1/breeds?attach_breed=0&limit=20`, {
      headers: {
        "x-api-key": "41245267-003b-48d3-a1bf-6d19f75dc6b3"
      }
    }).then(res => res.json())
      .then(async breeds => {
        breeds = breeds.map(async breed => {
          const image = await fetchImage(breed.id)
          breed.image = image
          return breed
        })
        breeds = await Promise.all(breeds)
        dispatch(loadBreeds(breeds))
        dispatch(setLoading(false))
      }).catch(err => {
        console.log(err)
        dispatch(setLoading(false))
      })
  }
}

const fetchImage = async(breedId) => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`)
  const raw = await res.json()
  return raw[0].url
}