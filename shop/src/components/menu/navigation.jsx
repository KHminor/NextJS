import { Logo } from "../icon/logo.styled";
import styled from "./navigation.module.css";

export default function Navigation() {
  return (
    <div className={styled.container}>
      <Logo>Taget</Logo>
    </div>
  );
}
