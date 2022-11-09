import express from 'express';
import dev from './config/secrets';
import connectDB from './config/db';

//import routes
import userRoutes from './routes/users.route';

//app
const app = express();

//test route
app.get('/', (req, res, next) => {
  res.send('Welcome to the Server!');
});

//routes middleware
app.use('/api/v1/users', userRoutes);

//port & db
const port = dev.app.port || 4008;
app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
