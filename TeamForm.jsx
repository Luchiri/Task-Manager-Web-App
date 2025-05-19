import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const TeamForm = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "", role: "" }]);
  const [loading, setLoading] = useState(false);

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMemberField = () => {
    setMembers([...members, { name: "", email: "", role: "" }]);
  };

  const removeMemberField = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!teamName.trim()) {
      toast.error("Team name is required");
      setLoading(false);
      return;
    }

    const newTeam = {
      name: teamName.trim(),
      description: description.trim(),
      members: members.filter((member) => member.name.trim() !== ""),
      role: "Owner",
    };

    setTimeout(() => {
      const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
      const newTeamWithId = { ...newTeam, id: Date.now().toString() };
      localStorage.setItem("teams", JSON.stringify([...storedTeams, newTeamWithId]));
      toast.success(`Team "${teamName}" created successfully!`);
      setLoading(false);
      navigate("/teams", { state: { newTeam: newTeamWithId } });
    }, 800);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/teams" className="btn btn-outline-secondary btn-sm">
          &larr; Back to Teams
        </Link>
        <h2 className="text-primary mb-0">Create New Team</h2>
        <div></div>
      </div>

      <div className="card shadow">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-primary">
                Team Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                placeholder="Enter team name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label text-info">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Team purpose or goals"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label text-success">Add Team Members</label>
              {members.map((member, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                  <div className="col-md-4">
                    <label htmlFor={`memberName-${index}`} className="form-label small text-muted">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id={`memberName-${index}`}
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                      placeholder="Member Name"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`memberEmail-${index}`} className="form-label small text-muted">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id={`memberEmail-${index}`}
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                      placeholder="Member Email"
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor={`memberRole-${index}`} className="form-label small text-muted">Role</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id={`memberRole-${index}`}
                      value={member.role}
                      onChange={(e) => handleMemberChange(index, "role", e.target.value)}
                      placeholder="Role (e.g., Developer, Designer)"
                    />
                  </div>
                  <div className="col-md-1 text-end">
                    {members.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeMemberField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline-success btn-sm mt-2" onClick={addMemberField}>
                + Add Member
              </button>
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className={`btn btn-primary ${loading ? 'disabled' : ''}`}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  "Create Team"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamForm;
