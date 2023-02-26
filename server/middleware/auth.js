import { getAuth } from "firebase-admin/auth";
import fapp from '../firebase.js'


export default async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const decodedToken = await getAuth().verifyIdToken(token);
        const user = await getAuth().getUser(decodedToken.uid);
        console.log(user)
        req['user'] = user
        return next();
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: "INVALID_TOKEN",
        });
    }
}