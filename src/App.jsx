import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Bookmarks from "./pages/Bookmarks";
import Post from "./pages/Post";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails/>}/>
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/post" element={<Post />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default App;
