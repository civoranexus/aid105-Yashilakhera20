import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const schemes = location.state?.schemes || [];

  return (
    <div className="container">
      <div className="card">
        <h2>Recommended Schemes For You</h2>

        {schemes.length === 0 ? (
          <p>No schemes found.</p>
        ) : (
          schemes.map((scheme, index) => (
            <div key={index} style={{ marginTop: "15px", textAlign: "left" }}>
              <h3>{scheme}</h3>
              <p>
                This scheme matches your profile based on income, gender,
                and state eligibility.
              </p>
              <hr />
            </div>
          ))
        )}

        <button
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/dashboard")}
        >
          Check Again
        </button>
      </div>
    </div>
  );
}
