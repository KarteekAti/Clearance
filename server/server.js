import express from "express";
import cors from "cors";
import student from './routes/students/student-service.js'
import teacher from './routes/teachers/teacher-service.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/student', student)
app.use('/teacher', teacher)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
