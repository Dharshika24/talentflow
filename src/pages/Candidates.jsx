import { useEffect, useState } from "react";
import {
  Users,
  Search,
  MapPin,
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("candidates")) || [];

    setCandidates(saved);
  }, []);

  const updateStage = (id, stage) => {
    const updated = candidates.map((candidate) =>
      candidate.id === id
        ? { ...candidate, stage }
        : candidate
    );

    setCandidates(updated);

    localStorage.setItem(
      "candidates",
      JSON.stringify(updated)
    );
  };

  const filteredCandidates = candidates.filter((candidate) =>
    `${candidate.name} ${candidate.skills}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="candidates-page">

      <div className="candidates-header">
        <div>
          <h1>Candidates</h1>
          <p>
            Review and manage applicants for your open positions.
          </p>
        </div>

        <div className="candidate-count">
          <Users size={18} />
          {candidates.length} Applicants
        </div>
      </div>

      <div className="candidate-search">
        <Search size={18} />
        <input
          placeholder="Search candidates by name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="no-candidates">
          <Users size={40} />
          <h2>No candidates found</h2>
          <p>
            Candidates who apply through the job portal
            will appear here.
          </p>
        </div>
      ) : (
        <div className="candidate-list">

          {filteredCandidates.map((candidate) => (

            <div
              className="candidate-profile-card"
              key={candidate.id}
            >

              <div className="candidate-main">

                <div className="large-avatar">
                  {candidate.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="candidate-details">

                  <h2>{candidate.name}</h2>

                  <p>{candidate.email}</p>

                  <div className="candidate-meta">

                    <span>
                      <MapPin size={14} />
                      {candidate.location}
                    </span>

                    <span>
                      <BriefcaseBusiness size={14} />
                      {candidate.experience}
                    </span>

                    <span>
                      {candidate.qualification}
                    </span>

                  </div>

                  <div className="candidate-skills">
                    {candidate.skills
                      .split(",")
                      .map((skill, index) => (
                        <span key={index}>
                          {skill.trim()}
                        </span>
                      ))}
                  </div>

                </div>

              </div>

              <div className="candidate-actions">

                <span
                  className={`candidate-stage ${candidate.stage
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {candidate.stage}
                </span>

                <div className="action-buttons">

                  <button
                    className="shortlist-btn"
                    onClick={() =>
                      updateStage(
                        candidate.id,
                        "Shortlisted"
                      )
                    }
                  >
                    <CheckCircle2 size={16} />
                    Shortlist
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateStage(
                        candidate.id,
                        "Rejected"
                      )
                    }
                  >
                    <XCircle size={16} />
                    Reject
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Candidates;