import { getAnimes, getLinks, getAnimeByID, getRatings } from './db'

const resolvers = {
  Query: {
    ratings: (_, { id }) => getRatings(id),
    anime: (_, { id }) => getAnimeByID(id),
    animes: getAnimes,
    links: getLinks
  }
}

export default resolvers
