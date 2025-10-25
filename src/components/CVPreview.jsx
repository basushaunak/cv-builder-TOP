import "../styles/CVPreview.css";

export default function CVPreview({ data, onBack }) {
  const { personal, work, education } = data;

  return (
    <div className="div-preview">
      <button onClick={onBack} className="btn-back">
        ← Back to Edit
      </button>

      <h1 className="user-name">{personal.name}</h1>
      <h3 style={{ color: "#555" }}>{personal.headline}</h3>
      <p>
        📧 {personal.email} | 📞 {personal.mobile}
      </p>
      <p>{personal.address}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2>Work Experience</h2>
      {work.map((job, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <strong>
            {job.position} at {job.company}
          </strong>
          <div style={{ fontSize: "0.9em", color: "#555" }}>
            {job.startYear} – {job.endYear}
          </div>
          {job.description && (
            <p
              style={{
                marginTop: "5px",
                whiteSpace: "pre-wrap",
                lineHeight: "1.4em",
              }}
            >
              {job.description}
            </p>
          )}
        </div>
      ))}

      <h2>Education</h2>
      {education.map((ed, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <strong>
            {ed.qualification}
            {ed.subject ? ` (${ed.subject})` : ""}
          </strong>{" "}
          <span>— {ed.year}</span>
        </div>
      ))}
    </div>
  );
}
