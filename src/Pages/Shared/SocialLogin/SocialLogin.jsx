import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((userCredentials) => {
        const user = userCredentials.user;
        const saveUser = { userName: user.displayName, userEmail: user.email };
        fetch(`http://localhost:5000/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.info(
              <p>
                <span className="font-semibold">{user.displayName}</span>,
                Welcome to Diner Dynasty
              </p>
            );
            navigate(from, { replace: true });
          });
      })
      .catch((error) => toast.error(error.meassage));
  };
  return (
    <div>
      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-block"
      >
        <FaGoogle size={"1.5em"} /> Sign In with Google
      </button>
    </div>
  );
};

export default SocialLogin;
