// deepUpdate.js
export default function deepUpdate(obj, path, value) {
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .split(".")
        .map((k) => (k.match(/^\d+$/) ? Number(k) : k));

  // shallow clone root (deep cloning via structuredClone when available)
  const clone = (v) => {
    if (typeof structuredClone === "function") return structuredClone(v);
    return JSON.parse(JSON.stringify(v));
  };

  const newObj = clone(obj);
  let cur = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    // create intermediate structures if missing
    if (cur[k] === undefined) {
      // decide whether next key is a number -> array; else object
      cur[k] = typeof keys[i + 1] === "number" ? [] : {};
    } else {
      // ensure arrays remain arrays and objects remain objects
      if (typeof keys[i + 1] === "number" && !Array.isArray(cur[k])) {
        cur[k] = [];
      } else if (typeof keys[i + 1] !== "number" && Array.isArray(cur[k])) {
        cur[k] = { ...cur[k] };
      }
    }
    cur[k] = clone(cur[k]);
    cur = cur[k];
  }

  const lastKey = keys[keys.length - 1];

  if (typeof value === "function") {
    cur[lastKey] = value(cur[lastKey]);
  } else {
    cur[lastKey] = value;
  }

  return newObj;
}
