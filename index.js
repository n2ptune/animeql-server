import { GraphQLServer } from 'graphql-yoga'
import resolvers from './graphql/resolvers'

const server = new GraphQLServer({
  typeDefs: __dirname + '/graphql/schema.graphql',
  resolvers
})

server.start(
  {
    playground: '/playground',
    port: process.env.PORT || 4000
  },
  () => console.log('graphql server started')
)
