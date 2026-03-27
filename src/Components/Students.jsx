import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const App = () => {
    const location = useLocation();

    return (
        <div className="web-app-layout">
            {/* Sidebar - Browser Mode Style */}
            <aside className="app-sidebar">
                <div className="brand-logo">
                    <i className="fa-solid fa-user-shield"></i>
                    <span>EduSystem</span>
                </div>

                <nav className="side-nav">
                    <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <i className="fa-solid fa-house"></i> Dashboard
                    </Link>
                    <Link to="/students" className={`nav-item ${location.pathname === '/students' ? 'active' : ''}`}>
                        <i className="fa-solid fa-users"></i> O'quvchilar
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-viewport">
                <header className="top-bar">
                    <div className="search-wrapper">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Qidiruv..." />
                    </div>
                    <div className="admin-profile">
                        <i className="fa-solid fa-bell"></i>
                        <div className="avatar-circle">AD</div>
                    </div>
                </header>

                <section className="content-body">
                    <Routes>
                        <Route path="/" element={<div className="welcome-msg">IT Park Termiz: Raqamli kelajak sari
                            Raqamli texnologiyalar vaziri Surxondaryo viloyatiga tashrifi davomida Termiz shahrida barpo etilayotgan IT Parkning yangi zamonaviy filialini ko'zdan kechirdi.

                            Asosiy maqsadlar:

                            Viloyat yoshlari uchun zamonaviy kovorking markazlari va IT-akademiyalarni tashkil etish.

                            Eksport hajmini oshirish: Surxondaryo viloyatidan xalqaro bozorga dasturiy mahsulotlar eksportini yo'lga qo'yish.

                            Infratuzilma: Binoda yuqori tezlikdagi internet, uzluksiz elektr energiyasi va eng so'nggi texnologik qulayliklar yaratiladi.

                            "Ushbu yangi IT-markaz viloyatdagi minglab iqtidorli yoshlarning global bozorda o'z o'rnini topishi uchun asosiy ko'prik bo'ladi." — Sherzod Shermatov.</div>} />
                        <Route path="/students" element={
                            <div className="data-panel">
                                <div className="panel-header">
                                    <h2>O'quvchilar Ro'yxati</h2>
                                    <button className="add-btn">
                                        <i className="fa-solid fa-plus"></i> Yangi Qo'shish
                                    </button>
                                </div>

                                <div className="table-wrapper">
                                    <table className="modern-table">
                                        <thead>
                                            <tr>
                                                <th>Ism-familiya</th>
                                                <th>Guruh</th>
                                                <th className="text-right">Amallar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="st-name">Asilbek Jumaev</td>
                                                <td><span className="group-tag">N45</span></td>
                                                <td>
                                                    <div className="action-flex">
                                                        {/* 1. Ruchka (Edit) */}
                                                        <button className="icon-btn edit-btn" title="Tahrirlash">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        {/* 2. Trash (O'chirish) */}
                                                        <button className="icon-btn delete-btn" title="O'chirish">
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        } />
                    </Routes>
                </section>
            </main>
        </div>
    );
};

export default App;