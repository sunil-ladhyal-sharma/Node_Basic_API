const Product = require('../models/product');
const mongoose = require('mongoose');

// get product request controller
exports.get_all_products = (req, res, next) => {

      Product.find()
        .exec()
        .then((doc) => {
          console.log(doc);
          res.status("200").json({
            type : 'GET',
            count : doc.length,
            base_url : 'http://localhost:3000',
            end_point : 'product',
            res : doc
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    }

// add product controllers
exports.add_product = (req, res, next) => {

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage : req.file.path.replace('uploads\\','')
    });
  
    product
      .save()
      .then((resp) => {
        console.log(resp);
        res.status(201).json(product);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }

//   delete product controllers
exports.delete_product = (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json({ doc: doc });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  }

//  update product logiv 
exports.update_product = (req, res, next) => {
    const id = req.params.id;
    Product.updateOne(
      { _id: id },
      { $set: { name: req.body.name, price: req.body.price } }
    )
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }