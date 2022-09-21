import { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";


// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 * 
 * Displays profile form and hndles changes to local form state.
 * Submitting the form calls the API to save and triggers user reloading throughout the site.
 * 
 * Confirmation of a successful save is normally a simple <Alert> but you can limited-time-display message hook.
 * 
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
                      firstName: currentUser.firstName,
                      lastName: currentUser.lastName,
                      email: currentUser.email,
                      username: currentUser.username,
                      password: ""
                    });

  const [formErrors, setFormErrors] = useState([]);


  // switch to use limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage();

  console.debug("ProfileForm", 
                "currentUser=", 
                currentUser, 
                "formData=", 
                formData, 
                "formErrors", 
                formErrors, 
                "saveConfirmed=", 
                saveConfirmed);

  /** Handle form submit:
  * on form submit:
  * - attempt save to backend and report any errors
  * - if successful:
  * -- clear previous error messages and password
  * -- show save-confirmed message 
  * -- set current user info throughout the site
  */

  async function handleSubmit(evt) {
  evt.preventDefault();

  let profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password
  }

  let username = formData.username;
  let updatedUser;

  try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
  } catch (errors) {

    setFormErrors(errors);
    return;
  }

  setFormData(data => ({ ...data, password: ""}));
  setFormErrors([]);
  setSaveConfirmed(true);

  // trigger reloading of user information throughout the site.
  setCurrentUser(updatedUser);

  }

  /** Handle form data changing  */

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
      <h4 className="text-center mb-3">Profile for {currentUser.username}</h4>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="form-group mb-3">
              <label htmlFor="username" classname="form-label">Username</label>
              <input name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="firstName" classname="form-label">First name</label>
                <input name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName" classname="form-label">Last name</label>
                <input name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" classname="form-label">Email</label>
                <input name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" classname="form-label">Confirm password to make changes:</label>
                <input name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
            </div>

            {formErrors.length ? 
                <Alert type="danger" message={formErrors} /> : null}

            {saveConfirmed ?
                <Alert type="success"
                    messages={["Updated successfully."]} /> : null }

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
  );
}

export default ProfileForm;
