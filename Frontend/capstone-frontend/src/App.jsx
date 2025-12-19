import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import AuthForm from "./Login.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          padding: "0 20px",
          minHeight: "80vh", // keeps the footer down
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
