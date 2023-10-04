import {BrowserRouter} from 'react-router-dom';
import './app.css';
import RoutesComponent from '../routes-component/routes-component';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}
