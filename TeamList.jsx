import React, { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { toast } from "react-toastify";

 const TeamList = ({ user }) => {
  const [teams, setTeams] = useState([]);
  const [view, setView] = useState("teams"); 
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(null);

  // Load from localStorage 
  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(storedTeams);
  }, []);


  const allMembers = teams.reduce((acc, team) => {
    team.members.forEach((member) => {
      const existingMember = acc.find((m) => m.name === member.name && m.email === member.email);
      if (existingMember) {
        existingMember.teams.push(team.name);
      } else {
        acc.push({ ...member, teams: [team.name] }); 
      }
    });
    return acc;
  }, []);

  const handleView = (viewType) => {
    setView(viewType);
    setSelectedTeamMembers(null);
  };

  const handleViewTeamMembers = (team) => {
    setSelectedTeamMembers(team);
  };

  const handleCloseTeamMembers = () => {
    setSelectedTeamMembers(null);
  };

  const getTeamMembersDetails = (team) => {
    return team.members.map(member => {
      return allMembers.find(m => m.name === member.name && m.email === member.email) || member;
    });
  };


  const handleDeleteTeam = (teamId) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    console.log(`Delete team with ID: ${teamId}`);
    toast.success(`Team with ID: ${teamId} deleted successfully!`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-start">
          <h2 className="text-primary">Team Management</h2>
          <p className="lead text-secondary">Manage your teams and team members</p>
        </div>
        <div className="text-end">
          <Link to="/teams/new" className="btn btn-success">
            + Create New Team
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn ${view === "teams" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => handleView("teams")}
        >
          View Teams
        </button>
        <button
          className={`btn ${view === "members" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleView("members")}
        >
          View Members
        </button>
      </div>

      {view === "teams" && (
        <div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            {teams.map((team) => (
              <div key={team.id} className="col">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-info">{team.name}</h5>
                    <p className="card-text text-muted flex-grow-1">{team.description || "No description provided."}</p>
                    <p className="card-text">
                      <small className="text-primary">{team.members.length} Member{team.members.length !== 1 ? 's' : ''}</small>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button onClick={() => handleViewTeamMembers(team)} className="btn btn-sm btn-outline-info">
                        View Members
                      </button>
                      <div>
                        <button onClick={() => handleDeleteTeam(team.id)} className="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {teams.length === 0 && (
              <div className="col">
                <div className="card">
                  <div className="card-body text-center text-muted">
                    No teams available.
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedTeamMembers && (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-light">
                    <h5 className="modal-title text-primary">Members of {selectedTeamMembers.name}</h5>
                    <button type="button" className="btn-close" onClick={handleCloseTeamMembers}></button>
                  </div>
                  <div className="modal-body">
                    {getTeamMembersDetails(selectedTeamMembers).length > 0 ? (
                      <ul>
                        {getTeamMembersDetails(selectedTeamMembers).map((member, index) => (
                          <li key={index} className="mb-2">
                            <strong className="text-secondary">{member.name}</strong>
                            {member.email && <small className="text-muted"> ({member.email})</small>}
                            {member.role && <div className="text-muted fst-italic">Role: {member.role}</div>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No members in this team yet.</p>
                    )}
                  </div>
                  <div className="modal-footer bg-light">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseTeamMembers}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view === "members" && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Teams</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((member, index) => (
                <tr key={index}>
                  <td>
                    <h6 className="mb-0 text-primary">{member.name}</h6>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{member.email}</p>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{member.role}</span>
                  </td>
                  <td>
                    {member.teams.map((teamName, index) => (
                      <span key={index} className="badge bg-info me-1">
                        {teamName}
                      </span>
                    ))}
                    {member.teams.length === 0 && <span className="text-muted">No teams</span>}
                  </td>
                </tr>
              ))}
              {allMembers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No members available in any team.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
 };

 export default TeamList;