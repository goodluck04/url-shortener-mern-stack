import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI)
  .then(() => { 
    console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
};

export default connectDatabase;
