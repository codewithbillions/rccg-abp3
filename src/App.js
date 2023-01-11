import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.js";
import Card from "./Card.js";
import Footer from "./Footer.js";
import PostApp from "./PostApp.js";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/post" element={<PostApp />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

function Mission() {
  return <h1>mission</h1>;
}

function Contact() {
  return <h1>about us</h1>;
}

export default App;
