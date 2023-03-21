import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signout() {
    const navigate = useNavigate()
    const { user, logout } = UserAuth()
    useEffect(() => {
        async function signOut() {
            await logout()
            navigate('/')
        }
        signOut()
    }, [])
    console.log('Here')
    return (
        <div></div>
    )
}