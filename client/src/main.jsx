import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import CreateCourse from './pages/CreateCourse.jsx';
import Teachers from './pages/Teachers.jsx';
import CreateTeacher from './pages/CreateTeacher.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: "admin-dashboard",
        element: <ProtectedRoute>
          <AdminDashboard/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/teachers",
        element: <ProtectedRoute>
          <Teachers/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/create-teacher",
        element: <ProtectedRoute>
          <CreateTeacher/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/courses",
        element: <ProtectedRoute>
          <Courses/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/courses/:courseId",
        element: <ProtectedRoute>
          <CourseDetails/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/create-course",
        element: <ProtectedRoute>
          <CreateCourse/>
        </ProtectedRoute>
      },
      {
        path: "student-dashboard",
        element: <ProtectedRoute>
          <StudentDashboard/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard",
        element: <ProtectedRoute>
          <TeacherDashboard/>
        </ProtectedRoute>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
