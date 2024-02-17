import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";

const Starter = () => {
    return (
        <>
            <AppLayout>
                <Toaster
                    position="top-right"
                    gutter={8}
                />
                <Routes>
                    <Route path="/:projectId" element={<Task />} />
                    <Route path="/" element={
                    <div className="flex flex-col items-center w-full pt-10">
                        <img src="./image/welcome.svg" className="w-5/12" alt="" />
                        <h1 className="text-lg text-gray-600">Select or create new project</h1>
                    </div>
                    } />
                </Routes>
            </AppLayout>
        </>
    )
}
export default Starter;