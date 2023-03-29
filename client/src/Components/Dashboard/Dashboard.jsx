import { useState, useEffect } from "react"
import { auth } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import { TailSpin } from 'react-loader-spinner'
import Student from "./Student";
import Teacher from "./Teacher";


const Dashboard = () => {
    const { user, checkingStatus } = UserAuth();
    const [claims, setUserClaims] = useState(null)

    useEffect(() => {
        if (user) {
            auth.currentUser?.getIdTokenResult().then(idToken => {
                setUserClaims(idToken?.claims);
            });
        }
    }, [user]);
    console.log(claims)

    if (checkingStatus) {
        return (<TailSpin />)
    }
    else {
        if (claims.student) {
            return (<Student />)
        }
        else if (claims.teacher) {
            return (<Teacher />)
        }
    }
}

export default Dashboard
