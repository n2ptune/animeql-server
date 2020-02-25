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

export const getRelationAnimeByID = async id => {
  const { data: animeData } = await axios.get(`${APP_URL}`, {
    params: {
      'filter[id]': id
    }
  })

  /**
   * @changed get genres -> categories
   * @deprecated genres
   */
  const relatedURL = animeData.data[0].relationships.categories.links.related
  const { data: related } = await axios.get(relatedURL)
  const relatedIDs = []

  related.data.forEach(anime => {
    relatedIDs.push(anime.attributes.slug)
  })

  const axiosWrapper = []

  // 모든 카테고리에 대한 Promise 객체를 만듬
  relatedIDs.map(id => {
    axiosWrapper.push(
      axios.get(`${APP_URL}`, {
        params: {
          'filter[categories]': id,
          sort: '-createdAt',
          limit: 3
        }
      })
    )
  })

  // 모든 Promise 객체 통신
  const [...data] = await Promise.all(axiosWrapper)

  // 가져온 데이터에서 애니메이션 관련 데이터만 가져와서 평평하게 만듬
  const relatedAnimes = data.map(el => el.data.data).flat()

  // 아이디 값에서 중복 제거
  const allIDs = relatedAnimes.map(e => parseInt(e.id))
  const removedOverlap = Array.from(new Set(allIDs))

  const result = []

  // 중복 제거한 아이디 값에서 해당 아이디를 가진 객체만 가져와서
  // 결과 배열에 담음
  removedOverlap.forEach(id => {
    result.push(relatedAnimes.find(anime => parseInt(anime.id) === id))
  })

  return result
}
