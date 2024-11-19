const Badge = ({ text }: { text: string }) => {
  return (
    <span className="bg-[#CAECFF] text-[#0099EE] text-xs p-3 rounded">
      {text}
    </span>
  );
};

export default Badge;
