import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Geçerli email giriniz';
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) newErrors.password = 'Şifre en az 8 karakter ve sayı içermeli';
    if (!terms) newErrors.terms = 'Kuralları kabul etmelisiniz';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate('/success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={e => setTerms(e.target.checked)}
          />
          Kuralları kabul ediyorum
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>

      <button type="submit" disabled={Object.keys(errors).length > 0}>Login</button>
    </form>
  );
}