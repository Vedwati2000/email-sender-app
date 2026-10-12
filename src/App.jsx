import { useState } from 'react'

import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);
    setEmail("");
    setMessage("");
    setSuccess(false);

    try{
      const response = await fetch("https://mail-sender-1-thkx.onrender.com/send-email", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ email }),
      })

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Failed to send email");
      }

      setSuccess(true);
      setMessage(data.message);
      setEmail("");
    }catch(error){
      setMessage(error.message || "Unable to connect to the server")
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="email-page">
      <div className="email-card">
        <div className="email-icon">✉</div>

        <h1>Email Sender</h1>

        <p className="subtitle">
          Send a welcome email to your recipient.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Recipient Email Address</label>

          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Sending Email...' : 'Send Email'}
          </button>
        </form>

        {message && (
          <div
            className={`alert ${
              success ? 'alert-success' : 'alert-danger'
            } mt-3 mb-0`}
            role="status"
          >
            {message}
          </div>
        )}

        <p className="footer-text">
          Powered by React, Express and Nodemailer
        </p>
      </div>
    </div>
  )
}

export default App
