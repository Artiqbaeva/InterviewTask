import { Routes, Route, Link } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

const App = () => {
  return (
    <div className=" p-6 bg-gray-100 min-h-screen">
      <nav className="container mb-6 flex gap-4">
        <Link className="text-blue-600 font-medium" to="/">Products</Link>
        <Link className="text-blue-600 font-medium" to="/add">Add new</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default App;
