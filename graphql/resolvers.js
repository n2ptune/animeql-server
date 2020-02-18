import { getAnimes, getLinks, getAnimeByID } from './db'

const resolvers = {
  Query: {
    anime: (_, { id }) => getAnimeByID(id),
    animes: getAnimes,
    links: getLinks
  }
}

export default resolvers
