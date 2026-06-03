export default function PersonalDetailsForm({ personalInfo, onChange }) {
    return (
        <div className="sidebar-personal">
            <h2>Personal Details</h2>

            <div className="entry-card">
                <label>
                    Name
                    <input
                        type="text"
                        value={(personalInfo.fullName)}
                        onChange={(e) => onChange('fullName', e.target.value)}>
                    </input>
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => onChange('email', e.target.value)}
                    />
                </label>
                <label>
                    Phone
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                    />
                </label>
            </div>
        </div>
    );
}