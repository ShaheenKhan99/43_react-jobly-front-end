import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/** Show limited information about a job.
 * 
 * Is rendered by JobCardList to show "card" for each job.
 * 
 * Receives apply func prop from parent, which is called on apply.
 * 
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job  */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
        <div className="JobCard card">
          {applied}
            <div className="card-body mx-4">
              <h5 className="card-title">{title}</h5>
              <p><em><bold>{companyName}</bold></em></p>
                {salary && 
                <div>Salary: {formatSalary(salary)}</div>}
                {equity !== undefined && 
                <div>Equity: {equity}</div>}

                <div className="d-grid gap-2 d-md-flex  justify-content-md-end">

                  {applied ? 
                    <p className="text-primary font-weight-bold text-uppercase">Application submitted</p> 
                    :
                    <button className="btn btn-danger font-weight-bold text-uppercase me-md-2" onClick={handleApply} disable={applied}>Apply
                    </button>}
                
                </div>
            </div>
        </div>
    );
  }

/** Render integer salary like '$1,500,000' */

function formatSalary(salary) {
  return salary.toLocaleString();

}


export default JobCard;