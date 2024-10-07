
import React, { useState } from 'react'
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";


export default function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.set("email", email);
    formData.set("password", password);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/login",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
    } else {
      console.log(response.data);
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  return (   
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <ToastContainer />               
            <form action="" onSubmit={handleSubmit}>
              {/* sign up */}
              <h1 className='title'>Connexion</h1>
              <span className='text-center span'>Connectez-vous à votre compte</span>
              <Input type={"email"} value={email} placeholder={"Email"} reference={"email"} onChange={(e) =>setEmail(e.target.value)} />
              <Input type={"password"}  value={password} placeholder={"Mot de passe"} reference={"password"} onChange={(e) =>setPassword(e.target.value)} />
                
              <Button className='btn btn-block' diseable={isLoading} type={"submit"} text={isLoading ? "chargement" : "Se Connecter"}/>
              <p className="message">
                N'avez-vous pas de compte ?
                <br />
                <Link to="/registration" >Créer votre compte</Link>
              </p>
            </form>
        </div>
      </div>               
  )
}
