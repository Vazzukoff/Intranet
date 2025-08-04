import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Home from "./routes/home";
import Register from "./routes/register";
import { AuthProvider } from "./providers/auth.provider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;