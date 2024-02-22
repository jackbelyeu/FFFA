
interface RsvpDropdownProps {
  value: string;
  onChange: (value: string) => void;
}
const RsvpDropdown: React.FC<RsvpDropdownProps> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="yes">✅</option>
      <option value="no">❌</option>
      <option value="ifneeded">☑️</option>
      <option value="pending">❓</option>
    </select>
  );
};

export default RsvpDropdown;
