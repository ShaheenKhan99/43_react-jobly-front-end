import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";


/** Homepage of site.
 * 
 * Shows welcome message or login/register buttons.
 * 
 * Routed at /
 * 
 * Routes -> Homepage
 * 
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);

  console.debug("Homepage", "currentuser=", currentUser);

  function loggedInHome() {
    return (
        <h4 className="mt-5">Welcome {currentUser.username || currentUser.firstName}!</h4> 
    );
  }

  function loggedOutHome() {
    return (
    <span>
      <Link className="btn btn-secondary font-weight-bold"
        to="/login">
        Log in
      </Link>
      <Link className="btn btn-secondary font-weight-bold mx-3"
        to="/signup">
      Sign up
      </Link>
    </span>
    )
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">Your job search made easy.</p>
      
        {currentUser ? loggedInHome() : loggedOutHome()}
    
      </div>      
    </div>
  );
}

export default Homepage;
 
