import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Alert from "../common/Alert";
import UserContext from "./UserContext";


/** Signup form.
 * 
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 * 
 * Routes -> SignupForm -> Alert
 * 
 * Routed as /signup 
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
                                    username: "",
                                    password: "",
                                    firstName: "",
                                    lastName: "",
                                    email: ""
                                });


  console.debug("SignupForm", 
                "signup=", 
                typeof signup, 
                "currentUser=",
                currentUser,
                "formData=", 
                formData, 
                "formErrors", 
                formErrors);

  if (currentUser) {
    return <Navigate to="/" />
  }

  /** Handle form submit:
   * Calls signup func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    
    if (result.success) {
      navigate("/companies") 
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
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 text-center">Sign Up</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="label" htmlFor="username">Username</label>
                  <input name="username"
                          className="form-control"
                          value={formData.username}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="password">Password</label>
                  <input name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="firstName">First name</label>
                  <input name="firstName"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="lastName">Last name</label>
                  <input name="lastName"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="email">Email</label>
                  <input name="email"
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
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

export default SignupForm;