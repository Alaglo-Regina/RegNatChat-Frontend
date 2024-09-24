import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import axios from 'axios';

export default function Dashboard() {

  const [name, setName] = useState;
  const [description, setDescription] = useState;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)


    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    
    const response = await axios.post(
       "http://127.0.0.1:8000/api/v2.0.0/group/store",
        formData
    )
  }
  return (
    <div>
      <h1>Hello world</h1>
      <Button text={'Se déconnecter'} />
      
    </div>
  )
}
