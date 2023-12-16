"use client"
import { useState } from 'react';
import Image from 'next/image'
import Modal from './Modal';
import UserCheck from './UserCheck';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="navbar justify-between bg-base-100">
                <div className="hidden md:block">
                    <a href='/' className="btn btn-ghost text-xl">UniNest</a>
                </div>
                <div className="form-control flex-1">
                    <input type="text" placeholder="Search" className="input input-bordered w-[100%] md:w-[50%]" />
                </div>
                <div className="dropdown dropdown-end pl-8 pr-4" onClick={() => setIsOpen(!isOpen)}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src="/profile.png" width={100} height={100} alt="Picture of the author"/>
                        </div>
                    </div>
                    <ul tabIndex={0} role='menu' className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 divide-y divide-gray-100 ${isOpen ? 'block' : 'hidden'}`}>
                        <div className='py-1' role='none'>
                            <li><a onClick={() => document.getElementById('login_signup_modal').showModal()}>Sign up</a></li>
                            <li><a onClick={() => document.getElementById('login_signup_modal').showModal()}>Log in</a></li>
                        </div>
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
