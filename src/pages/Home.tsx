import { useNavigate } from 'react-router-dom';
// import StretchGraphic from '../../components/StretchGraphic/StretchGraphic';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="home__landing">
        <img
          src="landing-stretch.png"
          alt="stretch_img"
          className="home__landing-img"
        />
        <div className="home__landing-content">
          <div className="home__landing-content-text">
            <h1>
              <span>Personalized</span> stretch routines for the modern age.
            </h1>
          </div>
          <div className="home__landing-content-button">
            <button onClick={() => navigate('/stretches')}>
              Start Stretching
            </button>
          </div>
        </div>
      </section>

      <section className="home__info">
        {/* <StretchGraphic /> */}
        <div className="home__info-tag">
          <h2>
            Say goodbye to stiff necks and aching backs, and say hello to
            <span> feel-good routines</span> right from your chair.
          </h2>
        </div>
        <div className="home__info-details">
          {[
            [
              'reduce fatigue',
              'increase blood supply and nutrients to your muscles',
            ],
            [
              'improve posture',
              'allow muscle tissues to realign and reduce built-up tension',
            ],
            [
              'ease stress',
              'give your body and mind the space to breathe, relax, and refocus',
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="home__info-details-cards">
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home__about">
        <div className="home__about-title">
          stretch at the comfort of your desk
        </div>
        <div className="home__about-description">
          bendwell helps you stretch accurately using a machine learning based
          algorithm to guide you through customizable routines
        </div>
        <div className="home__about-list">
          <ul>
            {[
              '10+ Stretches',
              'Camera Guided Correction',
              'No Equipment Needed',
              'Low Time Commitment',
              'Fits your needs',
              'Made for Everyone',
              'Written & Visual Instructions',
            ].map((item, i) => (
              <li key={i}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
