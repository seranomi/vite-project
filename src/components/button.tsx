type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>{children}</button>
  );
};

export default Button;
