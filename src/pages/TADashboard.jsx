import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Briefcase,
  Users,
  FileText,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  MoreHorizontal,
  UserRound,
  LayoutDashboard,
} from "lucide-react";

import "../App.css";

function TA({ onLogout }) {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState("dashboard");

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    employment_type: "Full-time",
    description: "",
    requirements: "",
  });

  // Get jobs from MySQL
  const loadJobs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs"
      );

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.error("Jobs error:", error);
    }
  };

  // Get applications from MySQL
  const loadApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/applications"
      );

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error("Applications error:", error);
    }
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  // Create job
  const createJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create job");
        return;
      }

      alert("Job created successfully!");

      setJobForm({
        title: "",
        department: "",
        location: "",
        employment_type: "Full-time",
        description: "",
        requirements: "",
      });

      await loadJobs();

      setPage("jobs");
    } catch (error) {
      console.error(error);
      alert("Backend connection failed.");
    }
  };

  // Update candidate stage
  const updateStage = async (id, stage) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}/stage`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stage }),
        }
      );

      if (!response.ok) {
        alert("Could not update candidate.");
        return;
      }

      setApplications((current) =>
        current.map((candidate) =>
          candidate.id === id
            ? { ...candidate, stage }
            : candidate
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const screening = applications.filter(
    (a) => a.stage === "Screening"
  ).length;

  const shortlisted = applications.filter(
    (a) => a.stage === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (a) => a.stage === "Interview"
  ).length;

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="dashboard-logo">
          <Briefcase size={24} />
          <span>TalentFlow</span>
        </div>

        <div className="sidebar-label">
          RECRUITMENT
        </div>

        <nav className="sidebar-nav">

          <button
            onClick={() => setPage("dashboard")}
            className={page === "dashboard" ? "active" : ""}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => setPage("jobs")}
            className={page === "jobs" ? "active" : ""}
          >
            <Briefcase size={18} />
            Jobs
          </button>

          <button
            onClick={() => setPage("candidates")}
            className={page === "candidates" ? "active" : ""}
          >
            <Users size={18} />
            Candidates
          </button>

          <button
            onClick={() => setPage("applications")}
            className={page === "applications" ? "active" : ""}
          >
            <FileText size={18} />
            Applications
          </button>

          <button
            onClick={() => setPage("interviews")}
            className={page === "interviews" ? "active" : ""}
          >
            <CalendarDays size={18} />
            Interviews
          </button>

          <button
            onClick={() => setPage("analytics")}
            className={page === "analytics" ? "active" : ""}
          >
            <BarChart3 size={18} />
            Analytics
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button>
            <Settings size={18} />
            Settings
          </button>

          <button onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>

          <div className="recruiter-profile">

            <div className="avatar">
              HR
            </div>

            <div>
              <strong>HR Recruiter</strong>
              <small>Talent Acquisition</small>
            </div>

          </div>

        </div>

      </aside>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* DASHBOARD */}

        {page === "dashboard" && (

          <>
            <div className="dashboard-header">

              <div>
                <h1>Recruitment Dashboard</h1>
                <p>
                  Overview of your hiring activity
                </p>
              </div>

              <div className="header-actions">

                <div className="dashboard-search">
                  <Search size={16} />
                  <input placeholder="Search..." />
                </div>

                <button className="icon-button">
                  <Bell size={17} />
                </button>

              </div>

            </div>


            <div className="stats-grid">

              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Jobs</span>
                  <Briefcase size={17} />
                </div>

                <h2>{jobs.length}</h2>

                <p>Available positions</p>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Applications</span>
                  <Users size={17} />
                </div>

                <h2>{applications.length}</h2>

                <p>Current applications</p>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>Shortlisted</span>
                  <UserRound size={17} />
                </div>

                <h2>{shortlisted}</h2>

                <p>Selected candidates</p>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>Interviews</span>
                  <CalendarDays size={17} />
                </div>

                <h2>{interviews}</h2>

                <p>Scheduled interviews</p>
              </div>

            </div>


            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Recruitment Pipeline</h2>
                  <p>Candidate movement by stage</p>
                </div>

              </div>

              <div className="pipeline">

                <div className="pipeline-stage">
                  <span>Applied</span>
                  <strong>
                    {applications.length}
                  </strong>
                </div>

                <div className="pipeline-stage">
                  <span>Screening</span>
                  <strong>{screening}</strong>
                </div>

                <div className="pipeline-stage">
                  <span>Shortlisted</span>
                  <strong>{shortlisted}</strong>
                </div>

                <div className="pipeline-stage">
                  <span>Interview</span>
                  <strong>{interviews}</strong>
                </div>

              </div>

            </div>
          </>
        )}


        {/* JOBS */}

        {page === "jobs" && (

          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>Jobs</h2>

                <p>
                  Manage recruitment opportunities
                </p>
              </div>

              <button
                className="search-button"
                onClick={() => setPage("create-job")}
              >
                + Create New Job
              </button>

            </div>


            {jobs.length === 0 ? (

              <div className="empty-candidates">

                <Briefcase size={30} />

                <p>
                  No jobs found.
                </p>

              </div>

            ) : (

              jobs.map((job) => (

                <div
                  key={job.id}
                  className="job-card"
                >

                  <div className="job-icon">
                    <Briefcase size={24} />
                  </div>

                  <div className="job-info">

                    <div className="job-type">
                      {job.employment_type}
                    </div>

                    <h3>{job.title}</h3>

                    <div className="job-details">

                      <span>
                        <Building2 size={15} />
                        {job.department || "General"}
                      </span>

                      <span>
                        <MapPin size={15} />
                        {job.location}
                      </span>

                    </div>

                    <p>
                      {job.description}
                    </p>

                  </div>

                </div>

              ))
            )}

          </div>
        )}


        {/* CREATE JOB */}

        {page === "create-job" && (

          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>Create New Job</h2>

                <p>
                  Publish a new opportunity
                </p>
              </div>

              <button
                className="small-button"
                onClick={() => setPage("jobs")}
              >
                ← Back
              </button>

            </div>


            <form
              className="job-form"
              onSubmit={createJob}
            >

              <input
                placeholder="Job Title *"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    title: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Department"
                value={jobForm.department}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    department: e.target.value,
                  })
                }
              />

              <input
                placeholder="Location *"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    location: e.target.value,
                  })
                }
                required
              />

              <select
                value={jobForm.employment_type}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    employment_type: e.target.value,
                  })
                }
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>

              <textarea
                placeholder="Job Description *"
                rows="6"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    description: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Requirements — React, SQL, Excel"
                rows="4"
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    requirements: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="search-button"
              >
                Create Job
              </button>

            </form>

          </div>
        )}


        {/* CANDIDATES */}

        {page === "candidates" && (

          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h2>Candidates</h2>
                <p>
                  Manage candidate applications
                </p>
              </div>
            </div>

            {applications.map((candidate) => (

              <div
                className="candidate-row"
                key={candidate.id}
              >

                <div className="candidate-name">

                  <div className="candidate-avatar">
                    {candidate.name
                      ?.substring(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {candidate.name}
                    </strong>

                    <small>
                      {candidate.email}
                    </small>
                  </div>

                </div>

                <span>
                  {candidate.job_title || "—"}
                </span>

                <select
                  value={candidate.stage || "Applied"}
                  onChange={(e) =>
                    updateStage(
                      candidate.id,
                      e.target.value
                    )
                  }
                >
                  <option>Applied</option>
                  <option>Screening</option>
                  <option>Shortlisted</option>
                  <option>Interview</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>

              </div>

            ))}

          </div>
        )}


        {/* APPLICATIONS */}

        {page === "applications" && (

          <div className="dashboard-card">

            <h2>Applications</h2>

            <p>
              Total applications: {applications.length}
            </p>

          </div>
        )}


        {/* INTERVIEWS */}

        {page === "interviews" && (

          <div className="dashboard-card">

            <h2>Interviews</h2>

            <p>
              Interview management will be added next.
            </p>

          </div>
        )}


        {/* ANALYTICS */}

        {page === "analytics" && (

          <div className="dashboard-card">

            <h2>Analytics</h2>

            <p>
              Recruitment analytics will be added next.
            </p>

          </div>
        )}

      </main>

    </div>
  );
}

export default TA;