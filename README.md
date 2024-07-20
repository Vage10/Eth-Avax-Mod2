# Student Grading System

## Overview
The SchoolGradingSystem is a Solidity smart contract that manages a simple school grading system on the Ethereum blockchain. The contract allows an admin to add teachers, and teachers to add students and assign grades to them. It also allows querying student grades and other details.

### Prerequisites
Solidity ^0.8.0
An Ethereum development environment (e.g., Remix, Truffle, Hardhat)

### Contract Details
**State Variables**
admin: The address of the contract admin.
teachers: A mapping of addresses to boolean indicating if an address is a teacher.
students: A mapping of addresses to Student structs containing student information.
studentAddresses: An array of all student addresses.

**Structs**
Student: Contains the following fields:
id: The student's ID.
name: The student's name.
grades: A mapping of subjects to grades.

**Modifiers**
onlyAdmin: Restricts function access to the admin.
onlyTeacher: Restricts function access to teachers.
Constructor
constructor(): Sets the admin to the address that deploys the contract.

**Functions**
   - addTeacher(address teacher): Adds a teacher. Can only be called by the admin.
   - addStudent(address student, uint id, string memory name): Adds a student. Can only be called by a teacher.
   - assignGrade(address student, string memory subject, uint8 grade): Assigns a grade to a student in a specific subject. Can only be called by a teacher.
   - viewGrades(address student, string[] memory subjects): Returns the grades of a student in the specified subjects.
   - getAllStudents(): Returns the addresses of all students.
   - getStudent(address student): Returns the ID and name of a student.
     
## Getting Started
1. Smart Contract: Create a new Solidity file (.sol extension) and paste the following code:
   ```// SPDX-License-Identifier: MIT
        pragma solidity ^0.8.0;
        
        contract SchoolGradingSystem {
            address public admin;
            mapping(address => bool) public teachers;
            mapping(address => Student) public students;
            address[] public studentAddresses;
            
            struct Student {
                uint id;
                string name;
                mapping(string => uint8) grades;
            }
            
            modifier onlyAdmin() {
                require(msg.sender == admin, "Only admin can call this function");
                _;
            }
            
            modifier onlyTeacher() {
                require(teachers[msg.sender], "Only teachers can call this function");
                _;
            }
        
            constructor() {
                admin = msg.sender;
            }
        
            function addTeacher(address teacher) public onlyAdmin {
                teachers[teacher] = true;
            }
        
            function addStudent(address student, uint id, string memory name) public onlyTeacher {
                Student storage newStudent = students[student];
                newStudent.id = id;
                newStudent.name = name;
                studentAddresses.push(student);
            }
        
            function assignGrade(address student, string memory subject, uint8 grade) public onlyTeacher {
                require(students[student].id != 0, "Student does not exist");
                students[student].grades[subject] = grade;
            }
        
            function viewGrades(address student, string[] memory subjects) public view returns (uint8[] memory) {
                uint8[] memory grades = new uint8[](subjects.length);
                for (uint i = 0; i < subjects.length; i++) {
                    grades[i] = students[student].grades[subjects[i]];
                }
                return grades;
            }
        
            function getAllStudents() public view returns (address[] memory) {
                return studentAddresses;
            }
        
            function getStudent(address student) public view returns (uint, string memory) {
                Student storage s = students[student];
                return (s.id, s.name);
            }
        }```
