import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import Alert from "../common/Alert";

/** Login form.
 * 
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 * 
 * Routes -> LoginForm -> Alert
 * 
 * Routed as /login 
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  const [formData, setFormData] = useState({
                                    username: "",
                                    password: ""
  });

  const { currentUser } = useContext(UserContext);


  console.debug("LoginForm", 
                  "login=", 
                  typeof login, 
                  "formData=", 
                  formData, 
                  "formErrors", 
                  formErrors,
                  "currentUser=",
                  currentUser
                  );

  
  if (currentUser) {
    return <Navigate to="/" />
  }

  /** Handle form submit:
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);

    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field  */

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 text-center">Log In</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="label" htmlFor="username">Username</label>
                  <input name="username"
                          className="form-control"
                          value={formData.username}
                          onChange={handleChange}
                          autoComplete="username"
                          required
                          />
              </div>
              <div className="form-group mb-3">
                <label className="label" htmlFor="password">Password</label>
                  <input name="password"
                          className="form-control"
                          value={formData.password}
                          type="password"
                          onChange={handleChange}
                          autoComplete="current-password"
                          required
                          />
              </div>

              {formErrors.length ? 
                <Alert type="danger" message={formErrors} /> : null}

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2" 
                        onSubmit={handleSubmit}>
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;