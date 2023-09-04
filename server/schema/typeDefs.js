const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
  }

type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

type AuthData {
    token: String
    user: User
  }

type Query {
    me: User 
  }

type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthData
    login(usernameOrEmail: String!, password: String!): AuthData
    saveBook(book: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
