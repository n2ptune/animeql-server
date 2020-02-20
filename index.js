import { GraphQLServer } from 'graphql-yoga'
import resolvers from './graphql/resolvers'
// import logger from 'morgan'

const server = new GraphQLServer({
  typeDefs: __dirname + '/graphql/schema.graphql',
  resolvers
})

// server.express.use(logger('combined'))

server.start(
  {
    playground: '/playground',
    endpoint: '/graphql',
    port: process.env.PORT || 4000
  },
  () => console.log('graphql server started')
)
