import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { auth } from '../../firebase';



export default function UserDropdownMenu() {
    const [isStudent, setStudent] = useState(false);
    const [isTeacher, setTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        const role = async () => {
            if (auth.currentUser) {
                auth.currentUser.getIdTokenResult().then(idToken => {
                    setStudent(idToken?.claims.student)
                    setTeacher(idToken?.claims.teacher)
                    setAdmin(idToken?.claims.superAdmin)
                    console.log(isAdmin)
                })
            }
        }
        role()
    })

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="flex items-center">
                        <span className="block">Account</span>
                        <ChevronDownIcon className="h-5 w-5 ml-2 -mr-1" aria-hidden="true" />
                    </span>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {isAdmin && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/addTeacher"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                              block w-full text-left px-4 py-2 text-sm`}
                                    >
                                        Add Teacher
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        {isTeacher && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/createRoom"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                              block w-full text-left px-4 py-2 text-sm`}
                                    >
                                        Create Classroom
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/changePassword"
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                              block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Change Password
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/logout"
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                              block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Logout
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
