import { logout } from "auth-provider";
import * as React from "react";
import { ProjectListScreen } from "screens/project-list";

function AuthenticatedApp() {
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectListScreen />
    </div>
  );
}

export default AuthenticatedApp;
