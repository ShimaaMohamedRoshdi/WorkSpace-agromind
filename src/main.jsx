import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider
import store from './redux/store';  // Import your Redux store
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
