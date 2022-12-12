import { Request, Response } from 'express';
import Product from '../models/products.model';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { v4 as uuidv4 } from 'uuid';

//POST Create a new product http://localhost:4000/api/v1/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const productId = uuidv4();
    const { title, desc, category, price, quantity } = req.body;
    const product = new Product({
      productId: productId,
      title,
      desc,
      category,
      price,
      quantity,
      image: req.file?.path,
    });
    const newProduct = await product.save();
    if (newProduct) {
      successResponse(
        res,
        201,
        'Product successfully added to list',
        newProduct,
      );
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//PUT Update an existing product http://localhost:4000/api/v1/products/:_id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (product) {
      const updatedProduct = await Product.updateOne(
        { productId: req.params.productId },
        {
          $set: {
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.file?.path,
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

// GET Get all products http://localhost:4000/api/v1/products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });
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
