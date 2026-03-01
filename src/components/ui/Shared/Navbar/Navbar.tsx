'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { stack as Menu } from 'react-burger-menu';
import { enqueueSnackbar } from 'notistack';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';

import PrimaryBtn from '../Button/PrimaryBtn'; // Adjust path
import UserDropdown from './UserDropdown';
import concordLogo from '@/assets/Concord.png'; // Adjust path
import './navbar.css';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Loader from '../Loader/Loader';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import './navbar.css';

interface NavbarItem {
  id: number;
  title: string;
  link: string;
}

const navbarItems1: NavbarItem[] = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Biodatas', link: '/biodatas' },
  { id: 4, title: 'FAQ', link: '/faq' },
  { id: 5, title: 'About Us', link: '/about-us' },
];

export default function Navbar() {
  const { user, logOut, loading } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { scrollDirection, isScrolled } = useScrollDirection();

  const handleLogin = async (): Promise<void> => {
    if (!user) {
      router.push('/login');
      return;
    }
    try {
      await logOut();
      enqueueSnackbar('Logged Out Successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Logout failed', { variant: 'error' });
    }
  };

  const closeMenu = (): void => setMenuOpen(false);

  // Tailwind logic for headroom effect
  const headerClass = `fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out text-black/80 ${
    scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
  }`;

  const navBackgroundClass = `w-screen flex justify-between items-center pr-2 2xl:px-10 transition-colors duration-300 ${
    isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
  }`;

  return (
    <>
      <header className={headerClass} data-aos="fade-down">
        <nav className={navBackgroundClass}>
          <div className="flex items-center py-2">
            <Image 
              src={concordLogo} 
              alt="Concord" 
              className="w-44 lg:w-48 ml-10 lg:ml-0 h-auto" 
              priority 
            />
          </div>
          
          <div className="2xl:space-x-10 space-x-6 lg:flex hidden navitem">
            {navbarItems1.map((item) => (
              <Link 
                key={item.id} 
                href={item.link}
                className={`px-4 py-2.5 shadow rounded cursor-pointer font-semibold tracking-widest ${pathname === item.link ? 'active' : 'bg-white/10'}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="mr-5">
            {loading ? (
              <Loader width={7} height="auto" />
            ) : user ? (
              <UserDropdown 
                photoURL={user.image} 
                displayName={user.name} 
                handleLogin={handleLogin} 
              />
            ) : (
              <div onClick={handleLogin}>
                <PrimaryBtn data="Log In" icon={<MdLogout />} />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Burger Menu - keeping it outside the transforming header to prevent clipping issues */}
      <div className="lg:hidden z-50 relative menu">
        <Menu 
          className="min-h-screen" 
          isOpen={menuOpen} 
          onStateChange={(state: { isOpen: boolean }) => setMenuOpen(state.isOpen)}
        >
          {navbarItems1.map((item) => (
            <Link 
              key={item.id} 
              href={item.link}
              onClick={closeMenu}
              className={`mt-8 w-32 pl-4 py-2.5 rounded duration-500 cursor-pointer ${pathname === item.link ? 'active' : 'bg-black/10'}`}
            >
              {item.title}
            </Link>
          ))}
          <div className="relative mt-10 w-36 text-black" onClick={() => { closeMenu(); handleLogin(); }}>
            <PrimaryBtn data={user ? 'Log Out' : 'Log In'} icon={<MdLogout />} />
          </div>
        </Menu>
      </div>
    </>
  );
}