import styles from './styles.module.css'

export default function InterestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.team}>{children}</section>
}
