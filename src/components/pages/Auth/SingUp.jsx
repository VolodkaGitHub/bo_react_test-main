import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Popup from "@components/library/UI/Popup";
import Check from "@components/pages/Auth/components/CheckInbox";
import Input from "@components/library/UI/Input";
import { Button } from "@components/library";
import PasswordRequirements from "@components/pages/Auth/components/PasswordRequirements";
import { registration } from "@actions/auth";
import { useDispatch } from "react-redux";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";

export const SingUp = () => {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { __ } = useTranslation();

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("RESULT", data, isValid);
    setLoading(true);
    const { email, password } = data;
    dispatch(registration({ email, password }))
      .then(() => {
        setModalActive(email);
        reset();
      })
      .catch((error) => {
        const data = error?.response?.data?.errors;
        if (data) {
          Object.keys(data).forEach((error) => {
            let nameError = error;

            if (error === "first_name" || error === "last_name") {
              nameError = "full_name";
            }

            setError(nameError, {
              type: "custom",
              message: data[error][0],
            });
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.create_account")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2 className="auth-form__title">{__("auth.create_acc")}</h2>

        <p className="auth-form__text">
          {__("auth.have_acc")}&nbsp;
          <Link to="/auth/login">{__("auth.sign_in")}</Link>
        </p>

        <Input
          className={"auth.js-form__inp-wrap"}
          data={{
            label: `${__("common.email")}`,
            type: "email",
            placeholder: `${__("common.enter_email")}`,
            errors,
            settings: {
              ...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }),
            },
            message: `${__("error.email_format")}`,
            name: "email",
          }}
        />

        <Input
          className={"auth.js-form__inp-wrap"}
          data={{
            label: `${__("common.password")}`,
            type: isTypePassword ? "password" : "text",
            placeholder: `${__("common.enter_password")}`,
            errors,
            settings: {
              ...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
              }),
            },
            name: "password",
          }}
        >
          <button
            type="button"
            className={`bo-input__icon bo-input__icon--eye ${
              !isTypePassword ? "open" : ""
            }`}
            onClick={() => setIsTypePassword(!isTypePassword)}
          ></button>
        </Input>

        <PasswordRequirements password={password} />

        <ul className="auth-form__list-agree list-agree">
          <li className="list-agree__item">
            <input
              className="bo-checkbox"
              id="pp"
              type="checkbox"
              {...register("privacy", {
                required: true,
              })}
            />
            <label htmlFor="pp" className="bo-checkbox-label">
              <p>
                {__("auth.agree_to")}&nbsp;
                <Link to="/page/terms-and-conditions">
                  {__("auth.terms")}
                </Link>{" "}
                {__("auth.and")}{" "}
                <Link to="/page/privacy-policy">{__("auth.p_p")}</Link>
              </p>
            </label>
          </li>

          <li className="list-agree__item">
            <input
              className="bo-checkbox"
              id="cp"
              type="checkbox"
              {...register("cookie", {
                required: true,
              })}
            />
            <label htmlFor="cp" className="bo-checkbox-label">
              <p>
                {__("auth.agree_to")}&nbsp;
                <Link to="/page/cookie-policy">{__("auth.cookie_policy")}</Link>
              </p>
            </label>
          </li>
        </ul>

        <Button
          className="auth-form__btn"
          disabled={!isValid}
          size="middle"
          type="submit"
          color="white"
          isLoading={loading}
        >
          {__("auth.sign_up")}
        </Button>
      </form>
      <Popup active={modalActive} setActive={setModalActive}>
        <Check email={modalActive} />
      </Popup>
    </>
  );
};

export default SingUp;
