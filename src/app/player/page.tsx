import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";

export default function playerInterest() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Express your Interest to join the 2024 Season
      </h1>

      <div className={styles.description}>
        <p>Are you ready to take you passion for the game to the next level?</p>
        <p>Join us for an exciting 2024 Season !</p>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/group.jpg"
          alt="Flagrant Fowl Futball Association"
          layout="responsive"
          width={500}
          height={300}
        ></Image>
      </div>

      <div className={styles.link}>
        <div className={styles.container}>
          <div>
            <a href="/learnmore" className={styles.textLink} target="_blank">
              Learn More
            </a>
            <a
              href="https://forms.gle/HER3bPsbQvnZDc6F8"
              className={styles.textLink}
              target="_blank"
            >
              Sign Up
            </a>
            <a href="mailto:maltucker@gmail.com" className={styles.textLink}>
              Contact Organizer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
