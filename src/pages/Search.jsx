import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMedia } from '../api/tmdb';
import MediaCard from '../components/MediaCard';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await searchMedia(query);
        const filteredResults = data.results.filter(
          item => item.media_type === 'movie' || item.media_type === 'tv'
        );
        setResults(filteredResults);
        setLoading(false);
      } catch (err) {
        console.error("Error searching:", err);
        setError('Failed to fetch search results.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-page container">
      <h2 className="search-title">
        Search Results for <span>"{query}"</span>
      </h2>
      
      {loading && <div className="loader">Searching...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && results.length === 0 && query && (
        <div className="no-results">No movies or series found for "{query}".</div>
      )}
      
      {!loading && !error && results.length > 0 && (
        <div className="media-grid">
          {results.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
