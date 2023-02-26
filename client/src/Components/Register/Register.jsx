import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../firebase';


function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('FY');
  const [branch, setBranch] = useState('IT');
  const [division, setDivison] = useState('A');

  const { createUser, user } = UserAuth();
  const navigate = useNavigate()


  const onSubmit = async (event) => {
    try {
      const cred = await createUser(email, password);
      const token = cred.user.accessToken
      const data = {
        name: name,
        email: email,
        year: year,
        branch: branch,
        division: division
      }

      fetch('/student/register', {
        method: 'POST',
        mode: 'cors',
        headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        body: JSON.stringify(data)
      })

      navigate('/dashboard')
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 xl:w-1/4">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
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
        <div className="mb-4 flex justify-center items-center gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
              Year
            </label>
            <select {...register("year", { required: true })}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="" disabled>Select Year</option>
              <option value="FY">FY</option>
              <option value="SY">SY</option>
              <option value="TY">TY</option>
              <option value="BE">BE</option>
            </select>
            {errors.year && <p className="text-red-500">Enter your Year.</p>}
          </div>
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
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
              Divison
            </label>
            <select {...register("Divison", { required: true })}
              onChange={(event) => setDivison(event.target.value)}
            >
              <option value="" disabled>Select Divison</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            {errors.Divison && <p className="text-red-500">Enter your Divison.</p>}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link
            to="/"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;