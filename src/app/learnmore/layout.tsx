import styles from './styles.module.css'

export default function LearnMoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.learnmore}>{children}</section>
}

