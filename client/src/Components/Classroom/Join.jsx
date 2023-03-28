import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';


function Join() {
    const { roomId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    console.log(roomId)

    useEffect(() => {
        const joinClass = async () => {
            const token = user.accessToken
            const response = await fetch(`/teacher/joinClass/`, {
                method: 'POST',
                mode: 'cors',
                headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json", },
                body: JSON.stringify({ roomId: roomId })
            })
            navigate('/dashboard')
        }
        joinClass()
    }, [])

    return (
        <div></div>
    )
}
export default Join