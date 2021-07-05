import "./App.css";
import Dashboard from "./user/Dashboard";
import Login from "./user/Login";

const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
