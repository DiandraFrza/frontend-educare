import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* EDU Logo Icon */}
      <img src="/images/logo/logoedu1.png" alt="Educare Academy Logo" className="h-12 w-auto" />
      
      {/* Text Part */}
      {/* <div className="flex flex-col">
        <span className="font-display font-bold text-lg text-secondary-900 leading-none">
          Educare
        </span>
        <span className="text-secondary-600 text-xs font-medium tracking-wider">
          ACADEMY
        </span>
      </div> */}
    </Link>
  );
};

export default Logo;
