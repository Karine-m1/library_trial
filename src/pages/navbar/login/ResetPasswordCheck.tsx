import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); // State to store token validity
  const navigate = useNavigate();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  
  useEffect(() => {
    const checkTokenValidity = async (token: string | null) => {
      try {
        if (!token) {
          setIsValidToken(false);
          return;
        }
        
        const response = await axios.get('http://localhost:8081/reset-password-check', {
          params: { token: token }
        });
        setIsValidToken(response.data === "success");
      } catch (error) {
        console.error('Error validating token:', error);
        setIsValidToken(false);
      }
    };
  
    checkTokenValidity(token);
  }, [token]);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<string>(
        'http://localhost:8081/reset-password',
        {
          password: password,
        },
        {
          headers: { Authorization: token }, // Pass token in the request header
        }
      );

      if (response.data === "You have successfuly reset your password") {
        setMessage('Password reset successful');
        alert('Password changed successfully');
        navigate('/login');
      } else {
        setMessage(response.data);
        alert('Rejected password change');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password. Please check the console for details.');
    }
  };

  if (isValidToken === null) {
    return <div>Loading...</div>; // Render loading state while token validity is being checked
  }

  if (isValidToken === false) {
    return <div>Invalid token</div>; // Render invalid token message
  }

  return (
    <div className='login'>
      <div className='login-inputs'>
        <form onSubmit={handleSubmit}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className='reset'>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
