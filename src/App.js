import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "./slices/sessionSlice";
import { getUserData } from "./slices/userSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminRoutes from "./components/AdminComponents/AdminRoutes";
import UserRoutes from "./components/UserComponents/UserRoutes";
import VendorRoutes from "./components/UserComponents/VendorRoutes";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./containers/LandingPage/LandingPage";
import LoginSignup from "./containers/LoginSignup/LoginSignup";
import Cart from "./containers/UserOptions/Cart/Cart";
import MyOrders from "./containers/UserOptions/MyOrders/MyOrders";
import Profile from "./containers/UserOptions/Profile/Profile";
import Dashboard from "./containers/Dashboard/Dashboard";
import VendorLogin from "./containers/LoginSignup/VendorLogin";
import VendorRegister from "./containers/LoginSignup/VendorRegister";
import ProductSection from "./containers/Products/ProductsPage.jsx";
import ProductDetails from "./containers/Products/ProductDetails";
import Shipping from "./containers/UserOptions/Cart/Shipping";
import ConfirmOrder from "./containers/UserOptions/Cart/ConfirmOrder";

import CustomerForm from "./components/CheckoutForms/CustomerForm";
import SellerForm from "./components/CheckoutForms/SellerForm";
import { getProducts } from "./slices/productSlice";
import { getUserCart } from "./slices/cartSlice";

import VendorDashboard from "./containers/Dashboard/VendorDashboard/Dashboard";
import ProductList from "./containers/Dashboard/VendorDashboard/ProductList";
import NewProduct from "./containers/Dashboard/VendorDashboard/NewProduct";
import { getVendorData } from "./slices/vendorSlice";

function App() {
  const dispatch = useDispatch();

  const { sessionUser } = useSelector((state) => state.sessionSlice);

  useEffect(() => {
    dispatch(getSession());
    if (sessionUser._id) {
      dispatch(getUserData());
      dispatch(getUserCart());
    }
    dispatch(getProducts());

    if (sessionUser._id && sessionUser.role === "vendor") {
      dispatch(getVendorData());
    }
  }, [dispatch, sessionUser._id, sessionUser.role]);

  return (
    <GoogleOAuthProvider clientId="627054057375-ojbremuiknd0rqrottovfs5ciog8og6h.apps.googleusercontent.com">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<SellerForm />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<VendorLogin />} />
          <Route path="/register" element={<VendorRegister />} />
          <Route path="/productSection" element={<ProductSection />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} />

          <Route element={<UserRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </Route>

          <Route element={<VendorRoutes />}>
            <Route path="/vendorDashboard" element={<VendorDashboard />} />
            <Route path="/vendorDashboard/productList" element={<ProductList />} />
            <Route path="/vendorDashboard/newProduct" element={<NewProduct />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
