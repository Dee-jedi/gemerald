import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// The UI guard is a convenience; security rules are what actually block writes.
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-wood)] border-t-transparent" />
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/products" replace />;
};

export default AdminRoute;
