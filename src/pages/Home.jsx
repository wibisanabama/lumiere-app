import { useState, useEffect } from 'react';
import { getTrending, getPopular } from '../api/tmdb';
import MediaCard from '../components/MediaCard';
import './Home.css';

let cachedHomeData = null;

const Home = () => {
  const [data, setData] = useState(cachedHomeData || {
    trendingMovies: [],
    trendingSeries: [],
    popularMovies: [],
    popularSeries: []
  });
  const [loading, setLoading] = useState(!cachedHomeData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (cachedHomeData) return;
      
      try {
        const [tMovies, tSeries, pMovies, pSeries] = await Promise.all([
          getTrending('movie', 'day'),
          getTrending('tv', 'day'),
          getPopular('movie'),
          getPopular('tv')
        ]);

        const newData = {
          trendingMovies: tMovies.results,
          trendingSeries: tSeries.results,
          popularMovies: pMovies.results,
          popularSeries: pSeries.results
        };
        
        cachedHomeData = newData;
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError('Failed to fetch media data.');
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const Section = ({ title, items }) => (
    <section className="media-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="horizontal-scroll">
        {items.map((media) => (
          <div key={media.id} className="scroll-item">
            <MediaCard media={media} />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Lumiere</h1>
          <p>Explore the best movies and TV series across the globe.</p>
        </div>
      </header>

      <main className="container">
        {loading && <div className="loader">Loading Explorer...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <>
            <Section title="Trending Movies" items={data.trendingMovies} />
            <Section title="Trending Series" items={data.trendingSeries} />
            <Section title="Popular Movies" items={data.popularMovies} />
            <Section title="Popular Series" items={data.popularSeries} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
