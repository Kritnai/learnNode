//การจัดการ routing
const express = require('express')
const router = express.Router()

const path = require('path')

/* ถ้าเป็น static file ไม่จำเป็นต้องทำ router เพราะสามารถเข้าถึง file ได้เลย */

// router.get('/', (req, res) => {
//     res.status(200)
//     res.type('text/html') // type ของ respont
//     res.sendFile(path.join(__dirname, "../templates/index.html"))
// })

// router.get('/product/:id', (req, res) => {
//     const productID = req.params.id
//     if(productID === '1'){
//         res.sendFile(path.join(__dirname, '../templates/product1.html'))
//     }
//     else if(productID === '2'){
//         res.sendFile(path.join(__dirname, '../templates/product2.html'))
//     }
//     else if(productID === "3"){
//         res.sendFile(path.join(__dirname, '../templates/product3.html'))
//     }
//     else{
//         // res.send("<h1>404 not found</h1>")
//         res.redirect('/')
//     }
// })

router.get('/', (req, res) => {
    /* การวส่งข้อมูลไป templete index.ejs */

    // res.render('index.ejs', {
    //     name: "Nai",
    //     age: "26",
    //     detail: "<h1>this is html</h1>"
    // })

    /* การส่งข้อมูลแบบ array index2.ejs */
    // const product  = ["เสื้อ", "พัดลม", "หูฟัง", "เม้าส์", "จอ", "เครื่องบิน"]
    // res.render('index2.ejs',{
    //     products:product
    // })

    /* การส่งข้อมูลแบบ object index3.ejs */
    const products = [{
        name: "Notebook",
        price: 25000,
        image: "images/products/product1.png"
    }, {
        name: "เสื้อ",
        price: 300,
        image: "images/products/product2.png"
    },{
        name: "หูฟัง",
        price: 900,
        image: "images/products/product3.png"
    }]
    res.render('index3.ejs', {
        products: products
    })


})

module.exports = router