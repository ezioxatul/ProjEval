import Sidebar from "../components/Sidebar";

export default function Testing() {
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="container mt-9">
          {/* Title and Tagline Section */}
          <div className="text-5xl font-thin text-center text-blue-600 ">
            ProjEval <i className="fa fa-pencil"></i>
          </div>
          <div className="text-2xl text-center mt-4 font-thin  text-gray-400">
            Empowering educators with Effortless AI Evaluation
          </div>
        </div>
          
      </div>

   
    </>
  );
}
