export default function Loading() {
  /**
   * see the Bootstrap documentation for implementation details
   * https://getbootstrap.com/docs/5.0/components/spinners/
   */
  const size = '10rem';
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div 
        className="spinner-grow text-primary"
        style={{ width: size, height: size }}
        role="status"
      />
      <div className="mt-2 fs-1">Loading...</div>
    </div>
  );
}