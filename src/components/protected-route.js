import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({redirectPath = '/login'}) {
  const [user] = useAuthState(auth);
  
  if(!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}