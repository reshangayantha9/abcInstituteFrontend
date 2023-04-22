import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import AllStudent from "./pages/student/AllStudent";
import EditStudent from "./pages/student/EditStudent";
import AddStudent from "./pages/student/AddStudent";
import AllProgram from "./pages/program/AllProgram";
import EditProgram from "./pages/program/EditProgram";
import AddProgram from "./pages/program/AddProgram";
import Enroll from "./pages/register/Enroll";
import AllRegister from "./pages/register/AllRegister";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        
        <Route path='/' element={<AllStudent/>}/>
        <Route path='/editstudent/:id' element={<EditStudent/>}/>
        <Route path='/addstudent/' element={<AddStudent/>}/>

        <Route path='/program/' element={<AllProgram/>}/>
        <Route path='/editprogram/:id' element={<EditProgram/>}/>
        <Route path='/addprogram/' element={<AddProgram/>}/>

        <Route path='/enroll/' element={<Enroll/>}/>
        <Route path='/allregister/' element={<AllRegister/>}/>

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
