import styles from "../styles/navbar.module.css";

export default function Navbar() {

    return (
        <div className={`bg-transparent h-[80px] {styles.header}`}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <div className={`${styles.secure} font-100`}>Secure<span>DePaRT</span></div>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.menuList}>
                        {/* <div className={styles.menuListItem}> */}
                           <button className="w-36 text-primary hover:bg-primary hover:text-white text-base border-2 h-10 bg-transparent  font-100 border-primary rounded">Connect Wallet</button>
                        {/* </div> */}

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