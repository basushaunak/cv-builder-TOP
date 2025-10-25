import InputRow from "./InputRow";
import "../styles/Form.css";

export default function Form({ title, fields, multiple, data, onChange }) {
  const handleRowChange = (index, updatedRow) => {
    if (multiple) {
      const newData = [...data];
      newData[index] = updatedRow;
      onChange(newData);
    } else {
      onChange(updatedRow);
    }
  };

  const addRow = () => {
    const emptyRow = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});
    onChange([...data, emptyRow]);
  };

  const removeRow = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <fieldset>
      <legend>{title}</legend>

      {multiple ? (
        data.map((row, i) => (
          <InputRow
            key={i}
            index={i}
            fields={fields}
            data={row}
            onChange={(updatedRow) => handleRowChange(i, updatedRow)}
            onRemove={() => removeRow(i)}
            showRemove={data.length > 1}
          />
        ))
      ) : (
        <InputRow
          fields={fields}
          data={data}
          onChange={(updatedRow) => handleRowChange(null, updatedRow)}
          showRemove={false}
        />
      )}

      {multiple && (
        <button type="button" onClick={addRow}>
          + Add {title.split(" ")[0]}
        </button>
      )}
    </fieldset>
  );
}
