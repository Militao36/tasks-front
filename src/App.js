
import { PageProjectView } from './pages/PageProjectView';
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import { PageHome } from './pages/PageHome';
import { PageTasksBoard } from './pages/PageTasksBoard';
import ContextUser from './context/ContextUsers';
import { useEffect, useState } from 'react';
import { api } from './config/api';
import { PageProjectCreateAndUpdated } from './pages/PageProjectCreateAndUpdated';

import { TaskCreateAndUpdated } from './components/TaskCreateAndUpdated'

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
          <Route path="/" element={<PageHome />} exact />
          <Route path="/tasks" element={<TaskCreateAndUpdated />} exact />
          <Route path="/project/view/:id" element={<PageProjectView />} exact />
          <Route path="/tasks/board" element={<PageTasksBoard />} exact />
          <Route path="/project/edit/:id" element={<PageProjectCreateAndUpdated />} exact />
          <Route path="/project" element={<PageProjectCreateAndUpdated />} exact />
        </Routes>
      </BrowserRouter>
    </ContextUser.Provider>
  )
}

export default App;
