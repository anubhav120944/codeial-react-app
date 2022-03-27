import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';
import Signup from '../pages/Signup';
import { Outlet, Navigate } from 'react-router-dom';
// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }

//         return <Redirect to="/login" />;
//       }}
//     />
//   );
// }
const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const Page404 = () => {
  return <h1>Pagenot Found</h1>;
};

// const Page404 = () => {
//   return <h1>404</h1>;
// };

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      {/* <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/user/:userId" element={<UserProfile />} />
          <Route element={<Page404 />} />
        </Routes>
      </Router> */}
      <Router>
        <Navbar />
        <>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Signup />}></Route>

            <Route exact path="/settings" element={<PrivateRoute />}>
              <Route exact path="/settings" element={<Settings />} />
            </Route>

            <Route exact path="/user/:userId" element={<PrivateRoute />}>
              <Route exact path="/user/:userId" element={<UserProfile />} />
            </Route>

            <Route exact path="*" element={<Page404 />}></Route>
          </Routes>
        </>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

// return (
//   <div className="App">

//   </div>
// );