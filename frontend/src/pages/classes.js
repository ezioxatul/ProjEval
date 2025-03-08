import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Tab } from "@nextui-org/tabs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export default function Classes() {
  const [backdrop, setBackdrop] = React.useState("blur");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("classes");
  const [className, setClassName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classAdded, setClassAdded] = useState(false);
  const [classDetails, setClassDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [classDataFetched, setClassDataFetched] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [studentDataFetched, setStudentDataFetched] = useState(false);
  const [activeClassId, setActiveClassId] = useState("");

  const handleOpen = (type) => {
    setModalType(type);
    onOpen();
  };

  const fetchClassDetails = async () => {
    try {
      const response = await fetch("http://localhost/getClassDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = await response.json();
        setClassDetails(data.data);
        setClassDataFetched(true);
        console.log("Class details fetched:", data.data); // Log fetched data
      } else {
        console.error("Failed to fetch class details");
      }
    } catch (error) {
      console.error("An error occurred while fetching class details:", error);
    }
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch("http://localhost/getStudentDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = await response.json();
        setStudentDetails(data.data);
        setStudentDataFetched(true);
        console.log("Students fetched:", data.data); // Log fetched data
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("An error occurred while fetching students:", error);
    }
  };

  console.log(activeClass);
  useEffect(() => {
    if (!classDataFetched) {
      fetchClassDetails();
    }
    if (!studentDataFetched) {
      fetchStudentDetails();
    }
  }, []);

  const handleAddClass = async () => {
    setClassAdded(true);
    onOpenChange(false);

    try {
      const response = await fetch("http://localhost/createClass", {
        // Add await here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          className: className,
          section: classSection,
          subject: classSubject,
        }),
      });

      if (response) {
        // Check for response.ok instead of just response
        await fetchClassDetails();
        toast.success("Class added successfully");
        console.log("Class details submitted successfully");
      } else {
        console.error("Failed to submit class details");
      }
    } catch (error) {
      console.error("An error occurred while submitting class details:", error);
    }
  };

  const handleAddStudent = async () => {
    onOpenChange(false);
    try {
      const response = await fetch("http://localhost/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNumber: rollNumber,
          studentName: studentName,
          classId: classDetails[Number(activeClass)]?.id,
        }),
      });

      if (response) {
        toast.success("Student added successfully");
        console.log("Student Added successfully");
        await fetchStudentDetails();
      } else {
        console.error("Failed to submit student details");
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting student details:",
        error
      );
    }
  };

  const getInputValue = (event) => {
    if (event.target.name === "className") {
      setClassName(event.target.value);
    } else if (event.target.name === "classSection") {
      setClassSection(event.target.value);
    } else if (event.target.name === "classSubject") {
      setClassSubject(event.target.value);
    } else if (event.target.name === "rollNumber") {
      setRollNumber(event.target.value);
    } else if (event.target.name === "studentName") {
      setStudentName(event.target.value);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-col sticky top-0 h-screen overflow-y-auto ">
          <div>
            <Sidebar />
            <div>
              <Button
                className="w-40 h-12 ml-6 mt-3 text-md"
                color="primary"
                onPress={() => handleOpen("classes")}
              >
                + New Class
              </Button>
            </div>
          </div>

          {classDetails != undefined && (
            <>
              {classDetails.map((classDetail, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveClass(index);
                    setActiveClassId(classDetail.id);
                  }} // Handle click event
                  className={`bg-gray-100 rounded-md p-2 w-40 ml-6 mt-3 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 ${
                    activeClass === index ? "bg-gray-200 " : ""
                  }`} // Apply different style if active
                >
                  <h3 className="ml-2 font-bold text-gray-800">
                    {classDetail.subject}
                  </h3>
                  <div className="flex ml-2 space-x-2">
                    <div>{classDetail.className}</div>
                    <div>{classDetail.section}</div>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-gray-300 rounded-md py-1 px-4 hover:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                      Edit
                    </button>
                    <button className="bg-gray-300 rounded-md py-1 px-4 hover:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {activeClass !=="" && (
          <>
            <div className="flex-col">
              <div className=" mt-6 text-gray-600 ml-5 text-2xl font-bold">
                <div className="flex space-x-8">
                  <div>
                    {(classDetails != undefined &&
                      classDetails[Number(activeClass)]?.subject) ||
                      ""}
                  </div>
                  <div className="flex space-x-2">
                    <div>
                      {(classDetails != undefined &&
                        classDetails[Number(activeClass)]?.className) ||
                        ""}
                    </div>
                    <div>
                      {(classDetails != undefined &&
                        classDetails[Number(activeClass)]?.section) ||
                        ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-5">
                <Button
                  className="w-36 h-12 ml-5 text-md inline"
                  color="primary"
                  onPress={() => handleOpen("student")}
                >
                  + New Student
                </Button>
              </div>
              <div className=" w-full">
                <Table
                  className="ml-6 mt-8 w-96"
                  removeWrapper
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn className="text-left">ROLL NO.</TableColumn>
                    <TableColumn className="text-left">NAME</TableColumn>
                    <TableColumn className="text-left">ACTION</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {studentDetails != undefined &&
                      studentDetails
                        .filter((student) => student.classId === activeClassId)
                        .map((student, index) => (
                          <TableRow key={index}>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell><div className="flex space-x-5"><FiEdit/><MdDeleteOutline /></div></TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalType === "classes" ? "New Class" : "New Student"}
              </ModalHeader>
              <ModalBody>
                {modalType === "classes" ? (
                  <>
                    <p>Class Name</p>
                    <Input
                      name="className"
                      classNames={{
                        input: "focus:outline-none focus:ring-0",
                      }}
                      label="Enter the class name"
                      onChange={getInputValue}
                    />
                    <p>Section</p>
                    <Input
                      name="classSection"
                      classNames={{
                        input: "focus:outline-none focus:ring-0",
                      }}
                      label="Enter the Section"
                      onChange={getInputValue}
                    />
                    <p>Subject</p>
                    <Input
                      name="classSubject"
                      classNames={{
                        input: "focus:outline-none focus:ring-0",
                      }}
                      label="Enter the subject"
                      onChange={getInputValue}
                    />
                  </>
                ) : (
                  <>
                    <p>Roll Number</p>
                    <Input
                      name="rollNumber"
                      classNames={{
                        input: "focus:outline-none focus:ring-0",
                      }}
                      label="Enter the roll number"
                      onChange={getInputValue}
                    />
                    <p>Student Name</p>
                    <Input
                      name="studentName"
                      classNames={{
                        input: "focus:outline-none focus:ring-0",
                      }}
                      label="Enter the student name"
                      onChange={getInputValue}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {modalType === "classes" ? (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handleAddClass}>
                      Add Class
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handleAddStudent}>
                      Add Student
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <ToastContainer /> */}
    </>
  );
}
