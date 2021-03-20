const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
 type Query {
 book(id: Int!): Book
 books(title: String): [Book]
 },
 type Mutation {
 updateBookTitle(id: Int!, title: String!): Book
 },
 type Book {
 id: Int
 title: String
 author: String
 description: String
 }
`);

const BooksList = [
    {
        id: 1,
        title: 'らーめん',
        author: '猫',
        description: 'いつもありがとうございます',
    },
    {
        id: 2,
        title: 'つけめん',
        author: '犬',
        description: 'いつもありがとうございます',
    },
    {
        id: 3,
        title: '僕イケメン',
        author: '犬',
        description: 'いつもありがとうございます',
    }
];

const getBook = function (args) {
    const id = args.id;
    return BooksList.filter(book => {
        return book.id === id;
    })[0];
};
const getBooks = function (args) {
    if (args.title) {
        const title = args.title;
        return BooksList.filter(book => book.title === title);
    } else {
        return BooksList;
    }
};
const updateBookTitle = function ({id, title}) {
    BooksList.map(book => {
        if (book.id === id) {
            book.title = title;
            return book;
        }
    });
    return BooksList.filter(course => course.id === id) [0];
};
const root = {
    book: getBook,
    books: getBooks,
    updateBookTitle: updateBookTitle
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
