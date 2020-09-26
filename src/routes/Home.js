import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    
    const [nweet, setNweet] =useState("");
    const [nweets, setNweets] = useState([]);
    
    
    useEffect(() => {
       
        dbService.collection("nweets").onSnapshot(snapshot =>{
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
            setNweets(nweetArray)
        })
        
    }, [])
    const onSubmit = async (e) =>{
        e.preventDefault();
        await dbService.collection("nweets").add({
            text : nweet,
            createAt : Date.now(),
            createId : userObj.uid
        });
        setNweet("");
    }
    const onChange = (e) =>{
        const {
            target:{ value }
        } = e;
        setNweet(value);
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?"  maxLength={120} value={nweet}/>
                <input type="submit" placeholder="Nweet"/>
            </form>
            <div>
                {nweets.map(nweet =>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createId===userObj.uid}/>
                ))}
            </div>
        </>
    )
}
export default Home;