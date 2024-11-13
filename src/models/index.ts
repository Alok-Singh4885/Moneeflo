import initUserModel from "../models/user.model";
import { initProductModel } from "../models/product.model"; 
import {initQuotationModel} from './quotation.model';

const User = initUserModel();
const Product = initProductModel();
const Quotation = initQuotationModel();

export { User, Product, Quotation };
