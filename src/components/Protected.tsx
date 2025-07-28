import { Navigate } from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default Protected;
