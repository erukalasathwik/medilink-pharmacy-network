import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, Bell, Check, ChevronDown, Clock3, Cross,
  Filter, HeartPulse, MapPin, Menu, MessageCircle, Navigation,
  Search, ShieldCheck, ShoppingBag, Smartphone, Store, Users,
  X, Package, BarChart3, Settings, ClipboardList, Phone, ExternalLink
} from "lucide-react";
import "./styles.css";

const heroImage = "/images/medilink-hero.png";

const pharmacyImages = [
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"
];

const medicines = [
  { name: "Paracetamol", strength: "500 mg", form: "Tablet", pharmacy: "MediPlus Pharmacy", distance: "2.3 km", status: "AVAILABLE", updated: "15 minutes ago", image: pharmacyImages[0] },
  { name: "Paracetamol", strength: "500 mg", form: "Tablet", pharmacy: "HealthCare Pharmacy", distance: "3.8 km", status: "LOW_STOCK", updated: "32 minutes ago", image: pharmacyImages[1] },
  { name: "Paracetamol", strength: "500 mg", form: "Tablet", pharmacy: "Medico Plus", distance: "4.6 km", status: "OUT_OF_STOCK", updated: "1 hour ago", image: pharmacyImages[2] }
];

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("Customer");
  const [roleOpen, setRoleOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [inventory, setInventory] = useState(medicines);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    api.inventory().then((rows) => {
      setInventory(rows.map(mapInventory));
      setApiOnline(true);
    }).catch(() => setApiOnline(false));
  }, []);

  const go = (next) => {
    setPage(next);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeRole = (next) => {
    setRole(next);
    setRoleOpen(false);
    if (next === "Customer") go("customer");
    if (next === "Pharmacy") go("pharmacy");
    if (next === "Admin") go("admin");
  };

  const doSearch = () => {
    go("search");
  };

  return (
    <div className="app">
      <Header
        page={page}
        role={role}
        roleOpen={roleOpen}
        setRoleOpen={setRoleOpen}
        changeRole={changeRole}
        go={go}
        doSearch={doSearch}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
      />

      {page === "home" && (
        <Home search={search} setSearch={setSearch} doSearch={doSearch} go={go} />
      )}

      {page === "search" && (
        <SearchPage
          inventory={inventory}
          search={search}
          setSearch={setSearch}
          doSearch={doSearch}
          onPharmacy={(p) => { setSelectedPharmacy(p); go("pharmacy-details"); }}
          onContact={() => setInquiryOpen(true)}
        />
      )}

      {page === "pharmacies" && (
        <PharmaciesPage inventory={inventory} onOpen={(p) => { setSelectedPharmacy(p); go("pharmacy-details"); }} />
      )}

      {page === "pharmacy-details" && (
        <PharmacyDetails
          pharmacy={selectedPharmacy || medicines[0]}
          onBack={() => go("search")}
          onContact={() => setInquiryOpen(true)}
        />
      )}

      {page === "customer" && <CustomerDashboard go={go} />}
      {page === "pharmacy" && <PharmacyDashboard inventory={inventory} setInventory={setInventory} />}
      {page === "admin" && <AdminDashboard apiOnline={apiOnline} />}

      {page === "how" && <InfoPage go={go} />}
      {page === "about" && <AboutPage />}

      <Footer />

      {inquiryOpen && <InquiryModal pharmacy={selectedPharmacy || inventory[0]} onClose={() => setInquiryOpen(false)} />}
    </div>
  );
}

