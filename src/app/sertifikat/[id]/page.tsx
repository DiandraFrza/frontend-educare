import SertifikatContent from './SertifikatContent';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return [];
}

export default function SertifikatPage() {
  return <SertifikatContent />;
}
