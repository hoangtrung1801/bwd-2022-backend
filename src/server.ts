import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CategoriesRoute from './routes/categories.route';
import OrdersRoute from './routes/orders.route';
import PaymentsRoute from './routes/payments.route';
import ProductsRoute from './routes/products.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProductsRoute(),
    new CategoriesRoute(),
    new OrdersRoute(),
    new PaymentsRoute(),
]);

app.listen();
