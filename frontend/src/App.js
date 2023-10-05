import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Success from './components/Success';
import Cancel from './components/Cancel';
import PageNotFound from "./components/PageNotFound"

function App() {

  return (
<>

<Routes>
<Route path='/' element={<Home/>}/>
<Route path="/success" element={<Success/>}/>
 <Route path="/cancel" element={<Cancel/>}/>
<Route path='*' element={<PageNotFound/>}/>
</Routes>
</>
    );
}
export default App;