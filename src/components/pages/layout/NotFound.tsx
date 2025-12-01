import { ArrowLeft } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--mui-palette-gray-gray1)", // light gray background
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--mui-palette-primary-white)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            fontWeight: 800,
            color: "var(--mui-palette-primary-main)",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--mui-palette-text-dark)",
            marginTop: "16px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "var(--mui-palette-text-middle)",
            marginTop: "8px",
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "24px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--mui-palette-button-main)",
            color: "var(--mui-palette-button-contrastText)",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "16px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--mui-palette-button-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--mui-palette-button-main)";
          }}
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  );
}
