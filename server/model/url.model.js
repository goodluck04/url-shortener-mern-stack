import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
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


const Url = mongoose.model("Url", urlSchema);

export default Url;