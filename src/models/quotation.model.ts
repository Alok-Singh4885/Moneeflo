import mongoose, { Schema, Document, Model } from 'mongoose';

interface IQuotation extends Document {
  user_id: number;
  pdf_path: string;
  status: '0' | '1';
  created: Date;
  updated: Date;
}

const QuotationSchema: Schema<IQuotation> = new Schema<IQuotation>(
  {
    user_id: {
      type: Number,
      required: true,
      description: 'User ID must be an integer and is required',
    },
    pdf_path: {
      type: String,
      required: true,
      maxLength: 255,
      description: 'PDF path must be a string and is required',
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

QuotationSchema.index({ user_id: 1 }, { name: 'user_id_index' });
QuotationSchema.index({ _id: 1 }, { name: 'PRIMARY', unique: true });

const initQuotationModel = (): Model<IQuotation> => {
  return mongoose.model<IQuotation>('Quotation', QuotationSchema);
};

export { initQuotationModel, QuotationSchema };