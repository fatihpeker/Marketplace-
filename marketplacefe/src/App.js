
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Product from './userPages/product';
import ProductForAdmin from './adminPages/productForAdmin';
import FavoriteList from './userPages/favoriteList';
import BlackList from './userPages/blackList';
import AddProduct from './adminPages/addProduct';
import AddSeller from './adminPages/addSeller';
import MainPage from './pages/main';
import Seller from './userPages/seller';
import Users from './adminPages/users';
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SellerForAdmin from './adminPages/sellerForAdmin';
import SingleProduct from './userPages/singleProduct';
import Searching from './component/search';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path="/">< MainPage /></Route>
          <Route path="/pages/register"> <Register/></Route>
          <Route path="/pages/login">< Login /></Route>
          <Route path="/userPages/product"><Product></Product></Route>
          <Route path="/userPages/favoriteList"> <FavoriteList></FavoriteList> </Route>
          <Route path="/userPages/blackList"> <BlackList></BlackList> </Route>
          <Route path="/adminPages/addProduct"> <AddProduct></AddProduct> </Route>
          <Route path="/adminPages/users"> <Users></Users> </Route>
          <Route path="/adminPages/addProduct/:id" component={(id)=>this.props.match.params.id} > <AddProduct></AddProduct> </Route>
          <Route path="/adminPages/addSeller"> <AddSeller></AddSeller> </Route>
          <Route path="/adminPages/addSeller/:id" component={(id)=>this.props.match.params.id} > <AddSeller></AddSeller> </Route>
          <Route path="/adminPages/productForAdmin"> <ProductForAdmin></ProductForAdmin> </Route>
          <Route path="/adminPages/sellerForAdmin"> <SellerForAdmin></SellerForAdmin> </Route>
          <Route path="/userPages/seller"> <Seller></Seller> </Route>
          <Route path="/userPages/singleProduct/:id" component={(id)=>this.props.match.params.id} > <SingleProduct></SingleProduct> </Route>
          <Route path="/component/search"> <Searching></Searching> </Route>
          <Route path="*" >404 Not Found</Route>
        </Switch>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
