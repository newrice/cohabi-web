import React, { useState } from "react";
import { BASE_BACKEND, getData, postData } from "./api/api-base";
import settings from "./settings";

const App = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [nameList, setNameList] = useState<string[]>([]);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    postData({
      url: BASE_BACKEND + settings.url.hello,
      body: { name },
    }).then(() => {
      getData({
        url: BASE_BACKEND + settings.url.hello,
      }).then(res => {
        setNameList(
          res.body.users.map((item: any) => {
            if (typeof item === "string") {
              return item;
            }
            return item.name;
          }),
        );
      });
    });
  };
  return (
    <div>
      <h1>env:{process.env.NODE_ENV}</h1>
      <div>
        <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        <button onClick={handleClick}>greet</button>
      </div>
      <div>
        <ol>
          {nameList.map(n => (
            <li>{`${n || "名無し"} さん、こんにちは`}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
