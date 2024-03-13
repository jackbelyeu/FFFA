import styles from "./styles.module.css";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.Schedule}>{children}</section>;
}
