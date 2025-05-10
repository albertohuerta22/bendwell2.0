import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/Signup/SignUp';
import CompleteAccount from '../pages/Auth/CompleteAccount';
import Login from '../pages/Auth/Login/Login';
import AllStretches from '../pages/Stretches/AllStretches/AllStretches';
import SingleStretch from '../pages/Stretches/SingleStretch/SingleStretch';
import StretchWindow from '../pages/StretchWindow/StretchWindow';
import TrainingWindow from '../pages/TrainingWindow/TrainingWindow';
import Routines from '../pages/Routines/Routines';
import SingleRoutine from '../pages/Routines/SingleRoutine';

//special routes
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/createaccount"
        element={<CompleteAccount session={null} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/stretches" element={<AllStretches />} />
      <Route
        path="/stretchwindow"
        element={<StretchWindow demoMode={true} />}
      />
      <Route path="/stretches/:id" element={<SingleStretch />} />

      {/* Protected Routes*/}

      <Route
        path="/stretchwindow"
        element={
          <ProtectedRoute>
            <StretchWindow demoMode={false} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainingwindow"
        element={
          <ProtectedRoute>
            <TrainingWindow />
          </ProtectedRoute>
        }
      />
      <Route
        path="/routines"
        element={
          <ProtectedRoute>
            <Routines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/routines/:id"
        element={
          <ProtectedRoute>
            <SingleRoutine />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes*/}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <div>Place holder for Admin</div>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
