import emerald from "../_assets/Emerald.webp";

const Emerald = ({ className }: {className: string}) => {
  return (
    <div className={className}>
    <img src={emerald.src} className="h-full" alt="Emerald" />
    </div>
  );
};

export default Emerald;