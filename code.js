
// const http = require('http');
// const fs=require('fs');

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'indexhtml' });
//     fs.readFile('index.html',function(err,data){
//         res.write(data);
//         return res.end();

//     })
   
// }).listen(3000);

// const http = require('http');

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'indexhtml' });
//         res.end(`
//             <div style="text-align: center">
//  <h1>Blog post title</h1>
//  <h2>Blog post subtitle</h2>
//  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//      Sed tincidunt, sapien vitae vestibulum tristique, mauris 
//      dui efficitur tortor, tempus viverra massa lacus nec sem. Proin risus
//       felis, porta vel lorem vitae, lobortis pulvinar sapien. Integer condimentum
//        libero in nibh ullamcorper pharetra. Integer faucibus rutrum eros, ac tincidunt felis 
//        consectetur sollicitudin. Nunc sed ultrices ex, in gravida diam. </p>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, sapien vitae vestibulum tristique, 
// //             mauris dui efficitur tortor, tempus viverra massa lacus nec sem. Proin risus felis, porta vel lorem vitae,
// //              lobortis pulvinar sapien. Integer condimentum libero in nibh ullamcorper pharetra. Integer faucibus rutrum eros,
// //               ac tincidunt felis consectetur sollicitudin. Nunc sed ultrices ex, in gravida diam. </p> </div>`
// //         );   
// // }).listen(3000);
// // const url = require('url')
// //  let addr ='http://localhost:5000/test.html?id=101&name=John'
// //  let result = url.parse(addr,true);
// // console.log(result.id);
// // console.log(result.name);
// let express = require('express');
// let url = require('url');
// let app = express();
// app.get('/getStudent/:studentID', (req, res) => {
//     const studentID = parseInt(req.params.studentID);
//     const student = studentDatabase.find(student => student.studentID === studentID);

//     if (!student) {
//         return res.status(404).json({ error: 'Student not found' });
//     }

//     res.json(student);
// });
// app.get('/getTopper', (req, res) => {
//     if (studentDatabase.length === 0) {
//         return res.status(404).json({ error: 'No students found' });
//     }

//     // Find the student with the highest GPA
//     const topper = studentDatabase.reduce((prev, current) => (prev.GPA > current.GPA ? prev : current));

//     res.json({ studentID: topper.studentID, studentName: topper.studentName });
// });
// app.listen(5000, () => {
//  console.log('Server has started!');
// }); 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample in-memory storage for simplicity. In a real-world scenario, you would use a database.
let studentData = [{student:"prajwal k",id:101,gpa:3.7},{student:"teja k",id:102,gpa:.7},{student:"ravi",id:103,gpa:3.7}];

app.use(bodyParser.json());

// Endpoint to accept POST requests for adding a new student
app.post('/students', (req, res) => {
    const { studentId, studentName, gpa } = req.body;

    // Check if the student ID is unique
    if (studentData.some(student => student.studentId === studentId)) {
        return res.status(400).json({ error: 'Student ID must be unique' });
    }

    // Add the new student to the data
    studentData.push({ studentId, studentName, gpa });
    res.status(201).json({ message: 'Student added successfully' });
});

// Endpoint to retrieve all student data
app.get('/students', (req, res) => {
    res.json(studentData);
});

// Endpoint to retrieve data of a particular student by ID
app.get('/students/:studentId', (req, res) => {
    const { studentId } = req.params;
    const student = studentData.find(student => student.studentId === studentId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
});

// Endpoint to find the topper among the class
app.get('/topper', (req, res) => {
    if (studentData.length === 0) {
        return res.status(404).json({ error: 'No students found' });
    }

    // Find the student with the highest GPA
    const topper = studentData.reduce((prev, current) => (prev.gpa > current.gpa) ? prev : current);

    res.json({ topperId: topper.studentId, topperName: topper.studentName });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 