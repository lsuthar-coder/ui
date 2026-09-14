import { initializeIcons } from '@fluentui/react/lib/Icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';
import { COA } from './pages/COA';
import { TB } from './pages/TB';
import { Clients } from './pages/Clients'
import { CreateTB } from "./pages/CreateTB"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCoa } from './features/coaSlice';
import { getAllTb } from './features/tbSlice';
import { EditTb } from './pages/EditTb';
initializeIcons();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://localhost:7117/coa')
      .then(response => response.json())
      .then(data => {
        dispatch(getAllCoa(data));
      })
      .catch(error => console.error("Error fetching COA:", error));
    fetch('https://localhost:7117/tb')
      .then(response => response.json())
      .then(data => {
        dispatch(getAllTb(data));
      })
      .catch(error => console.error("Error fetching TB:", error));
  }, []);


  return (
    <Router>
      <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>

        <NavBar />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <Header />

          <main
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              backgroundColor: "#ffffff",
              padding: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Clients />} />
              <Route path="/tb" element={<TB />} />
              <Route path="/coa" element={<COA />} />
              <Route path="/tbcreate" element={<CreateTB />} />
              <Route path="/tbedit/:id/:index" element={<EditTb />} />

            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

export default App;
