const { Product } = require("../models/product-model");

// Create

exports.createProducts = async (req, res) => {
  const product = new Product(req.body);

  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(201).json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedproduct = await Product.findById(id);
    res.status(201).json(searchedproduct);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await Product.findOneAndReplace(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.updateProduct = async (req, res) => {
 const id = req.params.id;

  try {
    const doc = await Product.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await Product.deleteOne({_id:id});
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};
