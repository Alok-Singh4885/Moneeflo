import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProduct extends Document {
  product_name: string;
  user_id: number;
  quantity: number;
  rate: number;
  gst?: number;
  status: '0' | '1';
  created: Date;
  updated: Date;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    product_name: {
      type: String,
      required: true,
      maxLength: 100,
      description: 'Product name must be a string and is required',
    },
    user_id: {
      type: Number,
      required: true,
      description: 'User ID must be an integer and is required',
    },
    quantity: {
      type: Number,
      required: true,
      description: 'Quantity must be an integer and is required',
    },
    rate: {
      type: Number,
      required: true,
      description: 'Rate must be a decimal number and is required',
    },
    gst: {
      type: Number,
      description: 'GST is optional, but if present, must be a decimal number',
    },
    status: {
      type: String,
      required: true,
      enum: ['0', '1'],
      description: 'Status can be either "0" (inactive) or "1" (active)',
    },
    created: {
      type: Date,
      required: true,
      description: 'Creation date must be a date type and is required',
    },
    updated: {
      type: Date,
      required: true,
      description: 'Updated date must be a date type and is required',
    },
  },
  { timestamps: false } 
);

ProductSchema.index({ user_id: 1 }, { name: 'user_id_index' });
ProductSchema.index({ product_name: 1 }, { name: 'product_name_index' });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

const initProductModel = (): Model<IProduct> => {
  return mongoose.model<IProduct>('Product', ProductSchema);
};

export { initProductModel, ProductSchema };
