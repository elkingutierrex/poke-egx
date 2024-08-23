

import { Index  } from './views/Index';
import { Detail } from './views/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

export function App() {


  return (
  <>
      <Row >
      <Col className="md-1 navbar">
        <img src="./../../public/img/elkingutierrex.png" className="w-image"></img>
        <h1> Poke egx</h1>
        <img src="./../../public/img/loading.gif" className="w-image"></img>
      </Col>
    </Row>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>} />
          <Route path='/pokemon/:id' element={<Detail/>} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}


