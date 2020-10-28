if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() //this loads the variables from the env file
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('erro', error => console.error(error)) //prints an error if theres an error in the db
db.once('open', () => console.log('connected to mongoose')) //this tells us we have connected to mongoose

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)