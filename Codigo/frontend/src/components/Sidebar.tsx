import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import logo from '../assets/logo.png';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

type SidebarProps = {
    children: ReactNode;
};

type SidebarItemProps = {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    location: string;
};

type SidebarContextType = {
    expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({
    expanded: true,
});

export default function Sidebar({ children }: SidebarProps): JSX.Element {
    const [expanded, setExpanded] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <>
            <aside className="h-screen">
                <nav
                    className="h-full flex flex-col  border-r shadow-sm"
                    style={{
                        background: '#00747C',
                    }}
                >
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src={logo}
                            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
                            alt="Logo"
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 ease-in-out"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <img src={logo} className="w-10 h-10 rounded-md" alt="Logo Placeholder" />
                        <div
                            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'} `}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold text-white">Ampla System </h4>
                                <span className="text-xs text-white">{user.email}</span>
                            </div>
                            <MoreVertical size={20} onClick={() => {}} />
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
function useCurrentURL() {
    const location = useLocation();
    const params = useParams();

    return {
        pathname: location.pathname,
        search: location.search,
        params,
    };
}
export function SidebarItem({ icon, text, active, alert, location }: SidebarItemProps): JSX.Element {
    const { expanded } = useContext(SidebarContext);
    const navigate = useNavigate();
    const { pathname, search, params } = useCurrentURL();
    if (pathname == location) {
        active = true;
    }
    return (
        <li
            onClick={() => {
                navigate(location);
            }}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
        ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-white hover:text-gray-500'}`}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2 '}`} />}

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 z-50 text-indigo-800 text-sm invisible opacity-20
                 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
/* eslint-enable */
