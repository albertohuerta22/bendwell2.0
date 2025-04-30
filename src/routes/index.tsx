import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/Auth/SignUp';
import CompleteAccount from '../pages/Auth/CompleteAccount';
import Login from '../pages/Auth/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/createaccount"
        element={<CompleteAccount session={null} />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
