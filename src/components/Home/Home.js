import ChatContainer from '../App/ChatContainer'
//import Socket from '../App/Socket'
import styles from './Home.module.css'

export default function Home() {
    return (
      <>
      <div>
      <h1>Home</h1>
      <ChatContainer />
      <div className={styles.wrapper}>
  <header className={styles.header}>Header</header>
  <article className={styles.main}>
    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>  
  </article>
  <footer className={styles.footer}>Footer</footer>
</div>
      </div>
      </>
    )
  }
  
