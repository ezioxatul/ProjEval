import React, { useState } from "react";

import { Tabs, Tab } from "@nextui-org/tabs";

import { useRouter } from "next/router";

import { useEffect } from "react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("evaluator");

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/classes") {
      setActiveTab("classes");
    } else {
      setActiveTab("evaluator");
    }
  }, [router.pathname]);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold inline text-slate-600 mb-6 ml-11 mt-5">
          ProjEval
        </h1>

        <Tabs
          className="ml-5"
          size="md"
          variant="solid"
          selectedKey={activeTab}
          color="primary"
        >
          <Tab key="evaluator" title="Evaluator" href="/">
            {/* <Button
              className="w-40 h-12 ml-5 text-md inline"
              color="primary"
              onPress={() => handleOpen("evaluator", "blur")}
            >
              + New Evaluator
            </Button> */}
          </Tab>
          <Tab key="classes" title="Classes" href="/classes"></Tab>
        </Tabs>
      </div>
    </>
  );
}
