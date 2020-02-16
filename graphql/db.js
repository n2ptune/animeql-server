import axios from 'axios'

const APP_URL = 'https://kitsu.io/api/edge/anime?sort=-updatedAt'

export const getAnimes = async () => {
  const { data: animeData } = await axios.get(`${APP_URL}`)

  return animeData.data
}
