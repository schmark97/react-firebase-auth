import React, {useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";


const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();;
    
    const [ error, setError ] = useState();
    const [loading, setLoading] = useState(false);


    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            history.push('/login');

        }catch(err){
            setError('Failed to send password reset e-mail');
        }

        setLoading(false); 
    }

    return (
        <>
          <Card className="mt-5">
            <Card.Body>
                <h2 className="text-center mb-4">Log in</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef} />
                   </Form.Group>
                 
                   <Button disabled={loading}  className="w-100" type="submit">Reset password</Button>
                </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">Need an account? <Link to="/signup">Sign Up</Link></div>  
        </>
    )
}

export default ForgotPassword
