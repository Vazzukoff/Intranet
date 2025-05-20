import Sidebar from "../components/sidebar/sidebar";
import MainContent from "../components/main-content/main-content";
import Header from "../components/header/header";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("createTask");

  //useEffect(() => {
    // Si no hay usuario, redirige a login
   // if (!user) {
    //  navigate("/login");
    //}
  //}, [user, navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Si no hay user aún (cargando), puedes mostrar un loader
  if (!user) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        role={user.role}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <MainContent 
          role={user.role}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
