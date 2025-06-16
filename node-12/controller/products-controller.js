const { Product } = require("../models/product-model");
const ejs = require("ejs");
const path = require("path");


//View
exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(path.resolve(__dirname, "../pages/index.ejs"), { products: products }, function (err, str) {
    res.status(201).send(str);
  });
};

exports.getAddForm = (req, res) => {
  ejs.renderFile(path.resolve(__dirname, "../pages/add.ejs"), function (err, str) {
    res.status(201).send(str);
  });
}


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

exports.sortProducts = async (req, res) => {
  let query = Product.find();
  let pagesize = 1;
  let page = +req.query.page;
  if (req.query.sortkey) {
    const products = await query.sort({ [req.query.sortkey]: req.query.order }).exec();
    res.status(201).json(products);
  } else if (req.query.page) {
    const products = await query.skip(pagesize * (page - 1)).limit(pagesize).exec();
    res.status(201).json(products);
  } else {
    const products = await query.exec();
    res.status(201).json(products);
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    res.sendStatus(401);
  }
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
    const doc = await Product.deleteOne({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};
