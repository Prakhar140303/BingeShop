
import Product from "../../models/product-model.js";


const getFitleredProducts = async (req, res) => {
  const {filters ={}, SortType,page,limit} = req.body;
  console.log(req.body);
  console.log("req Body : ",req.body);
  

  const query = {};
  let sortQuery = {};
    const skip = (page - 1) * limit;

  if (SortType === 1) {
    sortQuery.price = 1; // Ascending
  } else if (SortType ===2) {
    sortQuery.price = -1; // Descending
  } else if (SortType === 3) {
    sortQuery.title = 1;
  } else if (SortType === 4) {
    sortQuery.title = -1;
  }

  if (filters.Brand && filters.Brand.length > 0) {
    query.brand = { $in: filters.Brand };
  }

  if (filters.Category && filters.Category.length > 0) {
    query.category = { $in: filters.Category };
  }

  try {
    const total = await Product.countDocuments(query)
    const products = await Product.find(query).sort(sortQuery).skip(skip).limit(limit);;
    res.status(200).json({
      success: true,
      message: 'Filtered products fetched successfully',
      totalPages: Math.ceil(total / limit),
      data: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
const  getProduct = async (req, res) => {
    try{
        const findProduct = await Product.find().limit(10);
        if(!findProduct){
            return res.status(400).json({
                success : false,
                message : "Product does not exist"
            })
        }
        res.status(200).json({
            success : true,
            message : "Product fetched successfully",
            data : findProduct
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error in add product controller"
        })
    }
};




export {getFitleredProducts,getProduct};