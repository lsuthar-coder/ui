import { initializeIcons } from '@fluentui/react/lib/Icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCoa } from './features/coaSlice';
import { getAllTb } from './features/tbSlice';
import { Header, NavBar } from './components';
import { DashboardPage, ClientsPage, ChartOfAccountsPage, TrialBalancePage, CreateTrialBalance } from "./pages"
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
              backgroundColor: "white",
              padding: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tax" element={<ClientsPage />} />
              <Route path="/tax/generalsettings/accounts" element={<ChartOfAccountsPage />} />
              <Route path="/tax/clients" element={<TrialBalancePage />} />
              <Route path="/tax/clients/create" element={<CreateTrialBalance />} />
            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

export default App;
