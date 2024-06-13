import Image from "next/image";
import Link from "next/link";
import data from "../../data/headerSection.json";

const Header = () => {
  return (
    <header className="landingheader">
      <div className="logo">
        <Link href="/">
          <Image src={data.logo} width={165} height={65} />
        </Link>
      </div>
      <div className="btn-try">
        <Link href="/api/auth/login">
          <button>Try free</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
