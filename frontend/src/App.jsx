import Navbar from "./components/Navbar";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage"; 
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import MedicalUpPage from "./pages/medicalChekup"; 
import HistoryPage from "./pages/HistoryPage";
import { Toaster } from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useChatStore } from "./store/useChatStore";
import { useThemeStore } from "./store/useThemeStore";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import AddFormCRUD from "./pages/PatientPage";
import AddData from "./components/AddData";
import EditData from "./components/UbahData"; // Pastikan ini sesuai dengan path yang benar

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
    const subscribeToMessage = useChatStore((state) => state.subscribeToMessage);
  const unSubscribeFromMessage = useChatStore((state) => state.unSubscribeFromMessage);

  console.log({ onlineUsers });

  useEffect(() => {
  checkAuth();
}, [checkAuth]);

useEffect(() => {
  if (!authUser) return; // Tunggu authUser tersedia

  subscribeToMessage();

  return () => {
    unSubscribeFromMessage();
  };
}, [authUser]); // ✅ Trigger hanya ketika authUser tersedia


  console.log({ authUser });
  
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-8 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      
      <Navbar />

     <Routes>
  {/* Home page bisa diakses semua orang */}
  <Route path="/" element={<MedicalUpPage />} />

  {/* Chat page hanya untuk yang sudah login */}
  <Route path="/HomePage" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

  {/* Auth routes */}
  <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
  <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

  {/* Hanya user login yang bisa akses */}
  <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
  <Route path="/patient" element={authUser ? <AddFormCRUD /> : <Navigate to="/login" />} />
  <Route path="/addData" element={authUser ? <AddData /> : <Navigate to="/login" />} />
  <Route path="/editData/:id" element={authUser ? <EditData /> : <Navigate to="/login" />} />
  <Route path="/history" element={authUser ? <HistoryPage /> : <Navigate to="/login" />} />
</Routes>

       <ToastContainer />
      <Toaster />
    </div>
  );
};

export default App;
