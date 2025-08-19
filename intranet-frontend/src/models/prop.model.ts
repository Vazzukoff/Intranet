import { Role } from './role.model';
import { TaskFileWithMeta } from './file.model';

export interface SidebarProps {
  role: Role;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface MainContentProps {
  role: Role;
  activeTab: string;
}

export interface FileItemProps {
  file: TaskFileWithMeta;
  onDelete: () => Promise<void>;
  disabled: boolean;
}

export type UploadProps = {
  taskId: number;
  onUploadSuccess?: () => void;
}

export interface AuthFormProps {
  title: string;
  buttonText: string;

  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  formData: {
    username: string;
    password: string;
  };
  fieldErrors: {
    username?: string;
    password?: string;
  };
  error?: string;
  success?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}