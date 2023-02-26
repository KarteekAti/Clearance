import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBIlhGD8k4BENNiNlo7fWOC_Mnk59MMZlA",
    authDomain: "clearance-9ee70.firebaseapp.com",
    projectId: "clearance-9ee70",
    storageBucket: "clearance-9ee70.appspot.com",
    messagingSenderId: "435750400387",
    appId: "1:435750400387:web:cdcbd0ea5fe1fe5a91174c6b6",
    measurementId: "G-VG5XZ3HKVF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getStorage(app);


export { auth, db };