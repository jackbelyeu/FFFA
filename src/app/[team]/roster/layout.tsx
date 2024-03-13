import styles from './styles.module.css'
export default function RsvpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.rsvp}>{children}</section>
}