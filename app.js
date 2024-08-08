const express = require('express')
// const router = require('./routes/MyRouter')
const path = require('path')
const app = express()

const router = require('./routes/MyRouter')
const { execArgv } = require('process')

// use templete
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// จำเป็นต้องมีบรรทัดนี้เมื่อมีการใช้งาน post method
app.use(express.urlencoded({ extended: false }))

app.use(router)
// use static file
app.use(express.static(path.join(__dirname, 'public')))

// app.use(router)
app.listen(8080, () => {
    console.log("starting Server at port 8080")
})
// 

