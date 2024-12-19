import LoginLayout from "./pages/Login/LoginLayout.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div>
    <Routes>
      {/* Ruta base para iniciar sesión */}
      <Route path="/iniciar-sesion" element={<LoginLayout />}>
        {/* Subruta para cambiar contraseña */}
        <Route path="cambiar-contraseña" element={<LoginLayout />} />
      </Route>
    </Routes>
    </div>
  );
};

export default App;
