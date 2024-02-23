interface RsvpDropdownProps {
  value: string;
  onChange: (value: string) => void;
}
const RsvpDropdown: React.FC<RsvpDropdownProps> = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="none">None</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
      <option value="ifneeded">If Needed</option>
      <option value="pending">Pending</option>
    </select>
  );
};

export default RsvpDropdown;
