import mongoose from "mongoose";
import { ProductModel } from "../models/product.js";

const products = [
    {
        name: "Figura Monkey D. Luffy Second 4",
        image: 'https://tienda-onepiece.com/wp-content/uploads/2024/08/figura-luffy-4-600x600.jpg',
        inCart: false,
        price: 70000,
    },
    {
        name: "Figura Roronoa Zoro",
        image: 'https://image.made-in-china.com/2f0j00jMdbikuCGcqZ/Factory-Supply-Gk-Fight-Roronoa-Zoro-One-Piece-Wholesale-Japanese-Anime-Figure-Toy.webp',
        inCart: false,
        price: 40000,
    },
    {
        name: "Figura Sanji",  
        image: 'https://i5.walmartimages.com/asr/e6efc398-901e-4cef-9c66-df6f2b9193b1.eecc28eee458cf161786523f085b2ff4.webp?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        inCart: false,
        price: 12000,
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb+srv://tomasarmano:mcyc7h3VAzt2ral9@back.o8xfj.mongodb.net/test?retryWrites=true&w=majority&appName=Back");

        await ProductModel.insertMany(products);
        console.log("Productos insertados correctamente");
    } catch (error) {
        console.error("Error insertando productos", error);
    } finally {
        mongoose.connection.close(); 
    }
};

export default seedProducts();