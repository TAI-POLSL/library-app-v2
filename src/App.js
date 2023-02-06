import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import MissingPage from './pages/MissingPage';
import AdminTestPage from './pages/AdminTestPage';
import EmployeeTestPage from './pages/EmployeeTestPage';

import SecurityOwnPages from './pages/SecurityOwnPages';
import SecurityAllPages from './pages/SecurityAllPages';
import SignUpPage from './pages/SignUpPage';
import TableBookPage from './pages/TableBookPage';
import AddBookPage from './pages/AddBookPage';
import DeleteUserPage from './pages/DeleteUserPage';
import DeleteBookPage from './pages/DeleteBookPage';
import TableUsersPage from './pages/TableUsersPage';
import RentBookPage from './pages/RentBookPage';

const ROLES = {
  ADMIN: 0,
  EMPLOYEE: 1,
  CLIENT: 2
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="login" element={<LoginPage />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.CLIENT]} />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/test/admin" element={<AdminTestPage />} />
          <Route path="/create" element={<SignUpPage />} />
          <Route path="/tableusers" element={<TableUsersPage />} />
          <Route path="/delete" element={<DeleteUserPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.EMPLOYEE]} />}>
          <Route path="/test/employee" element={<EmployeeTestPage />} />
          <Route path="/rentbooks" element={<RentBookPage />} />
          <Route path="/addbook" element={<AddBookPage />} />
          {/* <Route path="/deletebook" element={<DeleteBookPage />} /> */}
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/test/table/all" element={<SecurityAllPages />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.CLIENT]} />}>
          <Route path="/test/table" element={<SecurityOwnPages />} />
          <Route path="/test/books" element={<TableBookPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
