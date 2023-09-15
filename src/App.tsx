import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "unauthenticated-app/login";
import { useAuth } from "context/auth-context";
import AuthenticatedApp from "authenticated-app";
import { UnauthenticaredApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticaredApp />}
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
