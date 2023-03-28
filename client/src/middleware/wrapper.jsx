import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { TailSpin } from 'react-loader-spinner'

export const Wrapper = ({ children, access }) => {
    const { user, checkingStatus } = UserAuth();
    const { roomId } = useParams()
    console.log(roomId)
    const [userClaims, setUserClaims] = useState(null);

    useEffect(() => {
        if (user) {
            auth.currentUser?.getIdTokenResult().then(idToken => {
                setUserClaims(idToken?.claims);
            });
        }
    }, [user]);
    console.log(userClaims)
    if (checkingStatus) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <TailSpin
                    color="#3b82f6"
                    radius={1}
                    height="80"
                    width="80"
                />
            </div>
        );

    }

    if (user && userClaims) {
        if (
            (access === 'Admin' && userClaims.superAdmin) ||
            (access === 'Teacher' && userClaims.teacher) ||
            (access === 'Student' && (userClaims.student || userClaims.superAdmin))
        ) {
            return children;
        } else {
            return <Navigate to='/error' />;
        }
    }

    return null;
};
