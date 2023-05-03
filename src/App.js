import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthCheck from './hooks/useAuthCheck';
import CoursePlayer from './pages/studentPortal/CoursePlayer';
import Leaderboard from './pages/studentPortal/Leaderboard';
import Login from './pages/studentPortal/Login';
import Quiz from './pages/studentPortal/Quiz';
import SignUp from './pages/studentPortal/SignUp';
import AdminLogin from './pages/adminDashboard/AdminLogin';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Videos from './pages/adminDashboard/Videos';
import Assignment from './pages/adminDashboard/Assignment';
import AssignmentMarks from './pages/adminDashboard/AssignmentMarks';
import Quizzes from './pages/adminDashboard/Quizzes';
import AddVideo from './pages/adminDashboard/AddVideo';
import EditVideo from './pages/adminDashboard/EditVideo';
import AddAssignment from './pages/adminDashboard/AddAssignment';
import EditAssignment from './pages/adminDashboard/EditAssignment';
import AddQuiz from './pages/adminDashboard/AddQuiz';
import EditQuiz from './pages/adminDashboard/EditQuiz';
import ContentNotFound from './pages/ContentNotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const authChecked = useAuthCheck();

  return !authChecked ?
    (<div>authentication Checking. Please wait....</div>)
    : (
      <Router>
        <Routes>
          {/* Student Portal Routes */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/lesson/:videoId" element={<PrivateRoute> <CoursePlayer /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute> <Leaderboard /></PrivateRoute>} />
          <Route path="/quiz/:videoId" element={<PrivateRoute> <Quiz /></PrivateRoute>} />
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<PublicRoute> <AdminLogin /></PublicRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute> <AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/videos" element={<PrivateRoute> <Videos /></PrivateRoute>} />
          <Route path="/admin/videos/add" element={<PrivateRoute> <AddVideo /></PrivateRoute>} />
          <Route path="/admin/videos/edit/:videoId" element={<PrivateRoute> <EditVideo /></PrivateRoute>} />
          <Route path="/admin/assignment" element={<PrivateRoute> <Assignment /></PrivateRoute>} />
          <Route path="/admin/assignment/add" element={<PrivateRoute> <AddAssignment /></PrivateRoute>} />
          <Route path="/admin/assignment/edit/:assignmentId" element={<PrivateRoute> <EditAssignment /></PrivateRoute>} />
          <Route path="/admin/assignmentMarks" element={<PrivateRoute> <AssignmentMarks /></PrivateRoute>} />
          <Route path="/admin/quizzes" element={<PrivateRoute> <Quizzes /></PrivateRoute>} />
          <Route path="/admin/quizzes/add" element={<PrivateRoute> <AddQuiz /></PrivateRoute>} />
          <Route path="/admin/quizzes/edit/:quizId" element={<PrivateRoute> <EditQuiz /></PrivateRoute>} />
          {/* 404 route */}
          <Route path="*" element={<PrivateRoute><ContentNotFound /></PrivateRoute>} />
        </Routes >
      </Router >
    );
}

export default App;
