import React,{useState} from "react";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({userObj}) =>{
    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
      if(nweet === "") {
        return;
      }
      e.preventDefault();

      let attachmentUrl = "";

      if (attachment!==""){
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl =  await response.ref.getDownloadURL();
      }
       
        const nweetObj = {
          text: nweet,
          createAt: Date.now(),
          createId: userObj.uid,
          attachmentUrl
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("")
      };
      const onChange = (e) => {
        const {
          target: { value },
        } = e;
        setNweet(value);
      };
    
      const onFileChange = (e) => {
        const {
          target: { files },
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishevent) => {
          const {
            currentTarget: { result },
          } = finishevent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
    
      const onClearAttachment = () => {
        setAttachment("");
      };


    return(
        <form onSubmit={onSubmit} className="factoryForm">
          <div className="factoryInput__container">
            <input
              className="factoryInput__input"
              type="text"
              onChange={onChange}
              placeholder="What's on your mind?"
              maxLength={120}
              value={nweet} />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            
          </div>
          <label for="attach-file" className="factoryInput__label">
            <span>Add Photos</span>
            <FontAwesomeIcon icon={faPlus}/>
          </label>
       

          <input type="file" accept="image/*" onChange={onFileChange} id="attach-file" style={{
          opacity: 0,
        }}/>

        {attachment && (
          <div className="factoryForm__attachment">
            <img src={attachment} style={{backgroundImage:attachment}} />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>


          </div>
        )}
      </form>
    )
}

export default NweetFactory;