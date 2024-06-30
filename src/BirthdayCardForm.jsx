import React, { useState } from 'react';

const BirthdayCardForm = () => {
  const [studentName, setStudentName] = useState('');
  const [studentPicture, setStudentPicture] = useState(null);
  const [std, setStd] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log('Base64 Generated');
      setStudentPicture(reader.result);
    };
  };

  const handleGenerateCard = async () => {
    setLoading(true);
    try {
      const formData = {
        studentName,
        studentPicture,
        std,
        birthdate,
      };

      const response = await fetch('https://cardify-backend-a9rd.onrender.com/card/download/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${studentName}_BirthdayCard.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error generating card:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating card:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        <h2 style={styles.header}>Generate Birthday Card</h2>
        <div style={styles.logo}>
          <img src="LOGO.png" alt="Logo" style={styles.logoImage} />
        </div>
        <form style={styles.form}>
          <label style={styles.label}>
            Student Name:
            <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={styles.input} />
          </label>
          <label style={styles.label}>
            Student Picture:
            <input type="file" onChange={handleFileChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Standard:
            <input type="text" value={std} onChange={(e) => setStd(e.target.value)} style={styles.input} />
          </label>
          <label style={styles.label}>
            Birthdate:
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} style={styles.input} />
          </label>
          <button type="button" onClick={handleGenerateCard} style={styles.button} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  logo: {
    marginBottom: '20px',
  },
  logoImage: {
    width: '100px',
    height: '100px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "baseline",
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    marginLeft: '5px',
    width: '300px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    alignSelf: 'center',
  },
};

export default BirthdayCardForm;
