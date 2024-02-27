import styles from "./styles.module.css";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.organizer}>{children}</section>;
}
