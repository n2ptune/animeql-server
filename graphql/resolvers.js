import {
  getAnimes,
  getLinks,
  getAnimeByID,
  getRatings,
  getAnimesByURL,
  getLinksByURL,
  getRelationAnimeByID
} from './db'

const resolvers = {
  Query: {
    ratings: (_, { id }) => getRatings(id),
    anime: (_, { id }) => getAnimeByID(id),
    animes: getAnimes,
    animesByURL: (_, { url }) => getAnimesByURL(url),
    linksByURL: (_, { url }) => getLinksByURL(url),
    links: getLinks,
    relation: (_, { id }) => getRelationAnimeByID(id)
  }
}

export default resolvers
