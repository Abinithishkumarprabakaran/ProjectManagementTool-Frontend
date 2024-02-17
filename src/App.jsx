import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";
import Confirmation from "./Authentication/Confirmation";
import ChangePassword from "./Authentication/ChangePassword";
import PageNotFound from "./Authentication/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route
          path="/changepassword/:id"
          element={
            <ProtectedRoutePasswordChange>
              <ChangePassword />
            </ProtectedRoutePasswordChange>
          }
        />
        <Route path="/:userId/projects" element={<Project />} />
        <Route path="/:userId/projects/home" element={<Home />} />
        <Route path="/:userId/projects/:projectId" element={<Task />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

function ProtectedRouteBoard({ children }) {
  const token = localStorage.getItem("token");
  return token ? <section>{children}</section> : <Navigate replace to="/" />;
}

function ProtectedRoutePasswordChange({ children }) {
  const OTP = localStorage.getItem("OTP");
  return OTP ? <section>{children}</section> : <Navigate replace to="/" />;
}

const Project = () => {
  return (
    <div>
      <ProtectedRouteBoard>
        <AppLayout>
          <Toaster position="top-right" gutter={8} />
        </AppLayout>
        <Routes>
            <Route path=":userId/projects/:projectId" element={<Task />} />
            <Route path=":userId/projects/home" element={<Home />} />
          </Routes>
      </ProtectedRouteBoard>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full pt-10">
      <img src="./image/welcome.svg" className="w-5/12" alt="" />
      <h1 className="text-lg text-gray-600">Select or create new project</h1>
    </div>
  );
};
export default App;
