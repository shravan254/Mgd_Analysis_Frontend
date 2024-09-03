import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import WithNav from "./Layout/WithNav";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";

import Analytics from "./pages/Production/Analytics/Analytics";
import AnalyticsForm from "./pages/Production/Analytics/AnalyticsForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route path="/home" element={<Home />} />

        <Route element={<WithNav />}>
          <Route path="/Analysis" element={<Parentroute />}>
            <Route path="analytics">
              <Route index={true} element={<Analytics />} />
              <Route path="Analyticsform" element={<AnalyticsForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
