import dotenv from 'dotenv';
import app from './app';
import connectDB from './utils/database';


dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});