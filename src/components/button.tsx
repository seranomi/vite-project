type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="inline-flex border py-2 px-4 text-sm rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
