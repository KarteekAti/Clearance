import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';



function Teacher() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [branch, setBranch] = useState('IT');

    const { createUser } = UserAuth();
    const navigate = useNavigate()


    const onSubmit = async (event) => {
        try {
            const cred = await createUser(email, password);
            await updateProfile(auth.currentUser, { displayName: name })
            const token = cred.user.accessToken
            console.log(token)

            const data = {
                name: name,
                email: email,
                branch: branch,
                designation: designation,
            }

            fetch('/teacher/register', {
                method: 'POST',
                mode: 'cors',
                headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json", },
                body: JSON.stringify(data)
            })
            toast.success('Registration Successful!')
            navigate('/')
        } catch (e) {
            toast.error(e.message)
            console.log(e.message);
        }
    }

    return (
        <div className="flex justify-center bg-gray-100 items-center h-[calc(100vh-64.5px)]">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-2/5">
                <h2 className=" text-2xl font-bold mb-4">Teacher Registration</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        {...register('name', { required: true })}
                        onChange={(event) => setName(event.target.value)}
                    />
                    {errors.name && <p className="text-red-500">Enter your Name</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        {...register("email",
                            {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && <p className="text-red-500">Enter valid Email Address</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors.password && <p className="text-red-500">Please check the Password</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cnf_password"
                        type="password"
                        placeholder="Enter your password again"

                        {...register("confirm_password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                    />
                    {errors.confirm_password && <p className="text-red-500">Password does not match.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="designation">
                        Designation
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="designation"
                        type="text"
                        placeholder="Enter your Designation"
                        value={designation}
                        {...register('designation', { required: true })}
                        onChange={(event) => setDesignation(event.target.value)}
                    />
                    {errors.designation && <p className="text-red-500">Enter your Designation</p>}
                </div>
                <div className="mb-4 flex justify-center items-center gap-2">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
                            Branch
                        </label>
                        <select {...register("branch", { required: true })}
                            onChange={(event) => setBranch(event.target.value)}
                        >
                            <option value="" disabled>Select Branch</option>
                            <option value="IT">IT</option>
                            <option value="CO">CO</option>
                            <option value="EnTC">EnTC</option>
                            <option value="ME">ME</option>
                            <option value="CE">CE</option>
                        </select>
                        {errors.branch && <p className="text-red-500">Enter your Branch.</p>}
                    </div>

                </div>
                <div className="flex items-center  gap-4 justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>

                </div>
            </form>
        </div>
    );
}

export default Teacher;