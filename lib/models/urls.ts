import { Schema, model, models } from "mongoose";
import shortId from "shortid";

export const UrlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => shortId.generate(),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Url = models.Url || model("Url", UrlSchema);

export default Url;
