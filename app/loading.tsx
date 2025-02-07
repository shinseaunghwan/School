import layout from "../styles/Layout.module.css";

export default function Loading() {
    return (
      <div className={layout.loading}>
       <i className="xi-spinner-1"></i>
      </div>
    );
  }