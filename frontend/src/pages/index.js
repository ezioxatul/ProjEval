import React from "react";
import { Input } from "@nextui-org/input";
import { UploadButton } from "../utils/uploadthing";
import { Tabs, Tab } from "@nextui-org/tabs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/spinner";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Divider } from "@nextui-org/divider";
import { UploadDropzone } from "../utils/uploadthing";
import { useEffect, useState } from "react";
import { TiBook } from "react-icons/ti";
import { Progress } from "@nextui-org/progress";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

export default function Evaluators() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const [modalType, setModalType] = useState("evaluator"); // State to keep track of modal type
  const [title, setTitle] = useState("");
  const [questionPaperUrl, setQuestionPaperUrl] = useState("");
  const [evaluatorDetails, setEvaluatorDetails] = useState([]);
  const [evaluatorDataFetched, setEvaluatorDataFetched] = useState(false);
  const [answerKeyUrl, setAnswerKeyUrl] = useState("");
  const [classDetails, setClassDetails] = useState([]);
  const [classDataFetched, setClassDataFetched] = useState(false);
  const [activeTab, setActiveTab] = useState("evaluator");
  const [creatingValuator, setCreatingValuator] = useState(false);
  const [classId, setClassId] = useState("");

  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [answerSheetUrls, setAnswerSheetUrls] = useState({});
  const [results, setResults] = useState({});
  const [studentDetails, setStudentDetails] = useState([]);
  const [answerSheets, setAnswerSheets] = useState([]);

  const [studentDataFetched, setStudentDataFetched] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);
  const [evaluationCompleted, setEvaluationCompleted] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [activeClassId, setActiveClassId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const router = useRouter();

  const handleOpen = (type, backdrop) => {
    setModalType(type);
    setBackdrop(backdrop);
    onOpen();
  };

  useEffect(() => {
    fetchEvaluatorDetails();
  }, []);

  const handleChange = (event) => {
    const selectedIndex = event.target.value;
    if (classDetails && selectedIndex >= 0 && selectedIndex < classDetails.length && classDetails[selectedIndex]) {
      setClassId(classDetails[selectedIndex].id);
    } else {
      console.error("Selected index is out of bounds or classDetails is undefined");
      // Optionally, you can set a default value or handle the error as needed
      setClassId(null);
    }
  };
  const fetchEvaluatorDetails = async () => {
    try {
      const response = await fetch("http://localhost/getValuatorDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = await response.json();
        setEvaluatorDetails(data.data);
        setEvaluatorDataFetched(true);
        console.log("Evaluator fetched:", data.data); // Log fetched data
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("An error occurred while fetching evaluators:", error);
    }
  };

  const getResults = async (valuatorId) => {
    try {
      const response = await fetch(
        `http://localhost/getResults/${valuatorId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        const data = await response.json();
        console.log("Results fetched:", data.data); // Log fetched data
        return data.data;
      } else {
        console.error("Failed to fetch results");
      }
    } catch (error) {
      console.error("An error occurred while fetching results:", error);
    }
  };

  const evaluateAnswerSheets = async () => {
    if (validateUpload()) {
      setIsLoading(true);
      const answerSheetArray = Object.entries(answerSheetUrls).map(
        ([studentId, url]) => ({
          studentId,
          answerSheetUrl: url,
        })
      );

      console.log("Answer sheet array:", answerSheetArray);
      for (let i = 0; i < answerSheetArray.length; i++) {
        const answerSheet = answerSheetArray[i];

        try {
          const response = await fetch("http://localhost/evaluateAnswerSheet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerSheet: answerSheet,
            }),
          });

          if (response) {
            const result = await response.json();
            console.log(`Result for student ${answerSheet.studentId}:`, result);
          } else {
            console.error(
              `Failed to evaluate answer sheet for student ${answerSheet.studentId}`
            );
          }
        } catch (error) {
          console.error(
            `An error occurred while evaluating answer sheet for student ${answerSheet.studentId}:`,
            error
          );
        }

        // Update progress
        setEvaluationProgress((i + 1) / answerSheetArray.length);
      }

      setEvaluationCompleted(true);
      toast.success("Evaluation completed successfully");
      setIsLoading(false);

      // Reset answer sheet urls
      setAnswerSheetUrls({});
    }
  };

  const handleUploadComplete = (studentId, url) => {
    setIsUploaded(true);
    setAnswerSheetUrls((prevState) => ({
      ...prevState,
      [studentId]: url,
    }));
  };

  const validateUpload = () => {
    if (!isUploaded) {
      toast.error("Please upload an answer sheet.");
      return false;
    }
    return true;
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

  useEffect(() => {
    if (!classDataFetched) {
      fetchClassDetails();
    }
    if (!studentDataFetched) {
      fetchStudentDetails();
    }
  }, []);

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

  const createValuator = async () => {
    setCreatingValuator(true);
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        questionPaper: questionPaperUrl,
        answerKey: answerKeyUrl,
        classId: classId,
      }),
    };
    try {
      const response = await fetch("http://localhost/createValuator", config);
      const res = await response.json();
      console.log("Response:", res); // Debugging statement
      if (res) {
        toast.success("Evaluator created successfully");
        fetchEvaluatorDetails();
        console.log("Success:", res);
      } else {
        toast.error("Error creating evaluator");
        console.log("Error:", res);
      }
    } catch (err) {
      console.log("Catch Error:", err);
      toast.error("Error creating evaluator");
    } finally {
      setCreatingValuator(false);
    }
  };
  useEffect(() => {
    if (router.pathname === "/classes") {
      setActiveTab("classes");
    } else {
      setActiveTab("evaluator");
    }
  }, [router.pathname]);

  return (
    <>
      <div className="flex">
        <div className="flex-col sticky top-0 h-screen overflow-y-auto ">
          <Sidebar />
          <Button
          className="w-40 h-12 ml-6 mt-3 text-md inline"
          color="primary"
          onPress={() => handleOpen("evaluator", "blur")}
        >
          + New Evaluator
        </Button>
          {evaluatorDetails.map((evaluatorDetail, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveClass(index);
                setActiveClassId(evaluatorDetail.classId);
                console.log("classId", activeClassId);
              }} // Handle click event
              className={`bg-gray-100 rounded-md p-2 w-40 ml-6 mt-3 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 ${
                activeClass === index ? "bg-gray-200 " : ""
              }`} // Apply different style if active
            >
              <h3 className="ml-2 font-bold text-gray-800">
                {evaluatorDetail.title}
              </h3>

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
        </div>
        {activeClass !== "" && (
          <div className=" mb-10">
            <div className=" mt-5 flex text-gray-600 ml-5 text-2xl font-bold">
              <div className="flex-col">
                <div>{evaluatorDetails[Number(activeClass)]?.title || ""} </div>
                <div className="flex text-gray-400 ml-2 text-medium space-x-5">
                  <div className="flex">
                    {(classDetails !== undefined &&
                      classDetails[Number(activeClass)]?.subject) ||
                      ""}
                  </div>
                  <div>
                    {(classDetails !== undefined &&
                      classDetails[Number(activeClass)]?.className) ||
                      ""}{" "}
                    {(classDetails !== undefined &&
                      classDetails[Number(activeClass)]?.section) ||
                      ""}
                  </div>
                </div>
              </div>
              <Button
                color="primary"
                onClick={() => {
                  router.push(
                    "/evaluationResult/" +
                      evaluatorDetails[Number(activeClass)].id
                  );
                }}
                className=" ml-32 mt-2"
              >
                View Results
              </Button>
            </div>
            <div className=" w-96">
              <Divider className="my-4 ml-6" />
            </div>
            <div className=" mt-3 text-gray-500 ml-6 text-lg font-medium">
              <div className="flex-col">
                <div className="mt-3">Question Paper (s)</div>
                <div className="flex my-1">
                  <a
                    href={
                      evaluatorDetails[Number(activeClass)]?.questionPaper || ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={
                        evaluatorDetails[Number(activeClass)]?.questionPaper ||
                        ""
                      }
                      alt="Image"
                      className=" w-28 h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    />
                  </a>
                </div>
                <div className="mt-3">Answer Key /Criteria</div>
                <div className="flex my-1">
                  <a
                    href={
                      evaluatorDetails[Number(activeClass)]?.answerKey || ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={
                        evaluatorDetails[Number(activeClass)]?.answerKey || ""
                      }
                      alt="Image"
                      className=" w-28 h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    />
                  </a>
                </div>
              </div>
              <div className="mt-5">Upload Answer Sheets</div>
              <div className="mt-2 space-y-3">
                {studentDetails !== undefined &&
                  studentDetails
                    .filter((student) => student.classId === activeClassId)
                    .map((studentDetail, index) => (
                      <div key={index}>
                        <div>
                          {index + 1 + "."} {studentDetail.studentName}
                        </div>
                        <div className="flex">
                          {answerSheetUrls[studentDetail.id] ? (
                            <div className="max-w-xs my-4">
                              <a
                                href={answerSheetUrls[studentDetail.id]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={answerSheetUrls[studentDetail.id]}
                                  alt="Image"
                                  className="w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                                />
                              </a>
                            </div>
                          ) : (
                            <UploadDropzone
                              className="h-56"
                              endpoint="mediaPost"
                              onClientUploadComplete={(res) => {
                                const url = res[0].url;
                                console.log("url: "+ res)
                                handleUploadComplete(studentDetail.id, url);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
              </div>
              <Input
                className=" mt-4"
                label="Custom Evaluation Instruction (optional)"
              />
              {isLoading && (
                <Progress
                  size="md"
                  isIndeterminate
                  label="Evaluating answer sheets..."
                  className="max-w-md mt-2 mb-1"
                />
              )}
              <Button
                onClick={evaluateAnswerSheets}
                className=" w-full h-12 text-medium mt-4"
                color="primary"
                isDisabled={isLoading}
              >
                Evaluate
              </Button>
            </div>
          </div>
        )}
      </div>
        

        <Modal
          backdrop={backdrop}
          isOpen={isOpen}
          scrollBehavior="outside"
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Evaluator
                </ModalHeader>
                <ModalBody>
                  <p>Title</p>
                  <Input
                    value={title}
                    classNames={{
                      input: "focus:outline-none focus:ring-0",
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Name of the Exam /Evaluator"
                  />
                  <p>Class</p>

                  <Select
                    placeholder="Select Class"
                    isRequired
                    className="w-full"
                    onChange={handleChange}
                  >
                    <SelectSection title="Classes">
                      {classDetails.map((classDetail, index) => (
                        <SelectItem
                          key={index}
                          value={index}
                        >{`${classDetail.subject} | ${classDetail.className} ${classDetail.section}`}</SelectItem>
                      ))}
                    </SelectSection>
                  </Select>

                  <p>Upload Question Paper</p>
                  <div className="flex">
                    {questionPaperUrl ? (
                      <div className="max-w-xs my-4">
                        <a
                          href={questionPaperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={questionPaperUrl}
                            alt="Image"
                            className="w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                          />
                        </a>
                      </div>
                    ) : (
                      <UploadButton
                        endpoint="mediaPost"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res[0].url); // Removed the non-null assertion operator (!)
                          setQuestionPaperUrl(res[0].url); // Removed the non-null assertion operator (!)
                        }}
                        onUploadError={(error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`); // Removed the type annotation (: Error)
                        }}
                      />
                    )}
                  </div>

                  <p>Upload Answer Key</p>
                  <div className="flex">
                    {answerKeyUrl ? (
                      <div className="max-w-xs my-4">
                        <a
                          href={answerKeyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={answerKeyUrl}
                            alt="Image"
                            className="w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                          />
                        </a>
                      </div>
                    ) : (
                      <UploadButton
                        endpoint="mediaPost"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res[0].url); // Removed the non-null assertion operator (!)
                          setAnswerKeyUrl(res[0].url); // Removed the non-null assertion operator (!)
                        }}
                        onUploadError={(error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`); // Removed the type annotation (: Error)
                        }}
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    isDisabled={!title || !questionPaperUrl || !answerKeyUrl}
                    onPress={onClose}
                    onClick={() => {
                      if (!title || !questionPaperUrl || !answerKeyUrl) return;
                      createValuator();
                    }}
                  >
                    {creatingValuator ? (
                      <span>
                        <Spinner />
                      </span>
                    ) : (
                      "Create Evaluator"
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <ToastContainer />
      
    </>
  );
}
