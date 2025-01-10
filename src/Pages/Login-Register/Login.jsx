import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";
import Input from "../../Components/Input";
import loginImg from "../../assets/Login-Register/image-5.jpg";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const credentials = {
  admin: {
    email: "admin@mail.com",
    password: "Admin@123",
  },
  user: {
    email: "user@mail.com",
    password: "User@123",
  },
};

const Login = () => {
  const [userCredential, setUserCredential] = useState();

  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.Email.value;
    const password = form.Password.value;
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        form.reset();
        toast.info(
          <p>
            <span className="font-semibold">{user.displayName}</span>, Welcome
            to Diner Dynasty
          </p>
        );
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div>
      <Helmet>
        <title>Diner Dynasty | Login</title>
      </Helmet>
      <section className="bg-base-100">
        <div className="lg:grid lg:grid-cols-12 min-h-screen">
          <section className="relative flex h-32 items-end bg-black lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src={loginImg}
              className="absolute inset-0 h-full w-full object-cover opacity-50 blur-sm "
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <div className="flex items-center">
                <Link to={"/"} className="relative block">
                  <span className="sr-only">Home</span>
                  <BiSolidDish className="text-8xl text-amber-500 animate-ping blur"></BiSolidDish>
                  <BiSolidDish className="absolute top-0 text-8xl text-amber-500"></BiSolidDish>
                </Link>

                <h2 className="mt-6 text-2xl font-bold text-amber-500 sm:text-3xl md:text-5xl">
                  Diner Dynasty
                </h2>
              </div>

              <p className="mt-4 leading-relaxed text-white">
                {`Please log in to access your account and unlock exclusive
                offers, make reservations, and explore our mouthwatering menu.
                If you're new to Diner Dynasty, don't worry... you're in for a
                treat!`}
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <Link to={"/"} className="relative block">
                  <span className="sr-only">Home</span>
                  <BiSolidDish className="text-6xl text-amber-500 animate-ping blur"></BiSolidDish>
                  <BiSolidDish className="absolute top-0 text-6xl text-amber-500"></BiSolidDish>
                </Link>

                <h2 className="mt-6 text-2xl font-bold text-amber-500 sm:text-3xl md:text-5xl">
                  Diner Dynasty
                </h2>

                <p className="mt-4 leading-relaxed">
                  {`Please log in to access your account and unlock exclusive
                  offers, make reservations, and explore our mouthwatering menu.
                  If you're new to Diner Dynasty, don't worry ... you're in for a
                  treat!`}
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold col-span-6">
                Login
              </h2>
              <div className="my-4 space-x-2">
                <button
                  className="rounded-full px-3 bg-blue-600 text-white"
                  onClick={() => setUserCredential(credentials.user)}
                >
                  user
                </button>
                <button
                  className="rounded-full px-2 bg-green-600 text-white"
                  onClick={() => setUserCredential(credentials.admin)}
                >
                  admin
                </button>
              </div>
              <form
                onSubmit={handleLogin}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 ">
                  <Input
                    name={"Email"}
                    type={"email"}
                    defaultValue={userCredential?.email}
                  ></Input>
                </div>

                <div className="col-span-6 ">
                  <Input
                    name={"Password"}
                    type={"password"}
                    defaultValue={userCredential?.password}
                  ></Input>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <input
                    className="btn btn-outline text-xs"
                    type="submit"
                    value="Login"
                  />

                  <p className="mt-4 text-sm sm:mt-0">
                    {"Don't have an account?"}
                    <Link
                      to={"/register"}
                      className="font-bold text-amber-500 underline px-2"
                    >
                      Register
                    </Link>
                    .
                  </p>
                </div>
              </form>
              <SocialLogin></SocialLogin>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
