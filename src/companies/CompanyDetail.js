import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import "./CompanyDetail.css";

/** Company Detail page
 * 
 * Renders information about company, along with the jobs at that company.
 * 
 * Routed at /companies/:handle
 * 
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams();

  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForuser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail mt-5 col-md-8 offset-md-2"> 
      <section className="text-center">
        <h3 className="mb-4">
          {company.name}
          {company.logoUrl && (
            <img className="mx-3" src={company.logoUrl} alt="logo" />
          )}
        </h3>

        <p>{company.description}</p>
        <p className="mb-3"><em>Number of Employees: {company.numEmployees}</em></p>
      </section>
      <section>
        <h5 className="mt-5 mb-3 text-center">Current Job Openings</h5>
        <JobCardList jobs={company.jobs} />
      </section>

    </div>
  );
}

export default CompanyDetail;