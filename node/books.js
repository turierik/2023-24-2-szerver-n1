const { Book } = require('./models')
const sequelize = require('sequelize')
const Op = sequelize.Op

const niceLog = (data) => console.log(JSON.parse(JSON.stringify(data, null, 2)))

;(async () => {
    // 1. kérj le minden könyvet
    niceLog(await Book.findAll())

    // 2. kérj le minden hardcover könyvet
    niceLog(await Book.findAll({
        where: {
            hardcover: true
        }
    }))

    // 3. kérj le minden 100 oldalnál hosszabb könyvet
    niceLog(await Book.findAll({
        where: {
            pages: { [Op.gt] : 100 }
        }
    }))

    // 4. kérj le minden 100 oldalnál hosszabb hardcover könyvet
    niceLog(await Book.findAll({
        where: {
            pages: { [Op.gt] : 100 },
            hardcover: true
        }
    }))

    // 5. kérj le egy 100 oldalnál rövidebb vagy nem hardcover könyvet
    niceLog(await Book.findOne({
        where: {
            [Op.or] : [
                { pages: { [Op.lt] : 100} },
                { hardcover: false }
            ]
        }
    }))

    // 6. hány hardcover könyv van?
    niceLog(await Book.count({
        where: {hardcover: true}
    }))

    // 7. add vissza minden könyv címét és oldalszámát!
    niceLog(await Book.findAll({
        attributes: ['title', 'pages']
    }))

    // 8. átlagosan hány oldalas egy könyv?
    niceLog(await Book.findOne({
        attributes: [
            [sequelize.fn('AVG', sequelize.col('pages')), 'avgPages']
        ]
    }))

    // 9. átlagosan hány oldalasak a hardcover és nem hardcover könyvek?
    niceLog(await Book.findAll({
        attributes: [
            'hardcover', 
            [sequelize.fn('AVG', sequelize.col('pages')), 'avgPages']
        ], 
        group: 'hardcover'
    }))

    // 10. a legtöbb oldalas könyv adatai
    niceLog(await Book.findOne({
        order: [ ['pages', 'DESC'] ]
    }))

    // 11. az 5 legtöbb oldalas könyv adatai
    niceLog(await Book.findAll({
        order: [ ['pages', 'DESC'] ],
        limit: 5 }
    ))

    // 12. hány hardcover és hány nem hardcover könyv van?
    niceLog(await Book.count({
        group: ['hardcover']
    }))
    niceLog(await Book.findAll({
        attributes: [
            'hardcover', 
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ], 
        group: 'hardcover'
    }))

    // 13. átlagosan hány oldalasak azok a könyvek, amiknek a címe "a" betűt tartalmaz?
    niceLog(await Book.findOne({
        attributes: [
            [sequelize.fn('AVG', sequelize.col('pages')), 'avgPages']
        ],
        where: { title: { [Op.like] : '%a%' } }
    }))
})()