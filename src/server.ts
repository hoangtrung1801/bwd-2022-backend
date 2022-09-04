import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import UploadController from './controllers/upload.controller';
import CategoriesRoute from './routes/categories.route';
import OrdersRoute from './routes/orders.route';
import PaymentsRoute from './routes/payments.route';
import ProductsRoute from './routes/products.route';
import TestRoute from './routes/test.route';
import UploadRoute from './routes/upload.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProductsRoute(),
    new CategoriesRoute(),
    new OrdersRoute(),
    new PaymentsRoute(),
    new UploadRoute(),

    // test route
    new TestRoute(),
]);

app.listen();
