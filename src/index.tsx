import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import isMobileJS from 'ismobilejs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const isMobile = isMobileJS(window.navigator).any;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {isMobile ?
        <DndProvider backend={TouchBackend}>
          <App />
        </DndProvider> :
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>}
    </BrowserRouter>
  </React.StrictMode>
);
