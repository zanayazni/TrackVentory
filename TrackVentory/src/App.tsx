import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import AddProduct from "./pages/AddProduct";
import Edit from "./pages/Edit";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
