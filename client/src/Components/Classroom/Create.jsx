import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { RWebShare } from "react-web-share";



function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [course, setCourse] = useState('');
    const [code, setCode] = useState('');
    const [url, setUrl] = useState(null);

    const { user } = UserAuth();
    const navigate = useNavigate()


    const onSubmit = async (event) => {
        try {

            const token = user.accessToken
            const data = {
                courseName: course,
                courseCode: code,
            }
            const response = await fetch('/teacher/createClass/', {
                method: 'POST',
                mode: 'cors',
                headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json", },
                body: JSON.stringify(data)
            })
            const body = await response.json()
            toast.success('Classroom Created')
            console.log(body)
            setUrl(`/join/${body.url}`)
        } catch (e) {
            toast.error(e.message)
            console.log(e.message);
        }
    }

    return (
        <div className="flex justify-center bg-gray-100 items-center h-[calc(100vh-64.5px)]">
            {!url ? (<form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <h2 className=" text-2xl font-bold mb-4">Create a Class</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Course Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter Course Name*"
                        value={course}
                        {...register('name', { required: true })}
                        onChange={(event) => setCourse(event.target.value)}
                    />
                    {errors.name && <p className="text-red-500">Enter Course Name</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="code">
                        Course Code
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="code"
                        type="text"
                        placeholder="Enter Course Code*"
                        value={code}
                        {...register("code",
                            {
                                required: true,
                            })}
                        onChange={(event) => setCode(event.target.value)}
                    />
                    {errors.code && <p className="text-red-500">Enter Course Code</p>}
                </div>

                <div className="flex items-center  gap-4 justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create
                    </button>

                </div>
            </form>) :
                (
                    <RWebShare
                        data={{
                            text: "Join the classroom for signing Clearance Sheet.",
                            url: url,
                            title: `Join ${course} by ${user.displayName}`,
                        }}
                    >
                        <button>Share 🔗</button>
                    </RWebShare>

                )}

        </div>
    );
}

export default Create;