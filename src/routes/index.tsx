import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/SignUp';
import CompleteAccount from '../pages/Auth/CompleteAccount';
import Login from '../pages/Auth/Login';
import AllStretches from '../pages/Stretches/AllStretches/AllStretches';
import SingleStretch from '../pages/Stretches/SingleStretch/SingleStretch';
import StretchWindow from '../pages/StretchWindow/StretchWindow';
import TrainingWindow from '../pages/TrainingWindow/TrainingWindow';
import Routines from '../pages/Routines/Routines';
import SingleRoutine from '../pages/Routines/SingleRoutine';

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

      <Route path="/stretchwindow" element={<StretchWindow />} />
      <Route path="/trainingwindow" element={<TrainingWindow />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/routines/:id" element={<SingleRoutine />} />
    </Routes>
  );
};

export default AppRoutes;
