import Sidebar from "../components/sidebar/sidebar";
import MainContent from "../components/main-content/main.content";
import Header from "../components/header/header";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Role } from "../models/role.model";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("");
  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    if (role) {
      const tab = initialTab(role);
      setActiveTab(tab);
    }
  }, [role]);
  
  function initialTab(role: Role): string {
    if(role === 'admin') {
      return "admin-tasks";
    }

    if(role === 'employee') {
      return "tasks";
    }

    return "";
  }

  if(!role) {
    return null;
  }
  
  return (
    <section className="flex h-screen bg-gray-100">
        <Sidebar role={role} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden pt-[80px]">
        <Header />
        <MainContent role={role} activeTab={activeTab} />
      </div>
    </section>
  );
}