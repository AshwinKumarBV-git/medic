import { useState } from 'react';
import './SymptomFormPage.css';

function SymptomFormPage() {
  const [formData, setFormData] = useState({
    fever: false,
    cough: false,
    fatigue: false,
    difficulty_breathing: false,
    body_aches: false,
    headache: false,
    loss_of_taste: false,
    sore_throat: false,
    notes: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/symptoms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to submit symptoms');
      }

      setMessage({
        text: 'Symptoms submitted successfully!',
        type: 'success'
      });
      setFormData(prev => ({
        ...prev,
        notes: ''
      }));
    } catch (err) {
      setMessage({
        text: err.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="symptom-form-container">
      <div className="symptom-form-box">
        <h2>Report Your Symptoms</h2>
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="symptoms-grid">
            <div className="symptom-item">
              <input
                type="checkbox"
                id="fever"
                name="fever"
                checked={formData.fever}
                onChange={handleChange}
              />
              <label htmlFor="fever">Fever</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="cough"
                name="cough"
                checked={formData.cough}
                onChange={handleChange}
              />
              <label htmlFor="cough">Cough</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="fatigue"
                name="fatigue"
                checked={formData.fatigue}
                onChange={handleChange}
              />
              <label htmlFor="fatigue">Fatigue</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="difficulty_breathing"
                name="difficulty_breathing"
                checked={formData.difficulty_breathing}
                onChange={handleChange}
              />
              <label htmlFor="difficulty_breathing">Difficulty Breathing</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="body_aches"
                name="body_aches"
                checked={formData.body_aches}
                onChange={handleChange}
              />
              <label htmlFor="body_aches">Body Aches</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="headache"
                name="headache"
                checked={formData.headache}
                onChange={handleChange}
              />
              <label htmlFor="headache">Headache</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="loss_of_taste"
                name="loss_of_taste"
                checked={formData.loss_of_taste}
                onChange={handleChange}
              />
              <label htmlFor="loss_of_taste">Loss of Taste</label>
            </div>
            <div className="symptom-item">
              <input
                type="checkbox"
                id="sore_throat"
                name="sore_throat"
                checked={formData.sore_throat}
                onChange={handleChange}
              />
              <label htmlFor="sore_throat">Sore Throat</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Describe any other symptoms or concerns..."
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Submit Symptoms
          </button>
        </form>
      </div>
    </div>
  );
}

export default SymptomFormPage;