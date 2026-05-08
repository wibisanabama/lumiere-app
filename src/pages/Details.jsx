import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/tmdb';
import './Details.css';

const Details = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getDetails(type, id);
        setDetails(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError('Failed to load details.');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) return <div className="loader">Loading details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!details) return null;

  const title = details.title || details.name;
  const date = details.release_date || details.first_air_date;
  const backdropUrl = details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : '';
  const posterUrl = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '';

  return (
    <div className="details-page">
      {backdropUrl && (
        <div 
          className="details-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="backdrop-overlay"></div>
        </div>
      )}
      
      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
        
        <div className="details-content">
          <div className="details-poster-container">
            {posterUrl ? (
              <img src={posterUrl} alt={title} className="details-poster" />
            ) : (
              <div className="details-poster-placeholder">No Poster</div>
            )}
          </div>
          
          <div className="details-info">
            <h1 className="details-title">{title}</h1>
            <div className="details-meta">
              <span className="details-date">{date ? new Date(date).getFullYear() : 'Unknown Year'}</span>
              <span className="details-rating">
                <span className="star">★</span> {details.vote_average?.toFixed(1)} / 10
              </span>
              {details.runtime && <span className="details-runtime">{details.runtime} min</span>}
              <span className="details-status">{details.status}</span>
            </div>
            
            {details.tagline && <p className="details-tagline">"{details.tagline}"</p>}
            
            <div className="details-genres">
              {details.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            
            <div className="details-overview-section">
              <h2>Overview</h2>
              <p className="details-overview">{details.overview || 'No overview available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
