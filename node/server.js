const fastify = require("fastify")({
    logger: true
});
const { Book, Human } = require('./models');

const registerGraphQL = require('./graphql');

registerGraphQL(fastify);

// Declare a route
fastify.get("/", (request, reply) => {
    reply.send({ hello: "world" });
});

fastify.get("/books", async (request, reply) => {
    reply.send(await Book.findAll());
});

fastify.get("/books/:id", {
    schema: {
        params: {
            id: { type: 'integer' }
        }
    }
}, async (request, reply) => {
    // request.params.id
    const book = await Book.findByPk(request.params.id)
    if (book)
        reply.send(book);
    else   
        reply.status(404).send("NOT FOUND");
});

fastify.post("/books", {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                pages: {type: 'integer'},
                hardcover: {type: 'boolean', default: false },
                authorId: {type: 'integer'},
            },
            required: ['title', 'pages', 'hardcover', 'authorId']
        },
    }
}, async (request, reply) => {
    try {
        const book = await Book.create(request.body)
        reply.status(201).send(book)
    } catch (e){
        // 500-as visszaadni nem szép dolog :)
        reply.status(400).send(e)
    }
})

fastify.put("/books/:id", {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                pages: {type: 'integer'},
                hardcover: {type: 'boolean', default: false },
                authorId: {type: 'integer'},
            },
            required: ['title', 'pages', 'hardcover', 'authorId']
        },
        params: {
            id: { type: 'integer' }
        }
    }
}, async (request, reply) => {
    const book = await Book.findByPk(request.params.id);
    if (!book) 
        return reply.status(404).send("NOT FOUND")
    try {
        await book.update(request.body)
        reply.status(200).send(book)
    } catch (e){
        // 500-as visszaadni nem szép dolog :)
        reply.status(400).send(e)
    }
})

fastify.patch("/books/:id", {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                pages: {type: 'integer'},
                hardcover: {type: 'boolean', default: false },
                authorId: {type: 'integer'},
            },
            // required: ['title', 'pages', 'hardcover', 'authorId']
        },
        params: {
            id: { type: 'integer' }
        }
    }
}, async (request, reply) => {
    const book = await Book.findByPk(request.params.id);
    if (!book) 
        return reply.status(404).send("NOT FOUND")
    try {
        await book.update(request.body)
        reply.status(200).send(book)
    } catch (e){
        // 500-as visszaadni nem szép dolog :)
        reply.status(400).send(e)
    }
})

fastify.delete("/books/:id", {
    schema: {
        params: {
            id: { type: 'integer' }
        }
    }
}, async (request, reply) => {
    // request.params.id
    const book = await Book.findByPk(request.params.id)
    if (book){
        await book.destroy();
        reply.send("DELETED");
    } else   
        reply.status(404).send("NOT FOUND");
});

fastify.delete("/books", async (request, reply) => {
    reply.send(await Book.destroy( { truncate: true }  ));
});

fastify.register(require('@fastify/jwt'), {
    secret: 'secret'
})

fastify.post("/login", {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                name: {type: 'string'}
            },
            required: ['id', 'name']
        }
    }
}, async (request, reply) => {
    const human = await Human.findOne({
        where: {id : request.body.id, name: request.body.name }
    })
    if (!human)
        return reply.status(404).send("HUMAN NOT FOUND")
    return reply.send( fastify.jwt.sign(human.dataValues) )
})

fastify.decorate("auth", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

// fastify.get('/my-books', { onRequest: [fastify.auth] }, async (request, reply) => {
//     // hitelesített user adatai: request.user
//     reply.send(await Book.findAll( {
//         where: {
//             authorId: request.user.id
//         }
//     }))
// })

fastify.get('/my-books', { onRequest: [fastify.auth] }, async (request, reply) => {
    // hitelesített user adatai: request.user
    const human = await Human.findByPk(request.user.id)
    reply.send(await human.getBooks());
})

// Run the server!
fastify.listen({ port: 4000 }, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
