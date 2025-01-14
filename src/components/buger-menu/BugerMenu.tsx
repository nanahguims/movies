import { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "./styles.css";

const BurgerMenuComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Menu>{children}</Menu>;
};

export default BurgerMenuComponent;
