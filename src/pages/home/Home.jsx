import React, { useEffect, useState } from "react";
import DestinationDiv from "../../components/homepage/DestinationDiv";
import StoryDiv from "../../components/homepage/StoryDiv";
import MilestonesDiv from "../../components/homepage/MilestonesDiv";
import SubscribeDiv from "../../components/homepage/SubscribeDiv";
import Main from "../../components/homepage/Main";
import "./Home.scss";
import { useAlert } from "../../context/errAlert/AlertContext";
import { exchangeCodeForTokens } from "../../services/user/LoginSignup";
import Loading from "../../components/loading/Loading";
import { GetUser } from "../../services/user/GetUser";

const Home = () => {
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get("code");
    // if (code) {
    //   setLoading(true);
    //   try {
    //     exchangeCodeForTokens(code);
    //     setLoading(false);
    //   } catch (error) {
    //     setLoading(false);
    //     showAlert("Error exchanging code for tokens", "error");
    //   }
    // }
  });

  return (
    <div className="home">
      {loading && <Loading />}
      <Main />
      <DestinationDiv />
      <StoryDiv id="#our-story"/>
      {/* <MilestonesDiv /> */}
      <SubscribeDiv />
    </div>
  );
};

export default Home;
