import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [inputs, setInput] = useState({email:"", password:""});
    const {email, password} = inputs;
    const [newAccount, setNewAcoount] = useState(true);
    const [error, setError]= useState("");

    const onChange = (event)=> {

        const {name, value} = event.target;
        setInput({
            ...inputs, [name]: value
        });

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
          let data;
          if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(
              email,
              password
            );
          } else {
            data = await authService.signInWithEmailAndPassword(email, password);
          }
          console.log(data);
        } catch (error) {
            setError(error.message);
        }
      };

    const toggleAccount = () => setNewAcoount(prev => !prev);

    const onSocialClick = async (e) =>{

        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="Email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
               
            </div>
            <span onClick={toggleAccount}>{newAccount?"Sign In": "Create Account"}</span>
            <h1>{error}</h1>
        </div>
    )
}

export default Auth;