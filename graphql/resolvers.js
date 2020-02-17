import { getAnimes, getLinks } from './db'

const resolvers = {
  Query: {
    animes: getAnimes,
    links: getLinks
  }
}

export default resolvers
