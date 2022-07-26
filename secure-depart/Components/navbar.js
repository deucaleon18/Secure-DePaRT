import styles from "../styles/navbar.module.css";

export default function Navbar() {

    return (
        <div className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <div className={styles.secure}>Secure<span>DePaRT</span></div>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.menuList}>
                        <div className={styles.menuListItem}>
                            <a href="/"><button>Connect Wallet</button></a>
                        </div>

                        <div className={styles.menuListItem}>
                            <a href="/">
                                <img src="Images/github.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            );
          }