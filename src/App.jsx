import { Routes, Route } from "react-router-dom";
import AppRouter from "./website/router";
import AdminRouter from "./admin/router";

function App() {
  return (
    <Routes>
      {/* Website Routes */}
      <Route path="/*" element={<AppRouter />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;