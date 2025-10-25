import { useState } from "react";
import Form from "./components/Form";
import CVPreview from "./components/CVPreview";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const formConfigs = [
    {
      id: "personal",
      title: "Basic Info",
      multiple: false,
      fields: [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Mobile", key: "mobile" },
        { label: "Address", key: "address" },
        { label: "Headline", key: "headline" },
      ],
    },
    {
      id: "work",
      title: "Work Experience",
      multiple: true,
      fields: [
        { label: "Company", key: "company" },
        { label: "Position", key: "position" },
        { label: "Start Year", key: "startYear" },
        { label: "End Year", key: "endYear" },
        { label: "JD / KRA", key: "description", type: "textarea" }, // ✅ already added
      ],
    },
    {
      id: "education",
      title: "Education",
      multiple: true,
      fields: [
        { label: "Degree/Certificate", key: "qualification" },
        { label: "Subject", key: "subject" }, // ✅ new field
        { label: "Year", key: "year" },
      ],
    },
  ];

  const [formData, setFormData] = useState(
    formConfigs.reduce((acc, form) => {
      acc[form.id] = form.multiple
        ? [{ ...form.fields.reduce((f, x) => ({ ...f, [x.key]: "" }), {}) }]
        : { ...form.fields.reduce((f, x) => ({ ...f, [x.key]: "" }), {}) };
      return acc;
    }, {})
  );

  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (formId, updatedData) => {
    setFormData((prev) => ({
      ...prev,
      [formId]: updatedData,
    }));
  };

  const handleSubmitAll = () => {
    setSubmitted(true);
  };
  // helper: consider a value "present" only if it's non-empty after trimming
  const present = (v) => typeof v === "string" && v.trim() !== "";

  // helper: decide whether a row (object) is blank (all fields empty)
  const isRowBlank = (row) =>
    Object.values(row).every((val) =>
      typeof val === "string" ? val.trim() === "" : !val
    );

  // helper: decide whether a section array has any non-blank row
  const sectionHasData = (sectionData) => {
    if (!sectionData) return false;
    // sectionData may be either an array (multiple) or an object (single)
    if (Array.isArray(sectionData)) {
      return sectionData.some((row) => !isRowBlank(row));
    }
    return !isRowBlank(sectionData);
  };

  // inside your component, derive booleans from current formData:
  const personal = formData.personal || {};
  const work = formData.work || [];
  const education = formData.education || [];

  // requirement 1: name, email, headline must be present
  const personalRequiredFilled =
    present(personal.name) &&
    present(personal.email) &&
    present(personal.headline);

  // requirement 2: at least one of work or education must have data
  const workHas = sectionHasData(work);
  const educationHas = sectionHasData(education);
  const atLeastOneSectionHas = workHas || educationHas;

  // final enable/disable decision
  const canGenerate = personalRequiredFilled && atLeastOneSectionHas;
  return (
    <div className="app">
      <Header />

      {!submitted ? (
        <>
          {formConfigs.map((form) => (
            <Form
              key={form.id}
              title={form.title}
              fields={form.fields}
              multiple={form.multiple}
              data={formData[form.id]}
              onChange={(updated) => handleFormChange(form.id, updated)}
            />
          ))}

          <button
            className={canGenerate ? "btn btn-generate" : "btn btn-nogenerate"}
            onClick={handleSubmitAll}
            disabled={!canGenerate}
          >
            Generate CV
          </button>

          {!canGenerate && (
            <div className="msg">
              Please fill Name, Email and Headline, and at least one Work or
              Education entry.
            </div>
          )}
        </>
      ) : (
        <CVPreview data={formData} onBack={() => setSubmitted(false)} />
      )}
    </div>
  );
}
