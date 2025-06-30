import React from 'react';
import LogoutButton from '../../UI/logout.button';
import { welcomeText } from '../../lib/welcome.text';
import { useAuth } from '../../context/useAuth';

const Header: React.FC = () => {
    
    const user = useAuth().user;
    const welcomeMessage = welcomeText(user);

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-black shadow flex items-center px-8">
  {/* Welcome message */}
  <div className="flex-1 flex justify-center pl-0">
  <p className="text-base font-medium text-white truncate max-w-[60%] text-center transform -translate-x-2">
    {welcomeMessage}
  </p>
</div>


  {/* Logout button */}
  <div>
    <LogoutButton />
  </div>
</header>

  );   
}

export default Header;