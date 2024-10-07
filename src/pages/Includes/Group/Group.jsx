import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from '../../../components/Input/Input';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";
import '../../../assets/images/groupe.png'

import './Group.css'

export default function Group() {

   const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        
        localStorage.setItem("name", name);

        setIsLoading(true);
        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);

        const response = await axios.post(
            "http://127.0.0.1:8000/api/v2.0.0/group/create",
            formData
        );
        
      if (response.data.success) {
        toast.success(response.data.message);
        setIsLoading(false);
        setTimeout(function () {
          navigate("/group/create");
        }, 3000);
      } else {
        console.log(response.data);

        if (response.data.data.name !== undefined) {
          toast.error(response.data.data.name[0]);
        } else if (response.data.data.description !== undefined) {
          toast.error(response.data.data.description[0]);
        } 

        setIsLoading(false);
      }
    }
  return (
    <div className='container-group'>
      
    </div>
     
    
  )
}
