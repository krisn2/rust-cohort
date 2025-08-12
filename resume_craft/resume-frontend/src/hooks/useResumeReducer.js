import { useReducer, useCallback } from "react";
import deepUpdate from "../utils/deepUpdate";

export const initialState = {
  personal: {
    fullname: "",
    number: "",
    email: "",
    linkedin_name: "",
    linkedin_url: "",
    github_name: "",
    github_url: "",
    web_url: "",
    address: "",
  },
  education: {
    educations: [
      { school: "", degree: "", start_date: "", end_date: "", address: "" },
    ],
  },
  experience: {
    experiences: [
      {
        position: "",
        start_date: "",
        end_date: "",
        company_name: "",
        address: "",
        job_des: { lines: [""] },
      },
    ],
  },
  projects: {
    projects: [
      {
        name: "",
        tech_stack: "",
        start_date: "",
        end_date: "",
        project_des: { lines: [""] },
      },
    ],
  },
  skills: {
    categories: [{ category_name: "", items: [""] }],
  },
  certifications: {
    certifications: [
      { title: "", date: "", issuer: "", certificate_url: "", details: [""] },
    ],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD": {
      // action.path: string or array, action.value: new value or updater function
      return deepUpdate(state, action.path, action.value);
    }
    case "ADD_ITEM": {
      // path points to array, newItem provided
      return deepUpdate(state, action.path, (arr = []) => [...arr, action.newItem]);
    }
    case "REMOVE_ITEM": {
      // path points to array; action.index
      return deepUpdate(state, action.path, (arr = []) =>
        arr.filter((_, i) => i !== action.index)
      );
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function useResumeReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = useCallback((path, value) => {
    dispatch({ type: "UPDATE_FIELD", path, value });
  }, []);

  const addItem = useCallback((path, newItem) => {
    dispatch({ type: "ADD_ITEM", path, newItem });
  }, []);

  const removeItem = useCallback((path, index) => {
    dispatch({ type: "REMOVE_ITEM", path, index });
  }, []);

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return { state, updateField, addItem, removeItem, reset };
}
