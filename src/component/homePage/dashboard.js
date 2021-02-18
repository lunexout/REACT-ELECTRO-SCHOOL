import React from "react";
import { useHistory } from "react-router-dom";
import StudentDashboard from "./../studentDashboard/studentHero/studentHero";
import TeacherDashboard from "./../teacherDashboard/teacherDashboard";

export default function Dashboard() {
  const history = useHistory();
  const renderLocalState = () => {
    if (
      localStorage.getItem("login") === "logged" &&
      localStorage.getItem("type") === "student"
    ) {
      return <StudentDashboard />;
    } else if (
      localStorage.getItem("login") === "logged" &&
      localStorage.getItem("type") === "teacher"
    ) {
      return <TeacherDashboard />;
    } else {
      history.push("/");
    }
  };

  return <>{renderLocalState()}</>;
}