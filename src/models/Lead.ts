import mongoose, { Schema, Document, Model } from 'mongoose';
import { LeadStatus, BudgetRange } from '@/types/lead';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  budget: BudgetRange;
  message: string;
  status: LeadStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      enum: {
        values: ['$1k-$5k', '$5k-$10k', '$10k-$25k', '$25k+'],
        message: 'Invalid budget range',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Closed'],
        message: 'Invalid lead status',
      },
      default: 'New',
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance & quick search
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1, isDeleted: 1, createdAt: -1 });
LeadSchema.index({ name: 'text', email: 'text', message: 'text' });

export const Lead: Model<ILeadDocument> =
  mongoose.models.Lead || mongoose.model<ILeadDocument>('Lead', LeadSchema);
