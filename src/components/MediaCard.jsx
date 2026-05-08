import { Link } from 'react-router-dom';
import './MediaCard.css';

const MediaCard = ({ media }) => {
  const { id, title, name, poster_path, media_type, vote_average, release_date, first_air_date } = media;
  
  const displayTitle = title || name;
  const type = media_type || (title ? 'movie' : 'tv');
  const date = release_date || first_air_date;

  return (
    <Link to={`/${type}/${id}`} className="media-card">
      <div className="card-image-container">
        {poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
            alt={displayTitle} 
            className="card-image"
          />
        ) : (
          <div className="card-image-placeholder">No Image Available</div>
        )}
        <div className="card-rating">
          <span className="star">★</span> {vote_average?.toFixed(1)}
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{displayTitle}</h3>
        <p className="card-date">{date ? new Date(date).getFullYear() : 'Unknown'}</p>
      </div>
    </Link>
  );
};

export default MediaCard;
