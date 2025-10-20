import React from "react";
import { navigate } from "rwsdk/client";

type LoginSiteProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function login(setIsLoggedIn: boolean) {
    setIsLoggedIn=true;
    navigate("/");
}

export default function LoginSite({ setIsLoggedIn }: LoginSiteProps) {
  return (
    <div>
        <p>Du er ikke logget inn :/</p>
        <button type="button" onClick={() => setIsLoggedIn(true)}>
            Log in
        </button>
    </div>
  );
}