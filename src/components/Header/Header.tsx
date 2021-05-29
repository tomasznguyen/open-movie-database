import styles from "./Header.module.scss";
import logo from "../../assets/logo-dotcontrol.png";
import bgImage from "../../assets/black-panther-wide.jpg";

const Header: React.FC = () => (
  <header
    className={styles.header}
    style={{
      backgroundImage: `radial-gradient(
            50% 100%,
            rgba(14, 14, 14, 0) 0%,
            #0e0e0e 100%
          ),
          url(${bgImage})`,
    }}
  >
    <div className={styles.headerInner}>
      <div className="site-branding">
        <a href="/">
          <img src={logo} alt="DotControl" />
        </a>
      </div>
      <h1>Black Panther</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum odit rem
        suscipit quisquam consequuntur maiores accusamus, nobis quod. Vitae ipsa
        repellendus atque assumenda incidunt porro et veniam adipisci non
        obcaecati?
      </p>
      <button>
        <span className={styles.text}>More information</span>
        <span className={styles.text}></span>
      </button>
    </div>
  </header>
);

export default Header;
