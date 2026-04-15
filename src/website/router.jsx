import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Index";  
import BuyProperties from "./pages/BuyAllProperties"; 
import Categories from "./pages/Categories";
import AboutPage from "./pages/AboutPage";
import PropertyDetails from "./pages/PropertyDetails";
import ContactUs from "./pages/ContactUs";
import ResetPassword from "./pages/ResetPassword";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buy-properties" element={<BuyProperties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        </Route>
    </Routes>
  );
}

export default AppRouter;