2. JavaScript File: Create a JavaScript file (app.js) and add the following code:
           ```if (typeof window.ethereum !== 'undefined') {
                    window.web3 = new Web3(window.ethereum);
                    window.ethereum.enable();
                } else {
            console.log('No Ethereum browser extension detected.');
        }
        
        const contractAddress = '0x38cB7800C3Fddb8dda074C1c650A155154924C73'; 
        const contractABI = [
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "student",
        				"type": "address"
        			},
        			{
        				"internalType": "uint256",
        				"name": "id",
        				"type": "uint256"
        			},
        			{
        				"internalType": "string",
        				"name": "name",
        				"type": "string"
        			}
        		],
        		"name": "addStudent",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "teacher",
        				"type": "address"
        			}
        		],
        		"name": "addTeacher",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "student",
        				"type": "address"
        			},
        			{
        				"internalType": "string",
        				"name": "subject",
        				"type": "string"
        			},
        			{
        				"internalType": "uint8",
        				"name": "grade",
        				"type": "uint8"
        			}
        		],
        		"name": "assignGrade",
        		"outputs": [],
        		"stateMutability": "nonpayable",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"stateMutability": "nonpayable",
        		"type": "constructor"
        	},
        	{
        		"inputs": [],
        		"name": "admin",
        		"outputs": [
        			{
        				"internalType": "address",
        				"name": "",
        				"type": "address"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [],
        		"name": "getAllStudents",
        		"outputs": [
        			{
        				"internalType": "address[]",
        				"name": "",
        				"type": "address[]"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "student",
        				"type": "address"
        			}
        		],
        		"name": "getStudent",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			},
        			{
        				"internalType": "string",
        				"name": "",
        				"type": "string"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "uint256",
        				"name": "",
        				"type": "uint256"
        			}
        		],
        		"name": "studentAddresses",
        		"outputs": [
        			{
        				"internalType": "address",
        				"name": "",
        				"type": "address"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "",
        				"type": "address"
        			}
        		],
        		"name": "students",
        		"outputs": [
        			{
        				"internalType": "uint256",
        				"name": "id",
        				"type": "uint256"
        			},
        			{
        				"internalType": "string",
        				"name": "name",
        				"type": "string"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "",
        				"type": "address"
        			}
        		],
        		"name": "teachers",
        		"outputs": [
        			{
        				"internalType": "bool",
        				"name": "",
        				"type": "bool"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	},
        	{
        		"inputs": [
        			{
        				"internalType": "address",
        				"name": "student",
        				"type": "address"
        			},
        			{
        				"internalType": "string[]",
        				"name": "subjects",
        				"type": "string[]"
        			}
        		],
        		"name": "viewGrades",
        		"outputs": [
        			{
        				"internalType": "uint8[]",
        				"name": "",
        				"type": "uint8[]"
        			}
        		],
        		"stateMutability": "view",
        		"type": "function"
        	}
        ];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        
        async function addTeacher() {
            const accounts = await web3.eth.getAccounts();
            const teacherAddress = document.getElementById('teacherAddress').value;
            await contract.methods.addTeacher(teacherAddress).send({ from: accounts[0] });
            alert('Teacher added successfully');
        }
        
        async function addStudent() {
            const accounts = await web3.eth.getAccounts();
            const studentAddress = document.getElementById('studentAddress').value;
            const studentId = document.getElementById('studentId').value;
            const studentName = document.getElementById('studentName').value;
            console.log('Adding student:', studentAddress, studentId, studentName);
            await contract.methods.addStudent(studentAddress, studentId, studentName).send({ from: accounts[0] });
            console.log('Student added');
            alert('Student added successfully');
            await loadStudents(); // Refresh the student list
        }
        
        async function assignGrade() {
            const accounts = await web3.eth.getAccounts();
            const studentToGrade = document.getElementById('studentToGrade').value;
            const subject = document.getElementById('subject').value;
            const grade = document.getElementById('grade').value;
            await contract.methods.assignGrade(studentToGrade, subject, grade).send({ from: accounts[0] });
            alert('Grade assigned successfully');
        }
        
        async function viewGrades() {
            const studentToView = document.getElementById('studentToView').value;
            const subjects = ["Math", "Science", "English"]; // example subjects
            const grades = await contract.methods.viewGrades(studentToView, subjects).call();
            let gradesList = '<ul>';
            for (let i = 0; i < subjects.length; i++) {
                gradesList += `<li>${subjects[i]}: ${grades[i]}</li>`;
            }
            gradesList += '</ul>';
            document.getElementById('grades').innerHTML = gradesList;
        }
        
        async function loadStudents() {
            try {
                console.log('Loading students...');
                const studentAddresses = await contract.methods.getAllStudents().call();
                console.log('Student addresses:', studentAddresses);
                let studentList = '<ul>';
                for (let i = 0; i < studentAddresses.length; i++) {
                    const student = await contract.methods.getStudent(studentAddresses[i]).call();
                    console.log('Student:', student);
                    studentList += `<li>ID: ${student[0]}, Name: ${student[1]}, Address: ${studentAddresses[i]}</li>`;
                }
                studentList += '</ul>';
                document.getElementById('studentList').innerHTML = studentList;
            } catch (error) {
                console.error('Error loading students:', error);
            }
        }
        
        window.onload = async function() {
            await loadStudents();
        };```

3. HTML File: Create an HTML file (index.html) and add the following code:
   
   ```<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>School Grading System</title>
       <link rel="stylesheet" href="style.css">
   </head>
   <body>
       <div class="container">
           <h1>School Grading System</h1>
           <div>
               <h2>Add Teacher</h2>
               <input type="text" id="teacherAddress" placeholder="Teacher Address">
               <button onclick="addTeacher()">Add Teacher</button>
           </div>
           <div>
               <h2>Add Student</h2>
               <input type="text" id="studentAddress" placeholder="Student Address">
               <input type="number" id="studentId" placeholder="Student ID">
               <input type="text" id="studentName" placeholder="Student Name">
               <button onclick="addStudent()">Add Student</button>
        </div>
        <div>
            <h2>Assign Grade</h2>
            <input type="text" id="studentToGrade" placeholder="Student Address">
            <input type="text" id="subject" placeholder="Subject">
            <input type="number" id="grade" placeholder="Grade">
            <button onclick="assignGrade()">Assign Grade</button>
        </div>
        <div>
            <h2>View Grades</h2>
            <input type="text" id="studentToView" placeholder="Student Address">
            <button onclick="viewGrades()">View Grades</button>
            <div id="grades"></div>
        </div>
        <div>
            <h2>All Students</h2>
            <div id="studentList"></div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
    <script src="app.js"></script>
   </body>
   </html>```

4. CSS File: Create a CSS file (style.css) and add the following code:
   
             ```.container {
           width: 80%;
           margin: 0 auto;
           padding: 20px;
           text-align: center;
         }
         
         h1, h2 {
           color: #333;
         }
         
         input, button {
           margin: 10px;
           padding: 10px;
           font-size: 1em;
         }
         
         button {
           cursor: pointer;
           background-color: #4CAF50;
           color: white;
           border: none;
           border-radius: 5px;
         }
         
         button:hover {
           background-color: #45a049;
         }
         
         #studentList ul, #grades ul {
           list-style-type: none;
           padding: 0;
         }
         
         #studentList li, #grades li {
           background: #f4f4f4;
           margin: 5px 0;
           padding: 10px;
           border: 1px solid #ddd;
         }```
















