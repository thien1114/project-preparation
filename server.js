const express = require('express')
const app = express();
const port = 3000

app.use(express.json())

let products = [
    { id: "1", name: "Áo thun", price: 150000, sale: 120000, category: "Áo", hot: true, quantity: 0, description: "là trang phục quen thuộc được làm từ vải thun co giãn, mang lại cảm giác thoải mái và dễ phối đồ"
    },
    { id: "2", name: "Quần jean", price: 350000, sale: 300000, category: "Quần", hot: false, quantity: 0, description: "được làm từ vải denim bền chắc, form dáng chuẩn, phù hợp phối cùng nhiều loại áo khác nhau"
    },
    { id: "3", name: "Áo khoác", price: 450000, sale: 400000, category: "Áo", hot: true, quantity: 0, description: "chất liệu dày dặn, giữ ấm tốt, thiết kế trẻ trung phù hợp cho mùa lạnh"
    }

]
app.get('/', (req, res) => {
    res.send("Chào mừng đến với API Backend")
})

//Lấy tất cả
app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`);
})

// Thêm sản phẩm mới
app.post('/api/products',(req, res) =>{
    const {name, price, sale, category, hot, quantity, description} = req.body;
    if (!name || price === undefined || sale === undefined || !category || hot === undefined || quantity === undefined || !description) {
        return res.status(400).json({
            message: `Yêu cầu nhập nội dung`
        })
    }
    const newProduct = {
        id: Date.now().toString(),
        name: name,
        price: price,
        sale: sale,
        category: category,
        hot: hot,
        quantity: quantity,
        description: description
    }
    products.push(newProduct);
    res.status(201).json(newProduct)
})

// Sửa
app.put('/api/products/:id',(req, res) =>{
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({
            message: `Ko tìm thấy id ${productId} này`
        })
    }
    const {name, price, sale, category, hot, quantity, description} = req.body;
    if (!name || price === undefined || sale === undefined || !category || hot === undefined || quantity === undefined || !description) {
        return res.status(400).json({
            message: `Yêu cầu nhập nội dung`
        })
    }
    const updatedProduct = {
        id: productId,
        name: name,
        price: price,
        sale: sale,
        category: category,
        hot: hot,
        quantity: quantity,
        description: description
    }
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct)
})