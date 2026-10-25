const positions = { therapy: '0% 0%', joint: '100% 0%', child: '0% 100%', speech: '100% 100%' };
export default function ServiceImage({ type, className = '' }) {
 return <div className={`service-image ${className}`} aria-hidden="true" style={{ backgroundPosition: positions[type] || positions.therapy }} />;
}
