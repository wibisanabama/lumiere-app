import { useState, useEffect } from 'react';
import { getTrending } from '../api/tmdb';
import MediaCard from '../components/MediaCard';
import './Home.css';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrending('all', 'day');
        setTrending(data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trending data:", err);
        setError('Failed to fetch trending media.');
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Lumière Explorer</h1>
          <p>Discover the most trending movies and TV series right now.</p>
        </div>
      </header>

      <main className="container">
        <section className="trending-section">
          <h2>Trending Today</h2>
          {loading && <div className="loader">Loading...</div>}
          {error && <div className="error">{error}</div>}
          
          {!loading && !error && (
            <div className="media-grid">
              {trending.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
