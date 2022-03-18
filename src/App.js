
import { useEffect, useState } from 'react';
import {
  BrowserRouter, Route,
  Routes
} from 'react-router-dom';
import { TaskCreateAndUpdated } from './components/TaskCreateAndUpdated';
import { api } from './config/api';
import ContextUser from './context/ContextUsers';
import { PageHome } from './pages/PageHome';
import { PageProjectCreateAndUpdated } from './pages/PageProjectCreateAndUpdated';
import { PageProjectView } from './pages/PageProjectView';
import { PageTasksBoard } from './pages/PageTasksBoard';
import { FormLogin } from './pages/PageLogin';

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
          <Route path="/" element={<FormLogin />} exact />
          <Route path="/home" element={<PageHome />} exact />
          <Route path="/tasks" element={<TaskCreateAndUpdated />} exact />
          <Route path="/tasks/board/:projectId" element={<PageTasksBoard />} exact />
          <Route path="/project" element={<PageProjectCreateAndUpdated />} exact />
          <Route path="/project/view/:id" element={<PageProjectView />} exact />
        </Routes>
      </BrowserRouter>
    </ContextUser.Provider>
  )
}

export default App;
