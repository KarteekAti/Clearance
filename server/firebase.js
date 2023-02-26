import admin from "firebase-admin";
import serviceAccount from './clearance-9ee70-firebase-adminsdk-4vinx-a389552355.json' assert { type: "json" };

const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

export default app
