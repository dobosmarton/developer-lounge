'use client';

type Props = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export const Header: React.FunctionComponent<Props> = ({ onLogin, isLoggedIn, onLogout }) => {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-xl font-black uppercase tracking-wide">Developer Lounge</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {!isLoggedIn && (
            <button onClick={onLogin} className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
          {isLoggedIn && (
            <button onClick={onLogout} className="text-sm font-semibold leading-6 text-gray-900">
              Log out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
