// SPDX-License-Identifier: MIT
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
}
