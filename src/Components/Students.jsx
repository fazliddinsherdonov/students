import React, { useState, useEffect } from "react";

// Ikonkalar (SVG)
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const EditIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const TrashIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const CloseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const getInitials = (name) => name ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";

export default function Students() {
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem("students_data");
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "Asilbek Jumaev", gmail: "asilbek@gmail.com", group: "N45", active: true }
        ];
    });

    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ name: "", gmail: "", group: "", active: true });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("students_data", JSON.stringify(students));
    }, [students]);

    const filtered = students.filter((s) => {
        const query = search.toLowerCase();
        return (
            s.name.toLowerCase().includes(query) ||
            (s.gmail && s.gmail.toLowerCase().includes(query)) ||
            s.group.toLowerCase().includes(query)
        );
    });

    const openModal = (item = null) => {
        if (item) {
            setForm(item);
            setEditId(item.id);
        } else {
            setForm({ name: "", gmail: "", group: "", active: true });
            setEditId(null);
        }
        setModal(true);
    };

    const save = () => {
        if (!form.name || !form.group) return;
        if (editId) {
            setStudents(students.map((s) => s.id === editId ? { ...form, id: editId } : s));
        } else {
            setStudents([...students, { ...form, id: Date.now() }]);
        }
        setModal(false);
    };

    const remove = (id) => setStudents(students.filter((s) => s.id !== id));

    const toggleActive = (id) => {
        setStudents(students.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    };

    return (
        <div className="students">
            <div className="top">
                <h2>O'quvchilar</h2>
                <button className="add-btn" onClick={() => openModal()}>
                    <PlusIcon /> Qo'shish
                </button>
            </div>

            <div className="search-bar">
                <SearchIcon />
                <input 
                    placeholder="Ism, email yoki guruhdan qidirish..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            <div className="table-wrap">
                <div className="table-head">
                    <span>Ism</span>
                    <span>Gmail</span>
                    <span>Guruh</span>
                    <span>Holat</span>
                    <span style={{ textAlign: "right" }}>Amallar</span>
                </div>

                {filtered.length === 0 ? (
                    <div className="empty">Ma'lumot topilmadi</div>
                ) : (
                    filtered.map((s) => (
                        <div className="table-row" key={s.id}>
                            <div className="name-cell">
                                <div className="avatar">{getInitials(s.name)}</div>
                                <span className="name-text">{s.name}</span>
                            </div>
                            <div className="gmail-cell">
                                <span className="cell-text">{s.gmail || ""}</span>
                            </div>
                            <div className="group-cell">
                                <span className="badge">{s.group}</span>
                            </div>
                            <div className="active-cell">
                                <span 
                                    className={`status-dot ${s.active ? "active" : "inactive"}`}
                                    onClick={() => toggleActive(s.id)}
                                >
                                    {s.active ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <div className="actions">
                                <button className="icon-btn edit" onClick={() => openModal(s)}><EditIcon /></button>
                                <button className="icon-btn del" onClick={() => remove(s.id)}><TrashIcon /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {modal && (
                <div className="overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
                    <div className="modal-box">
                        <div className="modal-header">
                            <h3>{editId ? "Tahrirlash" : "Yangi o'quvchi"}</h3>
                            <button className="close-btn" onClick={() => setModal(false)}><CloseIcon /></button>
                        </div>
                        <div className="field">
                            <label>Ism</label>
                            <input value={form.name} placeholder="Ism familya" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="field">
                            <label>Gmail</label>
                            
                            <input value={form.gmail} placeholder="gmail" onChange={(e) => setForm({ ...form, gmail: e.target.value })} />
                        </div>
                        <div className="field">
                            <label>Guruh</label>
                            <input value={form.group} placeholder="Group" onChange={(e) => setForm({ ...form, group: e.target.value })} />
                        </div>
                        
                        <button className="save-btn" onClick={save}>Saqlash</button>
                    </div>
                </div>
            )}
        </div>
    );
}