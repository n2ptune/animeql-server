import axios from 'axios'

const APP_URL = 'https://kitsu.io/api/edge/anime'

export const getAnimes = async () => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      sort: '-updatedAt',
      limit: 20
    }
  })

  return animeData.data
}

export const getLinks = async () => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      sort: '-updatedAt',
      limit: 20
    }
  })

  return animeData.links
}

export const getAnimeByID = async id => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      'filter[id]': id
    }
  })

  return animeData.data[0]
}
