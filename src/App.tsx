import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./scenes/PublicHome";
import LoginRedirect from "./components/LoginRedirect";
import { Profile } from "./types/Profile";
import { API, TOKEN_KEY } from "./constants";
import { UserServices } from "./services/userServices";
import UserContext from "./types/UserContext";
import Layout from "./components/Layout";
import TasksView from "./scenes/TasksView";
import SprintsView from "./scenes/SprintsView";
import SprintDetailsView from "./scenes/SprintDetailsView";
import ProfileView from "./scenes/ProfileView";
import TaskDetailsView from "./scenes/TaskDetailsView";
import BadgesView from "./scenes/BadgesView";
import LeaderboardView from "./scenes/LeaderboardView";


function App() {
  const [loggedInUser, setLoggedInUser] = useState<Profile | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      API.TOKEN = token;
      const profile = await UserServices.fetchSelf();
      setLoggedInUser(profile);
    }
  };

  return (
    <div>
      <UserContext.Provider value={loggedInUser}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={"/login/success"} element={<LoginRedirect />} />
              <Route path={"/"} element={<PublicHome />} />
              <Route
                path={"/sprints"}
                element={<SprintsView isAgentView={false} />}
              />
              <Route
                path={"/sprints/:id"}
                element={<SprintDetailsView isAgentView={false} />}
              />
              <Route
                path={"/agent/sprints"}
                element={<SprintsView isAgentView={true} />}
              />
              <Route
                path={"/agent/sprints/:id"}
                element={<SprintDetailsView isAgentView={true} />}
              />
              <Route path={"/profile/:id"} element={<ProfileView />} />
              <Route
                path={"/tasks"}
                element={<TasksView isAgentView={false} />}
              />
              <Route
                path={"/agent/tasks"}
                element={<TasksView isAgentView={true} />}
              />
              <Route path={"/tasks/:id"} element={<TaskDetailsView  isAgentView={false} />}/>
              <Route path={"/agent/tasks/:id"} element={<TaskDetailsView  isAgentView={true} />}/>
              <Route
                path={"/leaderboard"}
                element={<LeaderboardView />}
              />
              <Route
                path={"/agent/leaderboard"}
                element={<LeaderboardView />}
              />
              <Route
                path={"/badges"}
                element={<BadgesView isAgentView={false} />}
              />
              <Route
                path={"/agent/badges"}
                element={<BadgesView isAgentView={true} />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
