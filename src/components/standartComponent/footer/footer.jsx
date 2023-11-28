import FooterBottom from "./footerBottom";
import FooterCenter from "./footerCenter";
import FooterUp from "./footerUp";

export default function Footer({ windowDimensions, scrollHeight }) {
  return (
    <footer>
      <FooterUp />
      <FooterCenter scrollHeight={scrollHeight} />
      <FooterBottom windowDimensions={windowDimensions} />
    </footer>
  );
}
