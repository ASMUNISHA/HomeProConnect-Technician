import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { TechnicianApp } from "../../infrastructure";

export const AppStack=()=>{
  return (
    <>
        <TechnicianApp/>
      <ExpoStatusBar style="auto" />
    </>
  );
};