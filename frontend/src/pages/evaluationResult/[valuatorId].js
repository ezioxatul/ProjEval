import { Tabs, Tab } from "@nextui-org/tabs";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import React, { Component } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useRouter } from "next/router";

export default function EvaluationResult() {
  const router = useRouter();
  const [results, setResults] = useState({});
  const { valuatorId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("answerSheets");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost/getResults/${valuatorId}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching evaluation results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (valuatorId) {
      fetchResults();
    }
  }, [valuatorId]);

  useEffect(() => {
    console.log("Results: ", results);
  }, [results]);

  return (
    <>
      <div className=" mt-2 ml-2 flex space-x-4">
        <Button
          onClick={() => {
            router.push("/");
          }}
          variant="bordered"
          className=" h-8 w-2 font-medium text-gray-600"
        >
          Home
        </Button>
        <div className=" text-large font-bold text-gray-600"> Results</div>
      </div>
      <Tabs className="mt-2 flex justify-center" color="primary">
        <Tab key="Marksheet" title="Marksheet">
          <div className="flex-col">
            <div className=" ml-48 mt-4">
              <div className="text-gray-700 text-xl font-bold">
                {results.valuator ? results.valuator.title : ""}
              </div>
              <div className="flex space-x-5 text-gray-500 text-medium font-bold">
                <div>
                  {results.classDetails ? results.classDetails.subject : ""}
                </div>
                <div>
                  {results.classDetails ? results.classDetails.className : ""}
                  {"  "}
                  {results.classDetails ? results.classDetails.section : ""}
                </div>
              </div>
              <Button  onClick={() => window.print()} className=" mt-3 w-32" color="primary">
                Print Marksheet
              </Button>
              <Table removeWrapper className="mt-5 w-3/4">
                <TableHeader>
                  <TableColumn className="text-left">Roll Number</TableColumn>
                  <TableColumn className="text-left">Student Name</TableColumn>
                  <TableColumn className="text-left">Score</TableColumn>
                </TableHeader>
                <TableBody>
                  {results.students &&
                    results.students.length > 0 &&
                    results.students.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{student.student.rollNumber}</TableCell>
                        <TableCell>{student.student.studentName}</TableCell>
                        <TableCell>
                          {student.results &&
                          student.results.length > 0 &&
                          student.results[0].result &&
                          student.results[0].result.total_score
                            ? `${student.results[0].result.total_score[0]}/${student.results[0].result.total_score[1]}`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Tab>
        <Tab key="Detailed View" title="Detailed View">
          <div>
            <div className="flex justify-left ml-44">
              <Select placeholder="Select Student" className="w-1/4">
                <SelectSection title="Students">
                  {results.students &&
                    results.students.length > 0 &&
                    results.students.map((student, index) => (
                      <SelectItem key={index}>
                        {student.student.studentName}
                      </SelectItem>
                    ))}
                </SelectSection>
              </Select>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md w-3/4 h-screen p-4 m-5 flex mx-auto">
            <div className="flex space-x-24 center">
              <div className="flex-col">
                <div className="flex mb-4">
                  <div className="ml-10 text-lg font-bold">
                    <div>Total marks</div>
                    <div className="ml-8 text-2xl">
                      {results.students &&
                        results.students.length > 0 &&
                        results.students[0].results &&
                        results.students[0].results.length > 0 &&
                        results.students[0].results[0].result &&
                        results.students[0].results[0].result.total_score &&
                        results.students[0].results[0].result.total_score
                          .length > 0 &&
                        `${results.students[0].results[0].result.total_score[0]}/${results.students[0].results[0].result.total_score[1]}`}
                    </div>
                  </div>
                </div>
                <div className=" h-3/4 overflow-y-auto">
                  {results.students &&
                    results.students.length > 0 &&
                    results.students[0].results &&
                    results.students[0].results.length > 0 &&
                    results.students[0].results[0].result &&
                    results.students[0].results[0].result.answers &&
                    results.students[0].results[0].result.answers.map(
                      (answer, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 rounded-md mb-2 mr-2 p-6 ml-2 flex flex-col space-y-2 max-w-3xl"
                        >
                          <h3 className="bg-black text-white text-center rounded-full py-1 px-4 text-sm w-28">
                            Question {index + 1}
                          </h3>
                          <h3 className="text-lg font-semibold">
                            {answer.question}
                          </h3>
                          <h4 className="bg-gray-200 text-gray-700 font-bold text-center py-1 rounded-full text-sm w-20">
                            Answer
                          </h4>
                          <p className="ml-2 text-base">{answer.answer}</p>
                          <h4 className="bg-gray-200 text-gray-700 font-bold text-center py-1 rounded-full text-sm w-20">
                            Score
                          </h4>
                          <div className="ml-6 text-base">
                            {answer.score[0]}
                            {"/"}
                            {answer.score[1]}
                          </div>
                          <h4 className="bg-gray-200 text-gray-700 font-bold text-center py-1 rounded-full text-sm w-20">
                            Remarks
                          </h4>
                          <p className="ml-2 text-base">{answer.remarks}</p>
                          <h4 className="bg-gray-200 text-gray-700 font-bold text-center py-1 rounded-full text-sm w-28">
                            AI Confidence
                          </h4>
                          {answer.confidence > 0.7 ? (
                            <div className="ml-2 my-2 mb-2">
                              <Progress
                                size="sm"
                                value={answer.confidence}
                                maxValue={1}
                                color="success"
                                className="w-32"
                              />
                              <span className="text-success flex ml-1">
                                High
                              </span>
                            </div>
                          ) : answer.confidence > 0.4 ? (
                            <div className="ml-2  my-2 mb-2">
                              <Progress
                                size="sm"
                                value={answer.confidence}
                                maxValue={1}
                                color="warning"
                                className="w-32"
                              />
                              <span className="text-warning  flex ml-1">
                                Medium
                              </span>
                            </div>
                          ) : (
                            <div className="ml-2  my-2 mb-2">
                              <Progress
                                size="sm"
                                value={answer.confidence}
                                maxValue={1}
                                color="danger"
                                className="w-32"
                              />
                              <span className="text-danger  flex ml-1">
                                Low
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    )}
                </div>
              </div>
              <div className="flex-col mt-2">
                <div className="flex space-x-4 mr-4">
                  <div
                    className={`bg-gray-200 text-black w-28 h-8 flex items-center justify-center cursor-pointer rounded-full text-sm hover:bg-gray-800 hover:text-white ${
                      activeTab === "answerSheets"
                        ? "bg-gray-800 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveTab("answerSheets")}
                  >
                    Answer Sheets
                  </div>
                  <div
                    className={`bg-gray-200 text-black w-28 h-8 flex items-center justify-center cursor-pointer rounded-full text-sm hover:bg-gray-800 hover:text-white ${
                      activeTab === "questionPaper"
                        ? "bg-gray-800 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveTab("questionPaper")}
                  >
                    Question Paper
                  </div>
                  <div
                    className={`bg-gray-200 text-black w-28 h-8 flex items-center justify-center cursor-pointer rounded-full text-sm hover:bg-gray-800 hover:text-white ${
                      activeTab === "answerKey" ? "bg-gray-800 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("answerKey")}
                  >
                    Answer Key
                  </div>
                </div>

                <div className="mr-4 mt-4">
                  <div className=" border p-1 rounded-md border-gray-200">
                    <TransformWrapper>
                      <TransformComponent>
                        {activeTab === "answerSheets" &&
                          results.students &&
                          results.students.length > 0 &&
                          results.students[0].results &&
                          results.students[0].results.length > 0 && (
                            <Image
                              src={results.students[0].results[0].answerSheet}
                              alt="Answer Sheet"
                              width={400}
                              height={800}
                            />
                          )}
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                  <div className=" border p-1 rounded-md border-gray-200">
                    <TransformWrapper>
                      <TransformComponent>
                        {activeTab === "questionPaper" &&
                          results.valuator &&
                          results.valuator.questionPaper && (
                            <Image
                              src={results.valuator.questionPaper}
                              alt="Question Paper"
                              width={400}
                              height={800}
                            />
                          )}
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                  <div className=" border p-1 rounded-md border-gray-200">
                    <TransformWrapper>
                      <TransformComponent>
                        {activeTab === "answerKey" &&
                          results.valuator &&
                          results.valuator.answerKey && (
                            <Image
                              src={results.valuator.answerKey}
                              alt="Answer Key"
                              width={400}
                              height={800}
                            />
                          )}
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
