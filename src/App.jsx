import { Index } from './views/Index';
import { Detail } from './views/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import {  I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import global_es from './translations/es/global.json';
import global_en from './translations/en/global.json';

// Configuración de i18next
i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'es', // idioma por defecto
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

export function App() {


  return (
    <I18nextProvider i18n={i18next}>
      <Row>
        <Col className="md-1 navbar">
          <img
            src="./../../public/img/elkingutierrex.png"
            className="w-image"
          />
          <h1>Poke egx</h1>
          
          <img src="./../../public/img/loading.gif" className="w-image" />
        </Col>
      </Row>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pokemon/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}
