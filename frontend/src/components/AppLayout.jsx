// src/components/AppLayout.jsx
import "../App.css";

function AppLayout({ children }) {
  return (
    <div className="app-root">
      <header className="gov-header">
        <div className="gov-brand">
          <span className="gov-logo" aria-hidden="true">🇮🇳</span>
          <div>
            <h1>Gov-Yojnaarthi</h1>
            <p>Your Digital Companion for Government Schemes</p>
          </div>
        </div>
      </header>

      <main className="gov-main" role="main">
        {children}
      </main>

      <footer className="gov-footer">
        © Government of India • Educational Prototype
      </footer>
    </div>
  );
}

export default AppLayout;
