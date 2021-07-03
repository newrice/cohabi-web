import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BASE_BACKEND, getData, postData } from "./api/api-base";
import settings from "./settings";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Profile = (): JSX.Element => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-uql6wxih.jp.auth0.com";
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (user) getUserMetadata();
  }, [user]);
  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  ) : (
    <></>
  );
};

const Greet = (): JSX.Element => {
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

const App = (): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>env:{process.env.NODE_ENV}</h1>
      <Profile />
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      {isAuthenticated && <Greet />}
    </div>
  );
};

export default App;
