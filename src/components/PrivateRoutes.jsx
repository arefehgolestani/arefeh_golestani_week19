import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom'

import ProductContext from "../context/ProductContext";

function PrivateRoutes() {

    const {
       token
      } = useContext(ProductContext);

  return (
    token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes