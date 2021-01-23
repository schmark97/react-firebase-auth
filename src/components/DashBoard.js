import React ,  {useState} from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Button, Card, Alert } from 'react-bootstrap'
import {  Link } from "react-router-dom";

function DashBoard() {
    const { currentUser } = useAuth();
    const [ error, setError ] = useState('');
    const { logout } = useAuth();
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');

    const handleLogout  =  async () =>{
        setError('');
        setMessage('');
        setLoading(true);

        try{
            await logout();
            setMessage('Check your inbox for further instructions ')
        }catch{
            setError('Failed to log out');
        }
        setLoading(false);
    }

    
    return (
        <>
            <Card className="mt-5" >
                <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <strong>E-mail: </strong> {currentUser && currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button disabled={loading} variant="link" onClick={handleLogout}>Log out</Button>
            </div>
           
        </>
    )
}

export default DashBoard
