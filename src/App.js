import React, { useState } from "react";
import FacebookLoginButton from "./Components/FacebookLoginButton";
import axios from 'axios';
import './styles/App.css';
import Profile from "./Components/Profile";
import FacebookPageMetrics from "./Components/FacebookPageMetrics";
import Navbar from "./Components/Navbar";



const fetchUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v20.0/me?fields=id,name,picture&access_token=${accessToken}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};


function App() {
  const [userID, setUserID] = useState(null); 
  const [image,setimage]=useState('');
  const [accessToken, setAccessToken] = useState('');
  const [name ,setname]=useState('');
 
 



  
  const handleLoginSuccess = async (response) => {
    console.log("Login Success:", response);
    const {accessToken}=response;
    const userInfo = await fetchUserInfo(accessToken);
    if (userInfo) {
      console.log('User Info:', userInfo); 
    }
    setUserID(response.userID);
    setimage(userInfo.picture.data.url);
    setname(userInfo.name);
    setAccessToken(response.accessToken);
    
  };


  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };



  return (
    <div className="App">
      {!userID ? (
       <div className="box-login">
        <FacebookLoginButton
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
        </div>
      ) : (
        <>
        <Navbar/>
        <Profile  image={image}  name={name} />
        <FacebookPageMetrics accessToken={accessToken}/>
        </>

          
      )}
    </div>
  );
}

export default App;
