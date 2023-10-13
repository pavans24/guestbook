import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AdminLogin from './components/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './components/AdminDashboard';
import GuestIn from './components/GuestIn';
import GuestEntry from './components/GuestEntry';

function App() {
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/guest" element={<GuestIn />} />
        <Route path="/guest/entry" element={<GuestEntry />} />
       </Routes>
    </Router>
    </>
  );
}

export default App;
