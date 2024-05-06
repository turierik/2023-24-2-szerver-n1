const { Book, Human } = require('./../models')
const sequelize = require('sequelize')

module.exports =  {
    Query: {
        add: async (_, { x, y }) => x + y,
        books: async () => await Book.findAll(),
        bookById: async (_, { id }) => await Book.findByPk(id),
        booksByAuthor: async (_, { name }) => {
            // const human = await Human.findOne({
            //     where: {
            //         name
            //     }
            // })
            // return await human.getBooks()
            return await Book.findAll({
                include: [{ model: Human, as: 'author', where: {
                    name
                }}]
            })
        },
        stats: async () => {
            // const books = await Book.findAll();
            // let pages = 0;
            // let count = 0;
            // for (const book of books){
            //     count ++;
            //     pages += book.pages;
            // }
            return {
                bookCount: await Book.count(),
                // avgPages: pages / count;
                avgPages: (await Book.findOne({
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('pages')), 'avg']
                    ]
                })).dataValues.avg
            }
        }
    },
    Book: {
        author: async (book) => await book.getAuthor()
    },
    Mutation: {
        createBook: async(_, { input }) => await Book.create(input)
    }
}