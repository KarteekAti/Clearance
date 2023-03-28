import fapp from '../../firebase.js'
import { getFirestore } from "firebase-admin/firestore";
import admin from 'firebase-admin';

const db = getFirestore(fapp)

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


export const register = async (req, res) => {

    try {
        const uid = req['user'].uid

        admin.auth().setCustomUserClaims(uid, {
            teacher: true
        })
        const body = req.body;
        const data = {
            Name: body.name,
            Email: body.email,
            Designation: body.designation,
            Branch: body.branch,
        };
        await db.collection('teacher').doc(uid).set(data, { merge: true });
        res.status(200).json({ message: "Login successful!" });
    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
}

export const createClass = async (req, res) => {


    try {
        const uid = req['user'].uid
        const url = makeid(5)
        if (!req['user'].customClaims.teacher) {
            res.status(403).json({ message: 'Unauthorized Access' })
        }
        else {
            const course = req.body.courseName;
            const code = req.body.courseCode

            const teacher = {
                faculty: req['user'].displayName || 'Teacher',
                courseName: course,
                courseCode: code,
                URL: url,
            }

            const room = {
                faculty: req['user'].displayName || "Teacher",
                id: uid,
                courseName: course,
                courseCode: code,
                URL: url,
            }
            await db.collection('classroom').doc(url).set(room, { merge: true })
            await db.collection('teacher').doc(uid).collection('classroom').doc().set(teacher, { merge: true });
            res.status(200).json({ url: url, message: "Class Created Sucessfully!" });
        }
    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
}

export const joinClass = async (req, res) => {
    try {
        const uid = req['user'].uid
        if (!req['user'].customClaims.student && !req['user'].customClaims?.superAdmin) {
            console.log(!req['user'].customClaims.superAdmin)
            res.status(403).json({ message: 'Unauthorized Access' })
        }
        else {
            const roomId = req.body.roomId
            const docRef = await db.collection('classroom').doc(roomId).get();
            if (docRef.exists) {
                await db.collection('student').doc(uid).collection('classroom').doc(roomId).set(docRef.data(), { merge: true });
            }
        }
        res.status(200).json({ message: "Class Joined Sucessfully!" });
    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
}



