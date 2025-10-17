
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Login bileşeni oluşturuldu

function Login() {
  const navigate = useNavigate(); // ✅ Doğru yer: fonksiyonun İÇİNDE

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    const newErrors = {};

    if (email && !validateEmail(email)) {
      newErrors.email = 'Geçerli bir email girin.';
    }

    if (password && !validatePassword(password)) {
      newErrors.password =
        'Şifre en az 8 karakter, büyük harf, küçük harf, sayı ve özel karakter içermelidir.';
    }

    if (!termsAccepted) {
      newErrors.terms = 'Devam etmek için şartları kabul etmelisiniz.';
    }

    setErrors(newErrors);
  }, [email, password, termsAccepted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log('Form başarıyla gönderildi!');
      navigate('/success');
    }
  };

  const isFormValid =
    validateEmail(email) &&
    validatePassword(password) &&
    termsAccepted;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Şifre:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          Şartları kabul ediyorum
        </label>
        {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Giriş Yap
      </button>
    </form>
  );
}


export default Login;
