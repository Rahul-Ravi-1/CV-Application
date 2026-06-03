export default function WorkExperience({workExperience, onAdd,  onChange}) {
    return (
        <div className="sidebar-work">
            <h2>Work</h2>
            {workExperience.map((entry) => (
            <div key={entry.id} className="entry-card">
                <label>
                <input
                    type="text"
                    value={(entry.role)}
                    onChange={(e) => onChange( entry.id, 'role', e.target.value)}>
                </input>
            </label>
            </div>
            ))}
            <button type="button" onClick={onAdd}>Add</button>
        </div>
    );
}