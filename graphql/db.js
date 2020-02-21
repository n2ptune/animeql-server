import axios from 'axios'

const APP_URL = 'https://kitsu.io/api/edge/anime'

export const getRatings = async id => {
  const d = await getAnimeByID(id)
  const arr = []

  for (const k in d.attributes.ratingFrequencies) {
    arr.push({
      score: parseInt(k),
      count: parseInt(d.attributes.ratingFrequencies[`${k}`])
    })
  }

  return {
    min: arr[0].count,
    max: arr[arr.length - 1].count,
    count: arr.reduce((prev, curr) => prev + curr.count, 0),
    average: d.attributes.averageRating
  }
}

export const getAnimes = async () => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      sort: '-updatedAt',
      limit: 10
    }
  })

  return animeData.data
}

export const getLinks = async () => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      sort: '-updatedAt',
      limit: 10
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

export const getAnimesByURL = async url => {
  const { data: animeData } = await axios.get(url, {
    params: {
      sort: '-updatedAt',
      limit: 10
    }
  })

  return animeData.data
}

export const getLinksByURL = async url => {
  const { data: animeData } = await axios.get(url, {
    params: {
      sort: '-updatedAt',
      limit: 10
    }
  })

  return animeData.links
}
