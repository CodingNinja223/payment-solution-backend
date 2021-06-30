const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

type Query {
  getPerson:[Person]
}

type Person {
  name: String
  height: String
  mass: String
  gender: String
  homeworld: String
}


`);
 
// The root provides a resolver function for each API endpoint
const root = {
  
  getPerson: async ({id}) => {
    const res= await fetch(`https://swapi.dev/api/people/`)
    return res.json();
  }
};
 
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(5000);
console.log('Running a GraphQL API server at http://localhost:5000/graphql');


