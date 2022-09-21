import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import CompanyDetail from '../companies/CompanyDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from './PrivateRoute';

/** Site-wide routes.
 * 
 * Parts of site should only be visible when logged in. Those routes are wrapped by <PrivateRoute> which is an authorization component.
 * 
 * Visiting a non-existent route redirects to the homepage
 */

function AppRoutes({ login, signup }) {
  console.debug("Routes", 
                `login=${typeof login}`, 
                `register=${typeof register}`);

  return (
    <div>
      <Routes>
        <Route path="/" 
              element={<Homepage />} 
        />
        
        <Route path="/login"
              element={<LoginForm login={login} />}
        />
        
        <Route path="/signup"
              element={<SignupForm signup={signup} />}
        />

        <Route path="/profile"
              element={
                        <PrivateRoute>
                          <ProfileForm />
                        </PrivateRoute>
              }
        />

        <Route path="/companies"
              element={
                        <PrivateRoute>
                          <CompanyList />
                        </PrivateRoute>
              }
        />

        <Route path="/companies/:handle"
                element={
                          <PrivateRoute>
                            <CompanyDetail />
                          </PrivateRoute>
                }
        />

        <Route path="/jobs"
              element={
                        <PrivateRoute>
                          <JobList />
                        </PrivateRoute>
              }
        />
  
        <Route path="*" 
              element={
                        <Navigate to="/" />
              }
        />
        
      </Routes>
    </div>
  );
}

export default AppRoutes;