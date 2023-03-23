import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import UserDropdownMenu from './UserDropdownMenu';



function Navbar() {
    const { user } = UserAuth();
    const [navbar, setNavbar] = useState(false);

    const isStudent = useState(false);

    useEffect(() => {
        user.getIdTokenResult().then(idToken => {
            console.log(idToken.claims.student)
        })
    })

    return (
        <nav className="sticky top-0 z-10 flex flex-row items-center justify-between px-2 py-3 bg-white text-blue-500 ">
            <div className="container px-4 xs:mx-auto sm:mx-0 max-w-full flex sm:flex-row items-center justify-between ">
                <div className="flex flex-row justify-between w-full">
                    <a href='/'><h1 className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap ">PCCOE</h1></a>
                    <button className='cursor-pointer text-xl px-4 py-1 border border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none' type='button' onClick={() => setNavbar(!navbar)}></button>
                </div>
                {user && (
                    <div className={'flex flex-row items-center justify-center sm:px-12 max-w-full gap-6'}>
                        <Link
                         to='/dashboard'
                            onClick={() => setNavbar(!navbar)}
                            className='cursor-pointer px-1 py-2 flex items-center leading-snug hover:opacity-75 hover:underline'>Home</Link>
                        <UserDropdownMenu />

                    </div>

                )
                }
            </div>
        </nav>
    )
}

export default Navbar;