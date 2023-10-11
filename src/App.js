import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
       </Routes>
    </Router>
    </>
  );
}

export default App;
