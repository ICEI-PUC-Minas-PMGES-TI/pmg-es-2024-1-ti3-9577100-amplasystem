import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage.tsx';
import ClientesPage from '@/pages/ClientesPage.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/client" element={<ClientesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;