import LogoutButton from '../../UI/logout.button';
import { welcomeText } from '../../lib/welcome.text';
import { useAuth } from '../../context/useAuth';

export default function Header() {

  const user = useAuth().user;
  const welcomeMessage = welcomeText(user);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-black shadow flex items-center justify-between px-8">
      <div className="ml-[220px] flex-1">
        <span className="text-base italic font-light text-white truncate max-w-full">
          {welcomeMessage}
        </span>
      </div>
      <div className="flex-shrink-0">
        <LogoutButton />
      </div>
    </header>
  );
}