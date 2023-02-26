import fapp from '../firebase.js'
import { getFirestore } from "firebase-admin/firestore";
import admin from 'firebase-admin';



const db = getFirestore(fapp)

export const register = async (req, res) => {
    console.log("Inside login function");

    try {
        const uid = req['user'].uid

        admin.auth().setCustomUserClaims(uid, {
            student: true
        })
        const body = req.body;
        const data = {
            Name: body.name,
            Email: body.email,
            Academic_Year: body.year,
            Branch: body.branch,
            Division: body.division
        };
        const ref = await db.collection('student').doc(uid).set(data, { merge: true });
        res.status(200).json({ message: "Login successful!" });
    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
}

