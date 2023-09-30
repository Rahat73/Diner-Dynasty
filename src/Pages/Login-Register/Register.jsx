import { Link, useNavigate } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import {
  inputClassName,
  labelClassName,
  spanClassName,
} from "../../Components/Input";
import loginImg from "../../assets/Login-Register/image-5.jpg";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      createUser(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          updateUser(data.name, data.photoURL)
            .then(() => {
              toast.success(`Account has been created successfully`);
              navigate("/login");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Helmet>
        <title>Diner Dynasty | Register</title>
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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <h2 className="text-2xl md:text-3xl font-bold col-span-6">
                  Register
                </h2>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="username" className={labelClassName}>
                    <input
                      type="text"
                      id="username"
                      className={inputClassName}
                      placeholder="Username"
                      required
                      {...register("name")}
                    />
                    <span className={spanClassName}>Username</span>
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className={labelClassName}>
                    <input
                      type="email"
                      id="email"
                      className={inputClassName}
                      placeholder="Email"
                      required
                      {...register("email")}
                    />
                    <span className={spanClassName}>Email</span>
                  </label>
                </div>

                <div className="col-span-6">
                  <label htmlFor="password" className={labelClassName}>
                    <input
                      type="password"
                      id="password"
                      className={inputClassName}
                      placeholder="Password"
                      required
                      {...register("password", {
                        minLength: 6,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                    />
                    {errors.password?.type === "minLength" && (
                      <p className="text-xs text-red-400 ml-3">
                        Password must be of 6 characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-xs text-red-400">
                        Password must have a uppercase, digit, lowercase &
                        special character (!@#$&*)
                      </p>
                    )}
                    <span className={spanClassName}>Password</span>
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="confirmPassword" className={labelClassName}>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={inputClassName}
                      placeholder="Confirm Password"
                      required
                      {...register("confirmPassword")}
                    />
                    <span className={spanClassName}>Confirm Password</span>
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="photoUrl" className={labelClassName}>
                    <input
                      type="text"
                      id="photoUrl"
                      className={inputClassName}
                      placeholder="photoUrl"
                      required
                      {...register("photoURL")}
                    />
                    <span className={spanClassName}>photoUrl</span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm ">
                    By creating an account, you agree to our
                    <Link
                      to={"/"}
                      className="font-semibold text-amber-500 underline px-2"
                    >
                      terms and conditions
                    </Link>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <input
                    className="btn btn-outline text-xs"
                    type="submit"
                    value="Create An Account"
                  />

                  <p className="mt-4 text-sm sm:mt-0">
                    Already have an account?
                    <Link
                      to={"/login"}
                      className="font-bold text-amber-500 underline px-2"
                    >
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Register;
