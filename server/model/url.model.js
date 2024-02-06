import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        urlName:{
          type:String,
          default: "Undefined"
        },
        redirectURL: {
            type: String,
            required: true,
        },
        userId:{
            type:String,
            required:true,
        },
        visitHistory: [ { timestamp: { type: Number } }],
    },
    { timestamps: true }
);

const virtual = urlSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
urlSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});


const UrlModel = mongoose.model("UrlModel", urlSchema);

export default UrlModel;