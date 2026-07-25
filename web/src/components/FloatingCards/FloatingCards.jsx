import "./FloatingCards.css";

function FloatingCards() {
  return (
    <>
      <div className="card report-card">
        <span>📄</span>
        <div>
          <h4>AI Report</h4>
          <p>Analysis Complete</p>
        </div>
      </div>

      <div className="card heart-card">
        <span>❤️</span>
        <div>
          <h4>Heart Rate</h4>
          <p>72 BPM</p>
        </div>
      </div>

      <div className="card ai-card">
        <span>🤖</span>
        <div>
          <h4>AI Assistant</h4>
          <p>Online</p>
        </div>
      </div>
    </>
  );
}

export default FloatingCards;