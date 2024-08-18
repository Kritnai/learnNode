// ใช้ง่าน Mongoose
const mongoose = require('mongoose')

// เชื่อมไปยัง MongoDB
const dbbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbbUrl, {
    // ใน version ใหม่ไม่ต้องระบุแล้วเนื่องจากถูกกำหนดให้เป็น default
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// ออกแบบ schema
let productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
})

// สร้าง Model
let Product = mongoose.model("products", productSchema)

// export model
module.exports = Product

// ออกแบบฟังชันสำหรับทึกข้อมูล
// module.exports.saveProduct = function(model, data){
//     model.save(data)
// }
module.exports.saveProduct = async function(model, data) {
    try {
        await model.save(data);
    } catch (err) {
        throw err;
    }
}
