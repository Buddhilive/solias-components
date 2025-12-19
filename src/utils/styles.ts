import { css, unsafeCSS } from "lit";
import styles from "../styles/tailwind.css?inline";

export const tailwindStyles = css`
  ${unsafeCSS(styles)}
`;
