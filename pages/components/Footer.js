import data from "../../data/footerSection.json";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="header-footer">
        <h3>{data.title}</h3>
        <h5>{data.description}</h5>
      </div>

      <form>
        <div className="form-group">
          <input type="email" placeholder="Name@company.com" />
          <Link href="/api/auth/login">
            <button type="submit">Get Started</button>
          </Link>
        </div>
      </form>
    </footer>
  );
};

export default Footer;
