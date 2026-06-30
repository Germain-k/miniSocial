import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./application/hooks/useAuth";
import ProtectedRoute from "./presentation/components/ProtectedRoute";
import LoginPage  from "./presentation/pages/LoginPage";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
            
          <Route path="/" element= {<ProtectedRoute><App/></ProtectedRoute>}  />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);