import ReactDOM from 'react-dom/client';
import './index.css';
import '@splidejs/splide/css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import "react-image-gallery/styles/css/image-gallery.css";
import Loading from './components/loading-context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <Loading>
        <App />
      </Loading>
    </Provider>
  </>
);

