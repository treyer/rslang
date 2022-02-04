import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Sections } from './General/constants';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {Sections.map((el, index) => (
          <Route key={index} path={el.routePath} element={el.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App
