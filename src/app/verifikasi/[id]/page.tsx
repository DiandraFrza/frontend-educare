import { certificates, getCertificateById } from '@/data/certificates';
import VerificationContent from './VerificationContent';

interface VerifikasiPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return certificates.map((certificate) => ({
    id: certificate.id,
  }));
}

export default function VerifikasiPage({ params }: VerifikasiPageProps) {
  const certificate = getCertificateById(params.id);

  return <VerificationContent certificate={certificate || null} />;
}
