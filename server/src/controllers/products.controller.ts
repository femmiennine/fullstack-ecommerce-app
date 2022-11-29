import { Request, Response } from 'express';
import Product from '../models/products.model';
import { errorResponse, successResponse } from '../helper/responseHandler';
import dev from '../config/secrets';

//POST Create a new product http://localhost:4000/api/v1/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, desc, category, price } = req.body;
    const product = new Product({
      title,
      desc,
      category,
      price,
      inStock: true,
      image: req.file?.filename,
    });
    const newProduct = await product.save();
    if (newProduct) {
      successResponse(res, 201, 'Products successfully created', newProduct);
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//PUT Update an existing product http://localhost:4000/api/v1/products/:_id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const _id = req.params;
    const product = await Product.findOne({ _id: _id });
    if (product) {
      const updatedProduct = await Product.updateOne(
        { _id: _id },
        {
          $set: {
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            price: req.body.price,
            inStock: req.body.inStock,
            image: req.file?.filename,
          },
        },
      );
      if (!updatedProduct) {
        return errorResponse(res, 400, 'Product updated unsuccessfully!');
      } else {
        return successResponse(
          res,
          200,
          'Product successfully updated!',
          updatedProduct,
        );
      }
    } else {
      return errorResponse(res, 404, 'Product with this id not found!');
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//DELETE Delete an existing product http://localhost:4000/api/v1/products/:_id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const _id = req.params;
    const product = await Product.findOne({ _id: _id });
    if (product) {
      await Product.deleteOne({ _id: _id });
      return successResponse(res, 200, `Product succcessfully deleted!`, '');
    } else {
      return errorResponse(res, 404, `Product with this id does not exist.`);
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//GET Get all products http://localhost:4000/api/v1/products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find();
    return successResponse(res, 200, `Products found!`, allProducts);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//GET Get a product http://localhost:4000/api/v1/products/:_id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const _id = req.params;
    const product = await Product.findOne({ _id: _id });
    if (!product) {
      return errorResponse(res, 404, `Product not found!`);
    } else {
      return successResponse(res, 200, `Product found!`, product);
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
