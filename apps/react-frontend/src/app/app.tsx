import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './routes/login/login';
import Register from './routes/register/register';
import Feed from './routes/feed/feed';
import Mi from './routes/mi/mi';
import ProtectedRoute from './components/protected-route/protected-route';
import PublicRoute from './components/public-route/public-route';

export function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/mi" element={<Mi />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
