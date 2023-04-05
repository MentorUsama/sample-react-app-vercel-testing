import React,{useEffect} from 'react';
import AppleLogin from 'react-apple-login';
import * as styles from './styles';
import axios from 'axios';

// https://appleid.apple.com/auth/authorize?response_type=code%20id_token&client_id=com.tandemexperiences.login.app&redirect_uri=https://sample-react-app-vercel-testing.vercel.app/&state=aa5b531d39&scope=name%20email&response_mode=form_post
const ContinueWithApple = ({ appleResponse }) => {
  const params = new URLSearchParams(window.location.search);
  const onResponseReceived = async (data) => {
    console.log("data v1",data)
    if(!data.code) 
      return
    try{
      const response = await axios.post("http://localhost:8000/api/user/apple-auth",{
          code:data.code
      })
      console.log(response)
    }catch(e){
      console.log("error",e)
    }
  };

  useEffect(() => {
    let apple_auth = params.get('appletoken');
    if (!apple_auth) return;
    const decodedAcces=decodeURI(apple_auth)
    console.log('apple_auth found', decodedAcces);
  }, []);

  return (
    <AppleLogin
      clientId="com.tandemexperiences.login.app"
      redirectURI="https://sample-react-app-vercel-testing.vercel.app/"
      usePopup={false}
      callback={onResponseReceived} // Catch the response
      scope="email name"
      responseMode="query"
      responseType="code"
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
