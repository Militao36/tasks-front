import React from 'react';
import {
  BrowserRouter, Route,
  Routes
} from 'react-router-dom';
import { TaskCreateAndUpdated } from './components/TaskCreateAndUpdated';
import { PageHome } from './pages/PageHome';
import { PageProjectView } from './pages/PageProjectView';
import { PageTasksBoard } from './pages/PageTasksBoard';
import { FormLogin } from './pages/PageLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormLogin />} exact />
        <Route path="/home" element={<PageHome />} exact />
        <Route path="/tasks" element={<TaskCreateAndUpdated />} exact />
        <Route path="/tasks/board/:projectId" element={<PageTasksBoard />} exact />
        <Route path="/project/view/:id" element={<PageProjectView />} exact />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
