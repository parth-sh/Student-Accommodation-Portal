"use client"
import { useState } from 'react';
import Modal from './Modal';
import Login from './Login';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a href='/' className="btn btn-ghost text-xl">UniNest</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto hover:bg-gray-100" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setIsOpen(!isOpen)}>
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
            </div>
            <Modal id="login_signup_modal">
                <Login/>
            </Modal>
        </header>
    );
};

export default Header;
