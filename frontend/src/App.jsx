import LoginLayout from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Login/Register/RegisterPage.jsx";
import ForgotPass from "./pages/Login/ForgotPass/ForgotPass.jsx";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
        {/* Ruta base para iniciar sesión */}
        <Route path="/iniciar-sesion" element={<LoginLayout />}>
          {/* Subruta para cambiar contraseña */}
          <Route path="cambiar-contraseña" element={<ForgotPass />} />
          <Route path="registrarse" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
