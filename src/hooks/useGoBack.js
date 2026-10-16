import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Returns to the previous page in the app. If there's no in-app history (the
// page was opened directly, e.g. from a shared link), goes to `fallback`.
export const useGoBack = (fallback = "/") => {
  const navigate = useNavigate();

  return useCallback(() => {
    // React Router stores the position in its history stack as `idx`.
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback]);
};
