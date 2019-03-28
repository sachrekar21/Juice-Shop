/* jslint node: true */
const fs = require('fs')
const path = require('path')
const sequelizeNoUpdateAttributes = require('sequelize-noupdate-attributes')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('juiceshop', 'admin', 'C1g1ta!2019', {
    host: 'juiceshop.ckkazoopx6gq.us-east-2.rds.amazonaws.com',
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})
sequelizeNoUpdateAttributes(sequelize)
const db = {}

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
