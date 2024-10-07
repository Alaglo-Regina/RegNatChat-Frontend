import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import './Registration.css';
// import '../../../assets/icons/icons/css/all.min.css'


export default function Registration() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (email.trim().length < 6 || email.trim().length > 32) {
            setError(true);
            const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
            toast.error(errorMessage);
            return;
        }

        if (password.trim().length < 6 || password.trim().length > 32) {
            setError(true);
            const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
            toast.error(errorMessage);
            return;
        }

        if (passwordConfirm.trim() != password.trim()) {
            setError(true);
            const errorMessage = "Les deux mot de passe sont différents";
            toast.error(errorMessage);
            return;
        }
        
        localStorage.setItem("email", email);

        setIsLoading(true);
        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);

        const response = await axios.post(
            "http://127.0.0.1:8000/api/v2.0.0/register",
            formData
        );
        
        if (response.data.success) {
            toast.success(response.data.message);
            setIsLoading(false);
            setTimeout(function () {
                navigate("/otp-code/"+email);
            }, 3000);
        } else {
            console.log(response.data);

            if (response.data.data.name !== undefined) {
                toast.error(response.data.data.name[0]);
            } else if (response.data.data.email !== undefined) {
                toast.error(response.data.data.email[0]);
            } else if (response.data.data.password !== undefined) {
                toast.error(response.data.data.password[0]);
            } else if (response.data.data.passwordConfirm !== undefined) {
                toast.error(response.data.data.passwordConfirm[0]);
            }

            setIsLoading(false);
        }
    };
  return (
     <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <ToastContainer stacked />               
            <form action="" onSubmit={handleSubmit}>
              {/* sign up */}
              <h1 className='title'>Inscription</h1>
              <span className='text-center span'>Inscrivez-vous à notre chat</span>
              <Input label={"name"} type={"text"} value={name} placeholder={"Nom"} reference={"name"} onChange={(e) =>setName(e.target.value)} />
              <Input label={"email"}  type={"email"} value={email} placeholder={"Email"} reference={"email"} onChange={(e) =>setEmail(e.target.value)} />
              <Input label={"password"}  type={"password"} value={password} placeholder={"Mot de passe"} reference={"password"} onChange={(e) =>setPassword(e.target.value)} />
              <Input label={"passwordConfirm"}  type={"password"}  value={passwordConfirm} placeholder={"Confirmation de Mot de passe"} reference={"passwordConfirm"} onChange={(e) =>setPasswordConfirm(e.target.value)} />
                
              <Button diseable={isLoading} type={"submit"} text={isLoading ? "chargement ..." : "Se Connecter"}/>
              <p className="message">
                Avez-vous déjà un compte ?
                <br />
                <Link to={"/"} >Connectez-vous à votre compte</Link>
              </p>
            </form>
        </div>
    </div>  
  )
}
