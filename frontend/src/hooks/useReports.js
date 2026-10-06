import { useCallback, useState } from "react";
import * as reportService from "../services/reportService.js";

export function useReports() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (payload) => {
    setSubmitting(true);
    setError(null);
    try {
      return await reportService.submitReport(payload);
    } catch (err) {
      setError(err?.data?.message || "Couldn't submit the report. Please try again.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { submit, submitting, error };
}
