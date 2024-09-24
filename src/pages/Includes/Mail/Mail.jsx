import React, { useState } from 'react'
import Button from '../../../components/Button/Button'

export default function Mail() {

    const [email, setEmail] = useState();
  return (
    
    <div className='item'>
        <div className="mail-container ">
            <div className="d-flex-col">
                <Input
                      type={"email"}
                      label={"email"}
                      value={email} placeholder={"email"}
                      reference={"email"} onChange={(e) => setEmail(e.target.value)}
                  />
                <Button
                      diseable={isLoading}
                      type={"submit"}
                      text={isLoading ? "chargement" : "soumettre"}
                      reference={signIn} className="ghost">Soumettre
                </Button>
            </div>
        </div>
    </div>
    
  )
}
