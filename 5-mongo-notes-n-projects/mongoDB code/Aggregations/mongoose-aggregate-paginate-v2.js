//! mongoose-aggregate-paginate-v2 is not included in Mongoose by default.
//! It is a separate plugin that you must install and register manually.

//?What it is
//mongoose-aggregate-paginate-v2 is a plugin that adds pagination support to aggregation pipelines.

//?Without it:
//You use .aggregate() manually
//Then add $skip and $limit

//?With the plugin:
//You get .aggregatePaginate() helper
//Cleaner pagination for complex pipelines

import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);

const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;

const aggregate = Product.aggregate([
  { $match: { price: { $gt: 1000 } } },
  { $sort: { price: -1 } }
]);

const options = {
  page,
  limit
};

const result = await Product.aggregatePaginate(aggregate, options);

res.json(result);