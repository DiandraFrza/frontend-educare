import VerificationContent from './VerificationContent';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return [];
}

export default function VerifikasiPage() {
  return <VerificationContent />;
}
