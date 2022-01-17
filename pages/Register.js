import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { userRegister } from "../redux/actions/LoginActions";
import Cookie from "js-cookie";
import styles from "../styles/Auth.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (Cookie.get("token")) {
      router.push("/");
    }
  }, []);

  const userAuth = (e) => {
    e.preventDefault();

    dispatch(
      userRegister({
        email: email,
        password: password,
      })
    );

    router.push("/Login");
  };

  return (
    <div>
      <div className={styles.formLogin}>
        <div className="w-50">
          <h1>REGISTER</h1>
        </div>
        <form className="w-50" onSubmit={userAuth}>
          <div className="mt-1">
            <label>Email</label>
            <div className="border border-primary rounded">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-4'>
            <label>Password</label>
            <div className="border border-primary rounded">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </span>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary w-100">Register</button>
          </div>
        </form>
        <div className="mt-4">
          <p>Already have an account?&nbsp;
            <a className="text-primary" onClick={() => router.push("/Login")}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
