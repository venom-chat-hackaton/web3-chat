import { useAuth } from "src/hooks/useAuth";

const Auth = () => {
  const { wallet, logIn, logOut } = useAuth();

  const onLogIn = () => {
    logIn();
  };

  const onLogOut = () => {
    logOut();
  };

  return (
    <div>
      {wallet ? JSON.stringify(wallet) : "Not connected"}
      <div onClick={onLogIn}>Login</div>
      <div onClick={onLogOut}>Logout</div>
    </div>
  );
};

export default Auth;
