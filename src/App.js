import React from 'react'
import Login from './layouts/Login'
import Signup from './layouts/Signup'
import UserDashboard from './layouts/UserDashboard'
import { Routes, Route } from "react-router-dom"
import Home from './layouts/Home'
import Forget from './components/Forget'
import Template from './layouts/Template'
import ErrorPage from './components/ErrorPage'
import Admin from './layouts/Admin'
import AllHomeDetails from './components/tables/AllHomeDetails'
import AllAboutDetails from './components/tables/AllAboutDetails'
import AllProductsServiceDetails from './components/tables/AllProductsServiceDetails'
import AllGalleriesDetails from './components/tables/AllGalleriesDetails'
import AllUserPaymentDetails from './components/tables/AllUserPaymentDetails'
import AllTrackerStatus from './components/tables/AllTrackerStatus'
import SiteIsNot from './layouts/SiteIsNot'
import AllUsers from './components/tables/AllUsers'
import UserUpdate from './layouts/UserUpdate'
import UserHomeDetails from './components/UserHomeDetails'
import { UserAboutDetails } from './components/UserAboutDetails'
import UserProductsDetails from './components/UserProductsDetails'
import UserGalleryDetails from './components/UserGalleryDetails'
import UserPaymentDetails from './components/UserPaymentDetails'
import AllDomainsDetails from './components/tables/AllDomainsDetails'
import AdminLogin from './layouts/AdminLogin'
const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/dashboard/*' element={<UserDashboard />} />
      <Route exact path='/:id' element={<Template />} />
      <Route exact path='/site-is-not-present' element={<SiteIsNot />} />
      <Route exact path='/forget' element={<Forget />} />
      <Route exact path="/admin-login" element={<AdminLogin />} />
      <Route exact path='/admin' element={<Admin />} >
        <Route exact path="users" element={<AllUsers />} />
        <Route exact path="homes" element={<AllHomeDetails />} />
        <Route exact path="about" element={<AllAboutDetails />} />
        <Route exact path="products-services" element={<AllProductsServiceDetails />} />
        <Route exact path="galleries" element={<AllGalleriesDetails />} />
        <Route exact path="userpayments" element={<AllUserPaymentDetails />} />
        <Route exact path="urls-names" element={<AllDomainsDetails />} />
        <Route exact path="edit/:id" element={<UserUpdate flag={false} />} >
          {/* for update */}
          <Route index={true} path='userhome' element={<UserHomeDetails flag={false} admin={true} />} />
          <Route path='userabout' element={<UserAboutDetails flag={false} admin={true} />} />
          <Route path='userproducts' element={<UserProductsDetails flag={false} admin={true} />} />
          <Route path='usergallery' element={<UserGalleryDetails flag={false} admin={true} />} />
          <Route path='userpayment' element={<UserPaymentDetails flag={false} admin={true} />} />
        </Route>

        {/* <Route exact path="payments" element={<h1>Payment Section</h1>} /> */}
        <Route exact path="trackers" element={<AllTrackerStatus />} />
      </Route>
      <Route exact path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App