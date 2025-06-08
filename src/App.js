import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Blogs from './Pages/Blogs';
import BlogDetail from './Pages/BlogDetail';
import NewBlog from './Pages/NewBlog';
import Dashboard from './Pages/Dashboard';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-new-blog" element={<NewBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
