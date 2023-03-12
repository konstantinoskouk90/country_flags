import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Country from 'pages/Country';
import PageNotFound from 'pages/PageNotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countries/:id" element={<Country />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
