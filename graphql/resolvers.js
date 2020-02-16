import { getAnimes } from './db'

const resolvers = {
  Query: {
    animes: () => getAnimes()
  }
}

export default resolvers
