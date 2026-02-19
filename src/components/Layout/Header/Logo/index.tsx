import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* EDU Logo Icon */}
      <div className="relative w-10 h-10">
        {/* Background Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl transform rotate-3" />
        {/* Foreground Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-800 to-secondary-900 dark:from-secondary-700 dark:to-secondary-800 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm tracking-wider">EDU</span>
        </div>
      </div>
      
      {/* Brand Text */}
      <div className="hidden sm:flex flex-col leading-tight">
        <span className="font-display font-bold text-lg text-secondary-900 dark:text-white tracking-tight">
          Educare
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Academy</span>
      </div>
    </Link>
  );
};

export default Logo;
