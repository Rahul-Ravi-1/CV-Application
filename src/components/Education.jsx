export default function Education({ education, onAdd, onChange }) {
    return (
        <div className="sidebar-education">
            <h2>Education</h2>
            {education.map((entry) => (
            <div key={entry.id} className="entry-card">
                <label>
                    School
                    <input
                    type="text"
                    value={entry.school}
                    onChange={(e) => onChange(entry.id, 'school', e.target.value)}
                    />
                </label>
                <label>
                    From
                    <input
                    type="text"
                    value={entry.from}
                    onChange={(e) => onChange(entry.id, 'from', e.target.value)}
                    />
                </label>
                <label>
                    To
                    <input
                    type="text"
                    value={entry.to}
                    onChange={(e) => onChange(entry.id, 'to', e.target.value)}
                    />
                </label>
            </div>
            ))}
            <button type="button" onClick={onAdd}>Add</button>
        </div>
    );
}
