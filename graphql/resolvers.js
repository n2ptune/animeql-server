import {
  getAnimes,
  getLinks,
  getAnimeByID,
  getRatings,
  getAnimesByURL,
  getLinksByURL
} from './db'

const resolvers = {
  Query: {
    ratings: (_, { id }) => getRatings(id),
    anime: (_, { id }) => getAnimeByID(id),
    animes: getAnimes,
    animesByURL: (_, { url }) => getAnimesByURL(url),
    linksByURL: (_, { url }) => getLinksByURL(url),
    links: getLinks
  }
}

export default resolvers
