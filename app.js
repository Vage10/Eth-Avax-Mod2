if (typeof window.ethereum !== 'undefined') {
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
};
