import { useEffect, useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'firebase/auth'



export default function ChangePass() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate()


    const onSubmit = async (event) => {

        const user = auth.currentUser
        const email = user.email

        const credential = EmailAuthProvider.credential(email, currentPassword);

        await reauthenticateWithCredential(user, credential)
            .then(({ user }) => {
                updatePassword(user, newPassword)
                    .then(() => {
                        toast.success('Password updated successfully');
                    })
                    .catch((error) => {
                        toast.error(error.message)
                        console.error(error);
                    });
                    navigate('/login')

            })
            .catch((error) => {
                toast.error(error.message)
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
            <input type="password" placeholder="Current Password" value={currentPassword}  {...register('currentPassword', { required: true, minLength: 6 })}
                className="mt-4 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {errors?.currentPassword && errors?.currentPassword?.type === "required" && (
                <span className="text-red-500">This field is required</span>
            )}
            {errors?.currentPassword && errors?.currentPassword?.type === "minLength" && (
                <span className="text-red-500">Password must be at least 6 characters</span>
            )}

            <input
                id="confirmCurrentPassword"
                type="password"
                placeholder="Confirm Current Password"
                {...register("confirmCurrentPassword", {
                    required: true,
                    validate: (value) => value === currentPassword,
                })}
                className="mt-4 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
            />
            {errors?.confirmCurrentPassword && errors?.confirmCurrentPassword?.type === "required" && (
                <span className="text-red-500">This field is required</span>
            )}
            {errors?.confirmCurrentPassword && errors?.confirmCurrentPassword?.type === "validate" && (
                <span className="text-red-500">Passwords must match</span>
            )}

            <input
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                {...register("newPassword", { required: true, minLength: 6 })}
                className="mt-4 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors?.newPassword && errors?.newPassword?.type === "required" && (
                <span className="text-red-500">This field is required</span>
            )}
            {errors?.newPassword && errors?.newPassword?.type === "minLength" && (
                <span className="text-red-500">Password must be at least 6 characters</span>
            )}

            <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Change Password
            </button>
        </form>

    );
}