function Header({ page, role, roleOpen, setRoleOpen, changeRole, go, doSearch, mobileNav, setMobileNav }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-icon"><Cross size={22} strokeWidth={3} /></span>
          <span>Medi<span>Link</span></span>
        </button>

        <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${mobileNav ? "show" : ""}`}>
          <button className={page === "home" ? "active" : ""} onClick={() => go("home")}>Home</button>
          <button className={page === "search" ? "active" : ""} onClick={() => go("search")}>Find Medicine</button>
          <button className={page === "pharmacies" ? "active" : ""} onClick={() => go("pharmacies")}>Find Pharmacies</button>
          <button className={page === "how" ? "active" : ""} onClick={() => go("how")}>How It Works</button>
          <button onClick={() => go("pharmacy")}>For Pharmacies</button>
          <button className={page === "about" ? "active" : ""} onClick={() => go("about")}>About</button>
        </nav>

        <div className="nav-actions">
          <div className="role-wrap">
            <button className="role-btn" onClick={() => setRoleOpen(!roleOpen)}>
              Demo Mode <ChevronDown size={15} />
            </button>
            {roleOpen && (
              <div className="role-menu">
                {["Customer", "Pharmacy", "Admin"].map((r) => (
                  <button key={r} onClick={() => changeRole(r)}>
                    <span className="role-dot">{r === "Customer" ? <Users size={15}/> : r === "Pharmacy" ? <Store size={15}/> : <ShieldCheck size={15}/>}</span>
                    {r}
                    {role === r && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="primary-btn nav-cta" onClick={doSearch}><Search size={16}/> Search Medicine</button>
        </div>
      </div>
    </header>
  );
}

function Home({ search, setSearch, doSearch, go }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Activity size={16}/> Pharmacy availability network</div>
          <h1>Find the Medicine<br/>You Need, <span>Near You.</span></h1>
          <p>Search pharmacies that have reported medicine availability and contact them to confirm current stock before visiting.</p>

          <div className="hero-search">
            <Search size={20} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter medicine name..." onKeyDown={(e) => e.key === "Enter" && doSearch()} />
            <button onClick={doSearch}>Search Medicine</button>
          </div>

          <button className="outline-btn location-btn" onClick={() => go("pharmacies")}>
            <MapPin size={17}/> Find Nearby Pharmacies
          </button>

          <div className="notice">
            <span className="notice-icon">i</span>
            <span><b>Availability is reported by participating pharmacies and may change.</b><br/>Please confirm with the pharmacy before visiting.</span>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Person using smartphone near a pharmacy" />
          <div className="availability-float">
            <span className="pin"><MapPin size={17}/></span>
            <div><b>Paracetamol 500 mg</b><small>Available nearby</small></div>
          </div>
          <div className="map-float"><MapPin size={20}/><span>2.3 km</span></div>
        </div>
      </section>

      <section className="feature-strip">
        {[
          ["Search Medicine", "Find availability of your required medicines.", Search],
          ["Find Pharmacies", "Locate nearby pharmacies with stock information.", Store],
          ["Compare", "Check distance, status and last update.", BarChart3],
          ["Contact", "Confirm current availability before visiting.", MessageCircle]
        ].map(([title, text, Icon]) => (
          <div className="feature-card" key={title}>
            <div className="feature-icon"><Icon size={19}/></div>
            <div><h3>{title}</h3><p>{text}</p></div>
          </div>
        ))}
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><span className="eyebrow">Popular searches</span><h2>Find medicines faster</h2></div>
          <button className="text-btn" onClick={() => go("search")}>View all <ArrowRight size={16}/></button>
        </div>
        <div className="chip-row">
          {["Paracetamol", "Amoxicillin", "Ibuprofen", "Cetirizine", "Metformin"].map((x) => (
            <button className="medicine-chip" key={x} onClick={() => { setSearch(x); go("search"); }}>{x}</button>
          ))}
        </div>
      </section>

      <SafetyNote />
    </main>
  );
}

function SearchPage({ inventory, search, setSearch, doSearch, onPharmacy, onContact }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <div><span className="eyebrow">Medicine availability</span><h1>Find Medicine</h1><p>Search for medicines and nearby pharmacies with reported availability.</p></div>
      </div>

      <div className="search-bar-large">
        <Search size={19}/>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicine name..." />
        <button onClick={doSearch}>Search</button>
      </div>

      <div className="filter-row">
        {["Location", "Distance", "Pharmacy", "Availability", "Brand", "Strength", "Dosage Form"].map((f) => (
          <button key={f}>{f}<ChevronDown size={14}/></button>
        ))}
      </div>

      <div className="results-layout">
        <aside className="filter-card">
          <h3><Filter size={17}/> Quick Filters</h3>
          {[
            ["Available", 8, "green"],
            ["Low Stock", 3, "orange"],
            ["Out of Stock", 1, "red"],
            ["Unknown", 0, "gray"]
          ].map(([name, count, color]) => (
            <label className="check-row" key={name}><input type="checkbox"/><span className={`mini-dot ${color}`}></span>{name}<b>{count}</b></label>
          ))}
          <div className="filter-divider"/>
          <h4>Distance</h4>
          {["Within 2 km (4)", "2 – 5 km (5)", "5 – 10 km (3)"].map(x => <label className="check-row" key={x}><input type="checkbox"/>{x}</label>)}
        </aside>

        <section className="results">
          <div className="result-meta"><span>{loading ? "Searching..." : <>Showing results for <b>“{search || "All medicines"}”</b> ({results.length} pharmacy records)</>}</span><button>Sort by: Nearest <ChevronDown size={13}/></button></div>
          {results.map((m, i) => (
            <MedicineResult key={i} item={m} onOpen={() => onPharmacy(m)} onContact={onContact}/>
          ))}
        </section>
      </div>
      <SafetyNote />
    </main>
  );
}

function MedicineResult({ item, onOpen, onContact }) {
  return (
    <article className="result-card">
      <img src={item.image} alt={item.pharmacy}/>
      <div className="result-main">
        <div className="result-top">
          <div><h3>{item.pharmacy}</h3><span className="rating">★ 4.5 (124 reviews)</span></div>
          <StatusBadge status={item.status}/>
        </div>
        <div className="medicine-line"><Package size={14}/> {item.name} {item.strength} <span>•</span><MapPin size={14}/> {item.distance} <span>•</span><Clock3 size={14}/> Last updated: {item.updated}</div>
        <div className="result-actions">
          <button className="primary-small" onClick={onOpen}>View Pharmacy</button>
          <button className="outline-small" onClick={onContact}><Phone size={14}/> Contact Pharmacy</button>
          <button className="link-small"><Navigation size={14}/> Get Directions</button>
        </div>
      </div>
    </article>
  );
}

function PharmaciesPage({ inventory, onOpen }) {
  return (
    <main className="page-shell">
      <div className="page-title"><div><span className="eyebrow">Nearby network</span><h1>Find Pharmacies</h1><p>Locate nearby pharmacies, compare availability and contact them directly.</p></div></div>
      <div className="pharmacy-search"><Search/><input placeholder="Search by pharmacy name or area..."/><button className="primary-btn"><Search size={17}/></button></div>
      <div className="pharmacy-list">
        {inventory.map((m, i) => (
          <div className="directory-card" key={i}>
            <img src={m.image} alt={m.pharmacy}/>
            <div className="directory-info"><h3>{m.pharmacy}</h3><div className="rating">★ 4.{5-i} (124 reviews)</div><p><MapPin size={14}/> 12-B, Banjara Hills, Hyderabad</p><p><Navigation size={14}/> {m.distance}</p></div>
            <StatusBadge status={m.status}/>
            <div className="directory-actions"><button onClick={() => onOpen(m)}>View Details</button><button onClick={() => {}}>Contact</button></div>
          </div>
        ))}
      </div>
    </main>
  );
}

function PharmacyDetails({ pharmacy, onBack, onContact }) {
  return (
    <main className="page-shell">
      <button className="back-btn" onClick={onBack}>← Back to Results</button>
      <section className="profile-card">
        <div className="profile-head">
          <img src={pharmacy.image} alt={pharmacy.pharmacy}/>
          <div className="profile-info"><h1>{pharmacy.pharmacy}</h1><StatusBadge status={pharmacy.status}/><div className="rating">★ 4.5 (124 reviews)</div><p><MapPin size={15}/> 12-B, Banjara Hills, Hyderabad • {pharmacy.distance}</p><p className="open"><span/> Open • Closes 10:00 PM</p></div>
          <div className="profile-actions"><button className="primary-btn" onClick={onContact}>Contact Pharmacy</button><button className="outline-btn"><Navigation size={16}/> Get Directions</button></div>
        </div>
        <div className="tabs"><button className="active">Medicine Availability</button><button>About</button><button>Contact</button></div>
        <div className="availability-table">
          <h3>Available Medicines (1)</h3>
          <div className="table-row table-head"><span>Medicine</span><span>Strength</span><span>Dosage Form</span><span>Last Updated</span><span>Status</span></div>
          <div className="table-row"><span>Paracetamol</span><span>500 mg</span><span>Tablet</span><span>15 minutes ago</span><StatusBadge status="AVAILABLE"/></div>
        </div>
        <SafetyNote/>
      </section>
    </main>
  );
}

function CustomerDashboard({ go }) {
  return <DashboardShell title="Hello!" subtitle="Find medicines and nearby pharmacies quickly and easily." icon={<HeartPulse/>}>
    <div className="dashboard-search"><Search/><input placeholder="Enter medicine name..."/><button onClick={() => go("search")}>Search Medicine</button></div>
    <div className="dashboard-features">
      {[
        ["Search Medicine", "Find availability of your required medicines.", Search],
        ["Find Pharmacies", "Locate nearby pharmacies with stock information.", Store],
        ["Compare", "Check prices, distance and last update.", BarChart3],
        ["Contact", "Confirm availability before visiting.", MessageCircle]
      ].map(([t, d, I]) => <div className="dash-feature" key={t}><I/><b>{t}</b><span>{d}</span></div>)}
    </div>
    <div className="section-heading compact"><div><span className="eyebrow">Your activity</span><h2>Recent Searches</h2></div></div>
    <div className="activity-list">{["Paracetamol 500 mg", "Cetirizine 10 mg", "Amoxicillin 500 mg"].map(x => <div key={x}><Search size={15}/><span>{x}</span><ArrowRight size={15}/></div>)}</div>
  </DashboardShell>;
}

function PharmacyDashboard({ inventory, setInventory }) {
  const first = inventory[0] || medicines[0];
  const [stock, setStock] = useState(first.quantity ?? 120);
  const [saving, setSaving] = useState(false);
  const status = stock === 0 ? "OUT_OF_STOCK" : stock <= 10 ? "LOW_STOCK" : "AVAILABLE";
  const saveStock = async (next) => {
    setStock(next);
    if (!first.id) return;
    setSaving(true);
    try {
      const updated = await api.updateInventory(first.id, next);
      setInventory(prev => prev.map(x => x.id === updated.id ? mapInventory(updated) : x));
    } catch (e) {
      console.error(e);
    } finally { setSaving(false); }
  };
  return <DashboardShell title="Pharmacy Dashboard" subtitle="Manage reported medicine availability and customer inquiries." icon={<Store/>} role="Pharmacy">
    <div className="stats-grid">
      <Stat title="Total Medicines" value={inventory.length} icon={Package}/>
      <Stat title="Available" value={inventory.filter(x=>x.status==="AVAILABLE").length} icon={Check} green/>
      <Stat title="Low Stock" value={inventory.filter(x=>x.status==="LOW_STOCK").length} icon={Activity} orange/>
      <Stat title="Out of Stock" value={inventory.filter(x=>x.status==="OUT_OF_STOCK").length} icon={X} red/>
    </div>
    <div className="dashboard-grid-2">
      <section className="panel"><div className="panel-head"><h3>Recent Inventory Updates</h3><button>View All</button></div>
        <div className="inventory-row header"><span>Medicine</span><span>Stock</span><span>Status</span><span>Updated</span></div>
        {inventory.slice(0,6).map((x)=><div className="inventory-row" key={x.id}><span>{x.name} {x.strength}</span><span>{x.quantity}</span><StatusBadge status={x.status}/><span>{formatUpdated(x.updatedAt)}</span></div>)}
      </section>
      <section className="panel quick-panel"><h3>Quick Stock Update</h3><label>{first.name} {first.strength}</label><div className="stock-control"><button disabled={saving} onClick={() => saveStock(Math.max(0,stock-1))}>−</button><strong>{stock}</strong><button disabled={saving} onClick={() => saveStock(stock+1)}>+</button></div><StatusBadge status={status}/><p>{saving ? "Saving to MySQL..." : "Quantity changes are saved through the Spring Boot REST API."}</p></section>
    </div>
  </DashboardShell>;
}
function AdminDashboard({ apiOnline }) {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.adminStats().then(setStats).catch(()=>{}); }, []);
  return <DashboardShell title="Admin Dashboard" subtitle="Monitor pharmacies, verification and inventory activity." icon={<ShieldCheck/>} role="Admin">
    <div className="stats-grid">
      <Stat title="Pharmacies" value={stats?.pharmacies ?? "—"} icon={Store}/>
      <Stat title="Available Records" value={stats?.available ?? "—"} icon={ShieldCheck} green/>
      <Stat title="Inventory Records" value={stats?.inventoryRecords ?? "—"} icon={Package}/>
      <Stat title="New Inquiries" value={stats?.newInquiries ?? "—"} icon={Clock3} orange/>
    </div>
    <section className="panel"><div className="panel-head"><h3>System Status</h3><span className={`status ${apiOnline ? "green" : "red"}`}>{apiOnline ? "API Connected" : "API Offline"}</span></div>
      <div className="inventory-row"><span>Spring Boot REST API</span><span>8080</span><StatusBadge status={apiOnline ? "AVAILABLE" : "OUT_OF_STOCK"}/><span>MySQL-backed</span></div>
      <div className="inventory-row"><span>Medicine search</span><span>Live</span><StatusBadge status={apiOnline ? "AVAILABLE" : "OUT_OF_STOCK"}/><span>REST + JPA</span></div>
      <div className="inventory-row"><span>Customer inquiries</span><span>Live</span><StatusBadge status={apiOnline ? "AVAILABLE" : "OUT_OF_STOCK"}/><span>Database stored</span></div>
    </section>
  </DashboardShell>;
}
function DashboardShell({ title, subtitle, children, icon, role }) {
  return <main className="dashboard-page"><aside className="dashboard-sidebar"><div className="side-brand"><span className="brand-icon"><Cross size={18}/></span>MediLink</div><div className="side-role">{icon}{role || "Customer"}</div>{["Dashboard","Manage Inventory","View Requests","Profile"].map((x,i)=><button className={i===0?"selected":""} key={x}>{[BarChart3,Package,ClipboardList,Settings][i] && React.createElement([BarChart3,Package,ClipboardList,Settings][i],{size:16})}{x}</button>)}</aside><section className="dashboard-content"><div className="dash-header"><div><span className="eyebrow">MediLink Demo</span><h1>{title}</h1><p>{subtitle}</p></div><div className="dash-user"><Bell size={17}/><span>Demo Mode</span></div></div>{children}</section></main>;
}

function Stat({ title, value, icon: Icon, green, orange, red }) {
  return <div className="stat-card"><div className={`stat-icon ${green?"green":orange?"orange":red?"red":""}`}><Icon size={18}/></div><span>{title}</span><strong>{value}</strong></div>;
}

function StatusBadge({ status }) {
  const map = { AVAILABLE: ["Available","green"], LOW_STOCK: ["Low Stock","orange"], OUT_OF_STOCK: ["Out of Stock","red"], UNKNOWN: ["Unknown","gray"] };
  const [label, color] = map[status] || map.UNKNOWN;
  return <span className={`status ${color}`}><span className="status-dot">{color==="green" ? "✓" : color==="red" ? "×" : color==="orange" ? "!" : "?"}</span>{label}</span>;
}

function SafetyNote() {
  return <div className="safety-note"><ShieldCheck size={18}/><span><b>Availability is reported by participating pharmacies and may change.</b> Please confirm stock directly with the pharmacy before visiting.</span></div>;
}

function InfoPage({ go }) {
  return <main className="page-shell simple-page"><span className="eyebrow">Simple workflow</span><h1>How It Works</h1><p className="lead">MediLink connects medicine searches with pharmacies that have reported inventory information.</p><div className="steps">{[["01","Search","Enter the medicine name and use filters to narrow your search."],["02","Compare","Review distance, availability and the last inventory update."],["03","Contact","Contact the pharmacy to confirm current stock before visiting."]].map(x=><div className="step" key={x[0]}><b>{x[0]}</b><h2>{x[1]}</h2><p>{x[2]}</p></div>)}</div><SafetyNote/><button className="primary-btn" onClick={()=>go("search")}>Search Medicine <ArrowRight size={16}/></button></main>;
}

function AboutPage() {
  return <main className="page-shell simple-page"><span className="eyebrow">About MediLink</span><h1>Pharmacy availability, made easier.</h1><p className="lead">MediLink helps users find pharmacies that have reported availability of medicines, compare nearby options and contact pharmacies directly.</p><div className="about-grid"><div><ShieldCheck/><h3>Reliable information</h3><p>Every result clearly shows when inventory was last updated.</p></div><div><Store/><h3>Pharmacy network</h3><p>Pharmacies can manage their reported inventory through the demo dashboard.</p></div><div><MessageCircle/><h3>Direct contact</h3><p>Users can send an inquiry before visiting the pharmacy.</p></div></div><SafetyNote/></main>;
}

function InquiryModal({ pharmacy, onClose }) {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("Please confirm whether Paracetamol 500 mg is currently available.");
  const [contactMethod, setContactMethod] = useState("Phone");
  const [saving, setSaving] = useState(false);
  const send = async () => {
    if (!pharmacy?.pharmacyId && !pharmacy?.id) return;
    setSaving(true);
    try {
      await api.createInquiry({ pharmacyId: pharmacy.pharmacyId || pharmacy.id, medicineId: pharmacy.medicineId || 1, message, contactMethod });
      setSent(true);
    } catch (e) { alert(e.message); }
    finally { setSaving(false); }
  };
  return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={onClose}><X/></button>{sent ? <div className="sent-state"><Check size={30}/><h2>Inquiry Sent</h2><p>Your inquiry has been saved in the MediLink database.</p><button className="primary-btn" onClick={onClose}>Done</button></div> : <><span className="eyebrow">Customer Inquiry</span><h2>Contact Pharmacy</h2><label>Medicine<input value={`${pharmacy?.name || "Paracetamol"} ${pharmacy?.strength || "500 mg"}`} readOnly/></label><label>Pharmacy<input value={pharmacy?.pharmacy || "MediPlus Pharmacy"} readOnly/></label><label>Message<textarea value={message} onChange={e=>setMessage(e.target.value)} /></label><label>Preferred contact method<select value={contactMethod} onChange={e=>setContactMethod(e.target.value)}><option>Phone</option><option>WhatsApp</option><option>Email</option></select></label><button className="primary-btn full" disabled={saving} onClick={send}>{saving ? "Sending..." : "Send Inquiry"}</button></>}</div></div>;
}
function Footer() {
  return <footer><div className="footer-inner"><div><div className="brand footer-brand"><span className="brand-icon"><Cross size={19}/></span>Medi<span>Link</span></div><p>Find pharmacies. Check availability. Connect with care.</p></div><div className="footer-links"><span>Medicine Availability</span><span>Pharmacy Finder</span><span>Demo Application</span></div></div><div className="footer-bottom">© 2026 MediLink. Pharmacy and inventory information only.</div></footer>;
}


function mapInventory(row) {
  return {
    id: row.id,
    pharmacyId: row.pharmacyId,
    pharmacy: row.pharmacyName,
    distance: "2.3 km",
    status: row.status,
    updated: formatUpdated(row.updatedAt),
    updatedAt: row.updatedAt,
    image: row.imageUrl || pharmacyImages[0],
    name: row.medicineName,
    strength: row.strength,
    form: row.dosageForm,
    dosageForm: row.dosageForm,
    medicineId: row.medicineId,
    quantity: row.quantity,
    rating: row.rating,
    reviewCount: row.reviewCount,
    address: row.address
  };
}
function formatUpdated(value) {
  if (!value) return "Recently";
  const date = new Date(value);
  const mins = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  return `${hours} hour${hours > 1 ? "s" : ""} ago`;
}

createRoot(document.getElementById("root")).render(<App />);
