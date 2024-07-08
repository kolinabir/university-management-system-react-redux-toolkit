import React from "react";
import MainLayout from "./components/layout/MainLayout";
import ProjectedRoute from "./components/layout/ProjectedRoute";

const App = () => {
  return (
    <ProjectedRoute>
      <MainLayout></MainLayout>
    </ProjectedRoute>
  );
};

export default App;
