"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import api from '@/api';
import { openUserCheckModal } from '@/components/UserCheck';
import { auth_logout, is_logged_in } from '@/components/authUtils';

const Header = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);

    const logout = async () => {
        try {
            const data = await api.del('/auth/session');
            auth_logout();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header>
            <div className="navbar justify-between bg-base-100 shadow-md">
                <div className="hidden md:block">
                    <a href='/' className="btn btn-ghost text-xl">UniNest</a>
                </div>
                <div className="form-control flex-1">
                    <input type="text" placeholder="Search" className="input input-bordered w-[100%] md:w-[50%]" />
                </div>
                <div className="dropdown dropdown-end pl-8 pr-4" onClick={() => { setIsOpen(!isOpen); setIsLoggedIn(is_logged_in()) }}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src="/profile.png" width={100} height={100} alt="Picture of the author" />
                        </div>
                    </div>
                    <ul tabIndex={0} role='menu' className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 divide-y divide-gray-100 ${isOpen ? 'block' : 'hidden'}`}>
                        {loggedIn ? <div className='py-1' role='none'>
                            <li><a onClick={() => logout()}>Log out</a></li>
                            <li><a onClick={() => router.push('/update-password')}>Update password</a></li>
                            <li><a onClick={() => router.push('/profile')}>Profile</a></li>
                        </div> : <div className='py-1' role='none'>
                            <li><a onClick={openUserCheckModal}>Sign up</a></li>
                            <li><a onClick={openUserCheckModal}>Log in</a></li>
                        </div>}
                        <div className='py-1' role='none'>
                            <li><a>Host your home</a></li>
                            <li><a>Help Centre</a></li>
                        </div>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
