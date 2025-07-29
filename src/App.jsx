import Login from "./components/Login/Login"
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import React from 'react';
import ContextProvider from '../src/hooks/Context'
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {

  return (
      <ContextProvider>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" index element={
        <ProtectedRoute>
          <Home type={"all"} />
        </ProtectedRoute>
      } />
      <Route path="/All-Tasks" element={
        <ProtectedRoute>
          <Home type={"all"} />
        </ProtectedRoute>
      } />
      <Route path="/Pending-Tasks" element={
        <ProtectedRoute>
          <Home type={"pending"} />
        </ProtectedRoute>
      } />
      <Route path="/Completed-Tasks" element={
        <ProtectedRoute>
          <Home type={"completed"} />
        </ProtectedRoute>
      } />
      <Route path="/Active-Tasks" element={
        <ProtectedRoute>
          <Home type={"active"} />
        </ProtectedRoute>
      } />
    </Routes>
      </ContextProvider>
  )
}

export default App
