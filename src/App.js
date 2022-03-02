
import { ProjectEdit } from './pages/ProjectEdit';
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import { Home } from './pages/Home';
import { PageTasksBoard } from './pages/TasksBoard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/projects/:id" element={<ProjectEdit />} exact />
        <Route path="/tasks/board" element={<PageTasksBoard />} exact />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
