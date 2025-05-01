import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/SignUp';
import CompleteAccount from '../pages/Auth/CompleteAccount';
import Login from '../pages/Auth/Login';
import AllStretches from '../pages/Stretches/AllStretches/AllStretches';
import SingleStretch from '../pages/Stretches/SingleStretch/SingleStretch';

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
      <Route path="/stretches" element={<AllStretches />} />
      <Route path="/stretches/:id" element={<SingleStretch />} />
    </Routes>
  );
};

export default AppRoutes;
