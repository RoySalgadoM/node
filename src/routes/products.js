const express = require('express');
const router = express.Router();

const pool = require('../database.js');
router.get('/',async(req,res)=>{
    let listProducts = await pool.query('SELECT * FROM products');
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        listProducts: listProducts
    });
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    let product = await pool.query('SELECT * FROM products WHERE idProduct=?',[id]);

    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        product: product
    });
});

router.post('/create',async(req,res)=>{
    const {name,price} = req.body;
    const products={
        name,price,status:1
    };
    await pool.query('INSERT INTO products set ?', [products])
    res.json({
        status:"200",
        message:"Se ha registrado correctamente",
        product: products
    });
});
router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {name,price} = req.body;
    const product= {name,price};
    await pool.query('UPDATE products SET ? WHERE idProduct = ?',[product,id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente",
        product: product
    });
});
router.post('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query('UPDATE products SET status=0 WHERE idProduct = ?',[id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente"
    });
});
module.exports = router;