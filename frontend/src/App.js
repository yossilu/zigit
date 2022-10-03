import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Unauthorized from './components/Auth/Unauthorized';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import Project from './components/Project/Project';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={['Admin', 'User']} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['Admin', 'User']} />}>
          <Route path="project" element={<Project />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['Admin']} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;