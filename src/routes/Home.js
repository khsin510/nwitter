import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [nweet, setNweet] =useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () =>{
        const dbNweets = await dbService.collection("nweets").get();
        // dbNweets.forEach(doc => console.log(doc.data()));
       dbNweets.forEach(doc => {
           const nweetObject = {
               ...doc.data(),
               id:doc.id,
           }
           setNweets(prev => [nweetObject, ...prev]);
       });
    }
    useEffect(() => {
        getNweets();
    }, [])
    const onSubmit = async (e) =>{
        e.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createAt:Date.now(),
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
                {nweets.map(nweet=>(
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Home;