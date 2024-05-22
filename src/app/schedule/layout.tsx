import styles from './styles.module.css'

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.thankyou}>{children}</section>;
}
