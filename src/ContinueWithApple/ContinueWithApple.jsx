import React from 'react';
import AppleLogin from 'react-apple-login';
import * as styles from './styles';
import axios from 'axios';

const ContinueWithApple = ({ appleResponse }) => {
  const onResponseReceived = async (data) => {
    console.log("data",data)
    if(!data.token) 
      return
    try{
      const response = await axios.post("http://localhost:8000/api/user/apple-auth",{
        data:{
          code:data.code
        }
      })
      console.log(response)
    }catch(e){
      console.log("error",e)
    }
  };
  return (
    <AppleLogin
      clientId="com.tandemexperiences.login.app"
      redirectURI="https://sample-react-app-vercel-testing.vercel.app/"
      usePopup={false}
      callback={onResponseReceived} // Catch the response
      scope="email name"
      responseMode="query"
      render={(
        renderProps //Custom Apple Sign in Button
      ) => (
        <button
          onClick={renderProps.onClick}
          style={styles.SignInWithAppleButton}
        >
          <i className="fa-brands fa-apple px-2 "></i>
          Continue with Apple
        </button>
      )}
    />
  );
};

export default ContinueWithApple;
