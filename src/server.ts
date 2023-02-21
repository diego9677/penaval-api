import 'dotenv/config';
import express, { Request, Response, NextFunction } from "express";
import { expressjwt, UnauthorizedError } from "express-jwt";
import morgan from "morgan";
import cors from 'cors';
// rotues
import brandRoute from './routes/BrandRoute';
import clientRoute from './routes/ClientRoute';
import placeRoute from './routes/PlaceRoute';
import productRoute from './routes/ProductRoute';
import proformaRoute from './routes/ProformaRoute';
import provideRoute from './routes/ProviderRoute';
import saleRotue from './routes/SaleRoute';
import shoppingRoute from './routes/ShoppingRoute';
import userRoute from './routes/UserRoute';
import loginRoute from './routes/LoginRoute';

const app = express();

const secretKey = process.env.SECRET_KEY || '';

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// authentication
app.use(
  expressjwt({ secret: secretKey, credentialsRequired: true, requestProperty: 'user', algorithms: ['HS256'] })
    .unless({
      path: ['/api/login']
    })
);

// error habdlers
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
});

// routes
app.use('/api/login', loginRoute);
app.use('/api/brands', brandRoute);
app.use('/api/clients', clientRoute);
app.use('/api/places', placeRoute);
app.use('/api/products', productRoute);
app.use('/api/proformas', proformaRoute);
app.use('/api/providers', provideRoute);
app.use('/api/sales', saleRotue);
app.use('/api/shopping', shoppingRoute);
app.use('/api/users', userRoute);

app.listen(3000);
console.log('server on port 3000');