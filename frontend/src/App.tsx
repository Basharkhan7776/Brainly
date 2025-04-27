import { Signin } from "./pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { SharedBrain } from "./pages/SharedBrain";
import { Toast } from "./components/Toast";
import { useRecoilValue } from "recoil";
import { toastState } from "./atoms";

function App() {
  const toast = useRecoilValue(toastState);

  return (
    <BrowserRouter>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/brain/:shareLink" element={<SharedBrain />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
