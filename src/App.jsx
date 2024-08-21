

import { Index  } from './views/Index';
import { Detail } from './views/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/pokemon/:id' element={<Detail/>} />
      </Routes>
    
    </BrowserRouter>
  )
}


