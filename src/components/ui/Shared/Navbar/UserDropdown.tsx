'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';
import useAdmin from '@/hooks/useAdmin';

interface UserDropdownProps {
  photoURL?: string | null;
  displayName?: string | null;
  handleLogin: () => void;
}

export default function UserDropdown({ photoURL, handleLogin }: UserDropdownProps) {
  const router = useRouter();
  const [isAdmin] = useAdmin();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="cursor-pointer outline-none border-none bg-transparent">
          <Image
            src={photoURL || '/default-avatar.png'} // Add a default avatar in public folder
            alt="User Profile"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover mt-1.5"
            unoptimized // Bypass Next.js image optimization if external Google/Firebase URL blocks it
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-50" 
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="text-[14px] leading-none text-teal-700 rounded-[3px] flex items-center h-[35px] px-[10px] relative select-none outline-none data-[highlighted]:bg-teal-500 data-[highlighted]:text-white cursor-pointer"
            onClick={() => router.push(`/dashboard/${!isAdmin ? 'edit' : 'admin/admin-dashboard'}`)}
          >
            <div className="flex gap-2 items-center">
              <RxDashboard />
              <p>Dashboard</p>
            </div>
          </DropdownMenu.Item>
          
          <DropdownMenu.Separator className="h-[1px] bg-gray-200 m-[5px]" />
          
          <DropdownMenu.Item
            className="text-[14px] leading-none text-teal-700 rounded-[3px] flex items-center h-[35px] px-[10px] relative select-none outline-none data-[highlighted]:bg-teal-500 data-[highlighted]:text-white cursor-pointer"
            onClick={handleLogin}
          >
            <div className="flex gap-2 items-center">
              <MdLogout />
              <span>Sign Out</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}