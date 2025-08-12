export default function normalizeResumeData(data) {
  if (Array.isArray(data)) {
    return data
      .map(normalizeResumeData)
      .filter(v => v !== undefined && !(typeof v === "object" && Object.keys(v).length === 0));
  }

  if (typeof data === "object" && data !== null) {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      const val = normalizeResumeData(value);
      if (
        val !== undefined &&
        val !== "" &&
        !(Array.isArray(val) && val.length === 0) &&
        !(typeof val === "object" && Object.keys(val).length === 0)
      ) {
        cleaned[key] = val;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  if (typeof data === "string") {
    return data.trim() === "" ? undefined : data.trim();
  }

  return data; // numbers/booleans stay as is
}
