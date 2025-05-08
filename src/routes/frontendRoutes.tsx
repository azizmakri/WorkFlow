import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from '../sharedcomponents/login/loginComponent';

function frontendRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<LoginComponent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default frontendRoutes;