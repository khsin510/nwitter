import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

  
    const onSocialClick = async (e) =>{

        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(provider);
        
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="3x" style={{marginBottom: 30 }} />
            <AuthForm />
            <div className="authBtns">

                <button name="google" onClick={onSocialClick}  className="authBtn" >Continue with Google <FontAwesomeIcon icon={faGoogle} /></button> 
               
            </div>
           
        </div>
    )
}

export default Auth;