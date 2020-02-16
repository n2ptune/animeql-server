import { GraphQLServer } from 'graphql-yoga'
import resolvers from './graphql/resolvers'

const server = new GraphQLServer({
  typeDefs: './graphql/schema.graphql',
  resolvers
})

server.start({ endpoint: '/graphql', playground: '/playground' }, () =>
  console.log('graphql server started')
)
