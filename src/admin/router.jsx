import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import WebsiteManagement from "./pages/WebsiteManagement";
import PropertiesManagement from "./pages/PropertiesManagement";
import CategoriesManagement from "./pages/CategoriesManagement";
import RolesPermissions from "./pages/RolesPermissions";
import CarouselManagement from "./pages/CarouselManagement";
import LocationManagement from "./pages/LocationManagement";
import PropertyListManagement from "./pages/PropertiesListManagement";
import UsersManagement from "./pages/UserManagement";
import TestimonialsManagement from "./pages/TestimonialManagement";
import PropertySubmissionsList from "./pages/PropertySubmissionsList";
import PropertySubmissionDetail from "./pages/PropertySubmissionDetail";


function AdminRoutes() {
    return (
            <Routes>
                <Route path="login" element={<AdminLogin />} />
                
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="/website-management" element={<WebsiteManagement />} />
                <Route path="/properties-management" element={<PropertiesManagement />} />
                <Route path="/categories-management" element={<CategoriesManagement />} />
                <Route path="/roles-permissions" element={<RolesPermissions />} />
                <Route path="/website-management/carousel" element={<CarouselManagement />} />
                <Route path="/website-management/location" element={<LocationManagement />} />
                <Route path="/website-management/testimonials" element={<TestimonialsManagement />} />
                <Route path="/properties/list" element={<PropertyListManagement />} />
                <Route path="/users" element={<UsersManagement />} />
                <Route path="/properties/submissions" element={<PropertySubmissionsList />} />
                <Route path="/properties/submissions/:id" element={<PropertySubmissionDetail />} />
                {/* Future admin routes can be added here */}
              </Route>
            </Routes>
    );
}

export default AdminRoutes;