import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/Users';
import AddressDetails from '../pages/AddressDetails';
import LocationDetails from '../pages/LocationDetails';

const AppRoutes = () => (
    <Routes>
        <Route path="/setLocation" element={<Home />} />
        <Route path="/" element={<Users />} />
        <Route path="/address/:id" element={<AddressDetails />} />
        <Route path="/locations" element={<LocationDetails />} />
    </Routes>
);

export default AppRoutes;
