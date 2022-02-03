import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Sections } from './General/constants';
import Header from './Components/header/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {Sections.map((el) => (
          <Route key={el.id} path={el.routePath} element={el.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
