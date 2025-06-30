import { Role } from './role.model';

export interface SidebarProps {
    role: Role;
    activeTab: string;
    onTabChange: (tab: string) => void;
  }

  export interface MainContentProps {
    role: Role;
    activeTab: string;
  }
  