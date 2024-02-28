import {Container, CssBaseline} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register';
import Login from "./features/users/Login.tsx";
import PostList from "./features/posts/PostList.tsx";
import PostForm from "./features/posts/components/PostForm.tsx";

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
              <Route path='/' element={<PostList/>}/>
              <Route path='/posts' element={<PostList/>}/>
              <Route path='/posts/new' element={<PostForm/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
