//การจัดการ routing
const { render } = require('ejs')
const express = require('express')
const router = express.Router()

const path = require('path')

// เรียกใช้งาน model
const Product = require('../models/products.js')

// upload file
const multer = require('multer')

const storage = multer.diskStorage({
    // ตำแหน่งจัดเก็บไฟล์
    destination: function(req, file, cb){
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb){
        // เปลี่ยนชื่อไฟล์ (กัยชื่อซ้ำ)
        cb(null, Date.now() + '.jpg')
    }
})

// เริ่มต้น upload
const upload = multer({
    storage: storage
})

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

router.get('/', async (req, res) => {
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
    // const products = [{
    //     name: "Notebook",
    //     price: 25000,
    //     image: "images/products/product1.png"
    // }, {
    //     name: "เสื้อ",
    //     price: 300,
    //     image: "images/products/product2.png"
    // },{
    //     name: "หูฟัง",
    //     price: 900,
    //     image: "images/products/product3.png"
    // },{
    //     name: "หูฟัง",
    //     price: 900,
    //     image: "images/products/product3.png"
    // }]
    // res.render('index3.ejs', {
    //     products: products
    // })
    try{
        const products = await Product.find().exec();
        res.render('index3.ejs', {products: products})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching products");
    }
})

router.get('/add-form', (req, res) => {
    res.render('form.ejs')
})

router.get('/manage', async (req, res) => {
    try{
        const products = await Product.find().exec();
        res.render('manage.ejs', {products: products})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching products");
    }
})

/* การส่งข้อมูลรูปแบบ get method */ 
// router.get('/insert', (req, res) => {
//     console.log(req.query)
//     res.render('form.ejs')
// })

/* การส่งข้อมูลรูปแบบ post method */
// router.post('/insert', (req, res) => {
//     let data = new Product({
//         name: req.body.name,
//         price: req.body.price,
//         image: req.body.image,
//         description: req.body.description
//     })
//     Product.saveProduct(data, (err) => {
//         if(err) console.log(err)
//         res.redirect('/')
//     })
// })

router.post('/insert', upload.single('image'), async (req, res) => {
    console.log(req.file)
    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    });
    
    try {
        await Product.saveProduct(data);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving product");
    }
});

router.get('/delete/:id', async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id, {useFileAndModify: false}).exec();
        res.redirect('/manage')
    }catch(err){
        console.log(err)
        res.status(500).send("Error Delete" + req.params.id)
    }
})



module.exports = router