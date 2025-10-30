import { Schema, model, models, type Document, type Model } from "mongoose";

export interface Subscription extends Document {
  userId: string;
  email: string;
  isSubscribed: boolean;
  unsubscribeToken: string;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<Subscription>(
  {
    userId: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true },
    isSubscribed: { type: Boolean, default: true },
    unsubscribeToken: { type: String, required: true, unique: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Subscription: Model<Subscription> =
  (models?.Subscription as Model<Subscription>) ||
  model<Subscription>("Subscription", SubscriptionSchema);
