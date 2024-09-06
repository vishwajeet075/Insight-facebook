import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'5%'}}>Login with Facebook</h1>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID} 
        onSuccess={onLoginSuccess}
        onFail={onLoginFailure}
        fields="name,email,picture"
        scope="pages_show_list,read_insights,pages_manage_metadata,public_profile,pages_read_engagement,pages_read_user_content" 
        render={({ onClick }) => (
          <button onClick={onClick} style={buttonStyle}>
            Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4267B2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  width : "95%",
  marginTop:"40px",
  marginLeft : "2%",
};

export default FacebookLoginButton;
