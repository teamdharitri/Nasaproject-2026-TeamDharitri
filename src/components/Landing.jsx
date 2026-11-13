export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <div className="landing__content">
        <h1 className="logo">
          <span className="logo__top">ROVER</span>
          <span className="logo__bottom">BUDDIES</span>
        </h1>
        <p className="landing__tagline">"Every rover has a story."</p>
        <button className="btn-start" onClick={onStart}>
          EXPLORE 🚀
        </button>
      </div>
    </div>
  );
}
