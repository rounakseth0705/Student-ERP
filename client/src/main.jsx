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
import CreateStudent from './pages/CreateStudent.jsx';
import CreateSubject from './pages/CreateSubject.jsx';
import Students from './pages/Students.jsx';
import AssignSubjectToLecture from './pages/AssignSubjectToLecture.jsx';
import Assignments from './pages/Assignments.jsx';
import AboutCourse from './pages/AboutCourse.jsx';
import Notes from './pages/Notes.jsx';
import MarkAttendence from './pages/MarkAttendence.jsx';
import ReviewStudents from './pages/ReviewStudents.jsx';
import AttendenceHistory from './pages/AttendenceHistory.jsx';
import SubjectAssignments from './pages/SubjectAssignments.jsx';
import SubjectNotes from './pages/SubjectNotes.jsx';

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
        path: "admin-dashboard/students",
        element: <ProtectedRoute>
          <Students/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/create-student",
        element: <ProtectedRoute>
          <CreateStudent/>
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
        path: "admin-dashboard/courses/:courseId/:semester/:day/:classTime/:schedule",
        element: <ProtectedRoute>
          <AssignSubjectToLecture/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/courses/:courseId/:courseCode/:semester/create-subject",
        element: <ProtectedRoute>
          <CreateSubject/>
        </ProtectedRoute>
      },
      {
        path: "admin-dashboard/create-course",
        element: <ProtectedRoute>
          <CreateCourse/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard",
        element: <ProtectedRoute>
          <TeacherDashboard/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/assignments",
        element: <ProtectedRoute>
          <Assignments/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/assignments/:subjectId/:subjectName/:subjectCode",
        element: <ProtectedRoute>
          <SubjectAssignments/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/:about-course",
        element: <ProtectedRoute>
          <AboutCourse/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/notes",
        element: <ProtectedRoute>
          <Notes/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/notes/:subjectId/:subjectName/:subjectCode",
        element: <ProtectedRoute>
          <SubjectNotes/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/mark-attendence",
        element: <ProtectedRoute>
          <MarkAttendence/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/review-students",
        element: <ProtectedRoute>
          <ReviewStudents/>
        </ProtectedRoute>
      },
      {
        path: "teacher-dashboard/attendence-history",
        element: <ProtectedRoute>
          <AttendenceHistory/>
        </ProtectedRoute>
      },
      {
        path: "student-dashboard",
        element: <ProtectedRoute>
          <StudentDashboard/>
        </ProtectedRoute>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
