import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddNew from './pages/AddNew.jsx';
import EditArticle from './pages/EditArticle.jsx';
import Preview from './pages/Preview.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AllPosts />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/preview" element={<Preview />} />
      </Route>
    </Routes>
  );
}

export default App;