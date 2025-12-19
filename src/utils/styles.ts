import { css, unsafeCSS } from "lit";
import styles from "../styles/component.css?inline";

export const tailwindStyles = css`
  ${unsafeCSS(styles)}
`;
