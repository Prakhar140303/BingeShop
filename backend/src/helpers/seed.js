// scripts/seed-once.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Product from "../models/product-model.js"; // adjust path if needed

dotenv.config();

const DUMMYURL = "https://dummyjson.com/products?limit=0"; // returns all if supported

function convert(d) {
  const price = typeof d.price === "number" ? d.price : parseFloat(d.price) || 0;
  const discount = typeof d.discountPercentage === "number" ? d.discountPercentage : 0;
  const salePrice = +(price * (1 - discount / 100)).toFixed(2);
  const image =
    Array.isArray(d.images) && d.images.length ? d.images[0] : d.thumbnail || "https://via.placeholder.com/300";
  return {
    image,
    title: d.title || "Untitled",
    description: d.description || "",
    category: d.category || "uncategorized",
    brand: d.brand || "Generic",
    price,
    salePrice,
    totalStock: typeof d.stock === "number" ? d.stock : 0,
  };
}

async function seed() {
  try {
    // if (!process.env.MONGO_URI) throw new Error("Set MONGO_URI in .env");
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const count = await Product.countDocuments();
    // if (count > 0) {
    //   console.log(`Products collection already has ${count} docs — aborting seed (one-time).`);
    //   process.exit(0);
    // }

    const { data } = await axios.get(DUMMYURL);
    const items = (data && data.products) || [];
    if (!items.length) {
      console.log("No products fetched from API — aborting.");
      process.exit(1);
    }

    const docs = items.map(convert);
    await Product.insertMany(docs);
    console.log(`Inserted ${docs.length} products ✅`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
