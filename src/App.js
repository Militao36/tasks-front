
import { ProjectView } from './pages/ProjectView';
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import { Home } from './pages/Home';
import { PageTasksBoard } from './pages/TasksBoard';
import { ProjectCreateAndUpdated } from './components/ProjectCreateAndUpdated';
import ContextUser from './context/ContextUsers';
import { useEffect, useState } from 'react';
import { api } from './config/api';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users')
      .then(({ data }) => setUsers(data))
  }, [])

  return (
    <ContextUser.Provider value={{ users, setUsers }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/project/view/:id" element={<ProjectView />} exact />
          <Route path="/tasks/board" element={<PageTasksBoard />} exact />
          <Route path="/project/edit/:id" element={<ProjectCreateAndUpdated />} exact />
          <Route path="/project/" element={<ProjectCreateAndUpdated />} exact />
        </Routes>
      </BrowserRouter>
    </ContextUser.Provider>
  )
}

export default App;
