import React, { useState } from "react";
import s from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";

const RegistrationForm = ({addContact}) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        lastname: '',
        password: ''
    });

    const { register, handleSubmit, formState } = useForm();


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     addContact(userInfo);
    //     setUserInfo({ name: "", lastname: "", password: ""});
    // };

    // const handleOnChange = (event) => {
    //     // console.log(event.target.value)
    //     setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    // };

    const onSubmit = (data) => {
        console.log(data)
    }



  return (
    // <form className={s.form} onSubmit={handleSubmit}>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        {...register("name")}
        type="text"
        // name="name"
        placeholder="Введите имя"
        // value={userInfo.name}
        // onChange={handleOnChange}
      ></input>
      <input
        {...register("email")}
        type="text"
        // name="lastname"
        placeholder="Введите email"
        // value={userInfo.lastname}
        // onChange={handleOnChange}
      ></input>
      <input
        {...register("password")}
        type="password"
        // name="password"
        placeholder="Введите пароль"
        // value={userInfo.password}
        // onChange={handleOnChange}
      ></input>
      <button>Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
