import "../styles/Input.css";

export default function Input({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
