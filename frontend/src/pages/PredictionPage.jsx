import { useState, useEffect } from 'react';
import './PredictionPage.css';

function PredictionPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('/api/predictions/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || 'Failed to fetch predictions');
        }

        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="prediction-container">
        <div className="loading">Loading predictions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prediction-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="prediction-container">
      <h2>Your Health Predictions</h2>
      {predictions.length === 0 ? (
        <div className="no-predictions">
          No predictions available. Please submit your symptoms first.
        </div>
      ) : (
        <div className="predictions-list">
          {predictions.map((prediction, index) => (
            <div key={index} className="prediction-card">
              <div className="prediction-header">
                <h3>Prediction {index + 1}</h3>
                <span className="prediction-date">
                  {new Date(prediction.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="prediction-details">
                <p className="predicted-illness">
                  <strong>Predicted Illness:</strong> {prediction.predicted_illness}
                </p>
                <p className="confidence">
                  <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%
                </p>
                {prediction.recommendations && (
                  <div className="recommendations">
                    <strong>Recommendations:</strong>
                    <ul>
                      {prediction.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PredictionPage;