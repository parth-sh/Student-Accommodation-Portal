"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import api from '@/api';
import Modal from '@/components/Modal';
import UserCheck from './UserCheck';

const Header = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);

    const logout = async () => {
        try {
            const data = await api.del('/auth/session');
            localStorage.removeItem("loggedIn");
            location.reload();
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
                <div className="dropdown dropdown-end pl-8 pr-4" onClick={() => { setIsOpen(!isOpen); setIsLoggedIn(localStorage.getItem('loggedIn')) }}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src="/profile.png" width={100} height={100} alt="Picture of the author" />
                        </div>
                    </div>
                    <ul tabIndex={0} role='menu' className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 divide-y divide-gray-100 ${isOpen ? 'block' : 'hidden'}`}>
                        {loggedIn ? <div className='py-1' role='none'>
                            <li><a onClick={() => logout()}>Log out</a></li>
                            <li><a onClick={() => router.push('/update-password')}>Update password</a></li>
                        </div> : <div className='py-1' role='none'>
                            <li><a onClick={() => document.getElementById('login_signup_modal').showModal()}>Sign up</a></li>
                            <li><a onClick={() => document.getElementById('login_signup_modal').showModal()}>Log in</a></li>
                        </div>}
                        <div className='py-1' role='none'>
                            <li><a>Host your home</a></li>
                            <li><a>Help Centre</a></li>
                        </div>
                    </ul>
                </div>
            </div>
            <Modal id="login_signup_modal">
                <UserCheck />
            </Modal>
        </header>
    );
};

export default Header;
