import { BrowserRouter, Routes, Route } from "react-router-dom";


import ManageProductPage from "./pages/ManageProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PageNoteFound from "./pages/404";
import ProductProvider from "./context/ProductProvider";
import PrivateRoutes from "./components/PrivateRoutes"

function App() {
  
  return (
    <>
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/panel" element={<ManageProductPage />} />
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
      </BrowserRouter>
    </ProductProvider>
    </>
  )
}

export default App
