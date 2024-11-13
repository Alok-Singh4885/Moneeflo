import mongoose, { Model, Schema } from "mongoose";
import { initProductModel } from "../models/product.model";
import { generateInvoicePDF } from '../utils/pdfGenerator';
import path from "path";

interface Product {
  name: string;
  qty: number;
  rate: number;
}
  
export const addProductsService = async (userId: number, products: Product[]) => {
  
  const Product = initProductModel();

  const productData = products.map((product) => ({
    user_id: userId,
    product_name: product.name,
    quantity: product.qty,   
    rate: product.rate,
    gst: product.rate * 0.18,
    created: new Date(),
    updated: new Date(),
    status: '1',
  }));

  const createdProducts = await Product.insertMany(productData);

  const pdfPath = await generateInvoicePDF(createdProducts, userId);

  const Quotation = mongoose.model('Quotation', new Schema({
    user_id: Number,
    pdf_path: String,
  }));
  
  await Quotation.create({
    user_id: userId,
    pdf_path: pdfPath,
  });

  const baseURL = 'http://localhost:8080/invoices';
  const publicPDFPath = `${baseURL}/${path.basename(pdfPath)}`;

  return publicPDFPath;
};

export const viewQuotationsService = async (userId: number) => {
  const Quotation = mongoose.model('Quotation', new Schema({
    user_id: Number,
    pdf_path: String,
  }));

  const quotations = await Quotation.find({ user_id: userId });

  return quotations;
};