import React, { useState } from "react";

const Auth = () => {
    const [inputs, setInput] = useState({email:"", password:""});
    const {email, password} = inputs;

    const onChange = (event)=> {

        const {name, value} = event.target;
        setInput({
            ...inputs, [name]: value
        });

    }

    const onSubmit =(event)=>{
        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="Email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value="Sign In" />
            </form>
            <div>
                <button>Continue with Google</button>
                {inputs.email}
            </div>
        </div>
    )
}

export default Auth;