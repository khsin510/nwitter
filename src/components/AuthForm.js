import React,{useState} from 'react';
import { authService } from "fbase";


const AuthForm = () =>{
    
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

    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="Email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit" />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch" >{newAccount?"Sign In": "Create Account"}</span>
          

        </>
    )
}

export default AuthForm;