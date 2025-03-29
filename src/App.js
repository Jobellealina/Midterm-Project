import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import ViewDetails from './ViewDetails';


function App() {
  return (
    <div style={{ 
      backgroundImage: "url('/image/bg.jpg')", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh"
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentTable/>}></Route>
          <Route path="/student/create" element={<CreateStudent/>}></Route>  
          <Route path="/student/edit/:studentid" element={<EditStudent/>}></Route>
          <Route path="/student/view/:studentid" element={<ViewDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;