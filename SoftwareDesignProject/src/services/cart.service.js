const Cart = require('../models/cart.model');
const db = require('../config/database');
const { $eq } = require('../config/operatorAlias');

const cartService = {
    getCart:(id) =>{
        return new Promise(async (resolve, reject) =>{
            try{
                const cart = Cart.findOne({
                    where: {
                        userId: {$eq: id}
                    },
                    raw:true
                })
                return resolve(cart);
            }
            catch(err){
                return reject(err);
            }
        })
    },
    getCartQuantity: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await Cart.findOne({
                    where: {
                        userId: { $eq: id }
                    },
                    raw: true
                });
                if (!cart) resolve(0);
                const products = JSON.parse(cart.products);
                const quantity = products.reduce((acc, value) => {
                    return acc + Number(value.quantity);
                }, 0);
                return resolve(quantity);
            }
            catch (err) {
                return reject(err);
            }
        })
    },

    createNewCart:(id, productsString) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const cart = await Cart.create({
                    userId: id,
                    products: productsString
                })
                return resolve(cart);
            }
            catch(err){
                return reject(err);
            }
        })
    },
    updateCart:(id, productsString) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const cart = await Cart.update(
                    {
                      products: productsString,
                    },
                    {
                      where: { userId: id },
                    }
                  );
                return resolve(cart);
            }
            catch(err){
                return reject(err);
            }
        })
    },
    deleteCart:(id) => {
        return new Promise(async (resolve, reject)=>{
            try{
                const cart = await Cart.destroy(
                    {
                      where: { userId: id }
                    }
                  );
                return resolve(cart);
            }
            catch(err){
                return reject(err);
            }
        })
    }
}

module.exports=cartService;