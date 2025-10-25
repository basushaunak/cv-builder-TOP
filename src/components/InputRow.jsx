import Input from "./Input";
import "../styles/InputRow.css";

export default function InputRow({
  fields,
  data,
  onChange,
  onRemove,
  showRemove,
}) {
  const handleFieldChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${fields.length}, 1fr) auto`,
      }}
    >
      {fields.map((field) => (
        <Input
          key={field.key}
          label={field.label}
          value={data[field.key]}
          onChange={(val) => handleFieldChange(field.key, val)}
        />
      ))}

      {showRemove && (
        <button type="button" onClick={onRemove} className="btn-remove">
          ✕
        </button>
      )}
    </div>
  );
}
