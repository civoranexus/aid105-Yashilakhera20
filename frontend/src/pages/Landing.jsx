import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user-type");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="page fade-in">
      <h2>Welcome to Gov-Yojnaarthi</h2>
      <p>
        One platform to discover, verify and access government welfare schemes.
      </p>
    </section>
  );
}

export default Landing;
