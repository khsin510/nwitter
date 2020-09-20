import React from "react";
import { authService } from "fbase";
export default () => {
    const onLogOutClick=()=>{
        authService.signOut();
    }
    return(
        <><button type="button" onClick={onLogOutClick}>Sign Out </button></>
    )
}