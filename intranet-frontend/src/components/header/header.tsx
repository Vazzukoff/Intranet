import React from 'react';
import LogoutButton from '../../UI/logout-button';

const Header: React.FC = () => {
    return (
        <div className="grid bg-black w-screen h-[80px] fixed top-0 left-0 right-0">
            <LogoutButton />
        </div>
    );
}

export default Header;