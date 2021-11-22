import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default Login;

function Login(){
    const url = process.env.CRUDFUL_URL;
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [cookies, setCookie] = useCookies(['cfAccessKey']);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const submit = async (e) => {
        e.preventDefault();
        setError('')
        axios.post(url + 'accounts/sign_in', {
            email,
            password
        })
        .then(response => {
            setSuccess(true);
            setCookie('cfAccessKey', response.data.cfAccessKey);
            router.push('/');
        })
        .catch(e => {
            if (e.response.status === 401){
                setError('Credentials does not match!');
            }
            else {
                setError('An error occured.');
            }
        })
    }

    return (
        <div className="card">
            <div className="card-inner card-inner-lg">
                <div className="nk-block-head">
                    <div className="nk-block-head-content">
                        <h4 className="nk-block-title">Sign-In to CrudFul</h4>
                        <div className="nk-block-des">
                            <p>Access the Crudful ToDo app using your email and passcode.</p>
                        </div>
                    </div>
                </div>
                <form action="#">
                    <div className="form-group">
                        {success && <div className="alert alert-success">Logged in successfully. You are being redirected</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">Email or Username</label>
                        </div>
                        <div className="form-control-wrap">
                            <input type="text" value={email} onChange={handleEmailChange} className="form-control form-control-lg" id="default-01" placeholder="Enter your Crudful email address"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>
                        <div className="form-control-wrap">
                            <input type="password" value={password} onChange={handlePasswordChange} className="form-control form-control-lg" id="password" placeholder="Enter your Crudful password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-primary btn-block" onClick={submit}>Sign in</button>
                    </div>
                </form>
            </div>
            <style jsx>
                {`
                    .card {
                        width: 500px;
                        display: block;
                        margin:0 auto;
                    }
                `}
            </style>
        </div>
    )
}