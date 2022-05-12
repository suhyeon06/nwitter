import { React, useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
  //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함

  useEffect(() => {
    const q = query(collection(dbService, 'nweets'));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  // const getNweets = () => {
  //   getDocs(collection(dbService, 'nweets')).then((snapshot) => {
  //     let dbNweets = [];
  //     snapshot.docs.forEach((doc) => {
  //       dbNweets.push({ ...doc.data(), id: doc.id });
  //     });
  //     setNweets(dbNweets);
  //   });
  // };

  // const getNweets = async () => {
  // const querySnapshot = await getDocs(collection(dbService, "nweets"));
  //   querySnapshot.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };
  // useEffect(() => {
  //   getNweets();
  // }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
