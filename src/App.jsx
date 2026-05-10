import { useState, useEffect, useRef } from 'react'

/* ─── Shabbat times (static placeholder — replace with API if needed) ─── */
const SHABBAT = { entry: '18:41', exit: '19:52' }

/* ─── Icon components (inline SVG — no external dependency) ─── */
const Icon = {
  Menu: () => (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="18" x2="19" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.523 5.827L.057 23.57a.5.5 0 0 0 .613.612l5.833-1.488A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.663-.513-5.18-1.406l-.371-.218-3.845.982.997-3.742-.236-.386A9.975 9.975 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="4 6 8 10 12 6"/>
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

/* ─── NAV LINKS ─── */
const NAV_LINKS = [
  { label: 'בית', href: '#hero' },
  { label: 'בית הוראה', href: '#ask' },
  { label: 'שיעורים', href: '#services' },
  { label: 'עדכונים', href: '#news' },
  { label: 'תרומות', href: '#donate' },
  { label: 'צור קשר', href: '#footer' },
]

/* ─── SERVICES ─── */
const SERVICES = [
  {
    title: 'בית הוראה',
    desc: 'מענה הלכתי מהיר ומעמיק מרבנים מנוסים — בנושאי שבת, כשרות, שלום בית ועוד.',
    icon: '📖',
  },
  {
    title: 'ליווי משפחות',
    desc: 'תמיכה רגישה ומקצועית למשפחות בעת משבר, מעבר או אתגרים חינוכיים.',
    icon: '🏠',
  },
  {
    title: 'שיעורי תורה',
    desc: 'מערך עשיר של שיעורים יומיים ושבועיים לכל הרמות — בגמרא, הלכה ומחשבה.',
    icon: '🕯️',
  },
  {
    title: 'כולל אברכים',
    desc: 'כולל מצוינות ללימוד יסודי ועמוק בדיינות, הוראה ופסיקת הלכה.',
    icon: '✡️',
  },
  {
    title: 'קירוב בפריפריה',
    desc: 'שליחים נלהבים הפועלים ביישובים ובעיירות הפיתוח להנגשת תורה ויהדות.',
    icon: '🌱',
  },
  {
    title: 'סיוע לנוער',
    desc: 'תוכניות ייחודיות לנוער מתמודד — הכוונה, שייכות ומסגרת תומכת.',
    icon: '⭐',
  },
]

/* ─── PRAYER TIMES ─── */
const PRAYERS = [
  { name: 'שחרית', time: '06:15' },
  { name: 'מנחה', time: '18:45' },
  { name: 'ערבית', time: '20:10' },
  { name: 'שיעור יומי', time: '21:00', highlight: true },
]

/* ─── TOP BAR ─── */
function TopBar() {
  const [show, setShow] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY < lastY || window.scrollY < 60)
      setLastY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <div
      className={`bg-navy-900 text-white text-xs py-2 px-4 md:px-8 flex flex-wrap justify-between items-center gap-2 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ position: 'relative', zIndex: 60 }}
    >
      <span className="text-[#B7AEA1]">שעות פעילות: א׳–ה׳ <strong className="text-white">09:00–18:00</strong></span>
      <span className="text-[#B7AEA1]">
        🕯️ שבת הקרובה: כניסה <strong className="text-[#E8B86D]">{SHABBAT.entry}</strong> | יציאה <strong className="text-[#E8B86D]">{SHABBAT.exit}</strong>
      </span>
    </div>
  )
}

/* ─── HEADER / NAV ─── */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF6EF]/98 backdrop-blur-md shadow-md border-b border-[#E8DCC2]'
          : 'bg-[#FAF6EF]/95 backdrop-blur-sm border-b border-[#E8DCC2]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
        {/* Logo */}
        <a href="#hero" onClick={() => handleNav('#hero')} className="group flex flex-col leading-none">
          <span
            className="text-2xl md:text-3xl font-bold text-[#C8963E] group-hover:text-[#9B6E22] transition-colors"
            style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
          >
            מוסדות נחלת יוסף
          </span>
          <span className="text-xs text-[#9B6E22] tracking-widest mt-0.5">תורה · חסד · קירוב לבבות</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="px-4 py-2 rounded-lg text-[14px] font-medium text-[#2C1F0E] hover:text-[#C8963E] hover:bg-[#C8963E]/8 transition-all"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#donate')}
            className="mr-3 px-5 py-2.5 rounded-xl bg-gradient-to-l from-[#9B6E22] to-[#E8B86D] text-white text-[13px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            תרומה עכשיו
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#C8963E]/10 transition text-[#0D1B2A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
        >
          {mobileOpen ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-[#E8DCC2] ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#FAF6EF] px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="text-right py-3 px-4 rounded-xl text-[15px] font-medium text-[#2C1F0E] hover:bg-[#C8963E]/10 hover:text-[#C8963E] transition-all"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#donate')}
            className="mt-2 py-3 px-4 rounded-xl bg-gradient-to-l from-[#9B6E22] to-[#E8B86D] text-white font-semibold"
          >
            תרומה עכשיו
          </button>
        </nav>
      </div>
    </header>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#122030] to-[#1E3550]" />
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #E8B86D 0, #E8B86D 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Gold glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full bg-[#C8963E]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="text-white">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#C8963E]/15 border border-[#E8B86D]/30 text-[#F6D18D] text-sm">
            <Icon.Star />
            <span>כבר למעלה מ־20 שנה של עשייה</span>
          </div>

          <h2
            className="text-5xl md:text-6xl leading-[1.15] font-bold mb-7"
            style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
          >
            בית פתוח
            <span className="block text-[#E8B86D]">לכל אחד מישראל</span>
          </h2>

          <p className="text-lg leading-9 text-[#C8BFB3] max-w-lg mb-10">
            מהשיעור השבועי ועד תמיכת הנפש. מהתלמיד הצעיר ועד האברך המבוגר.
            שליחים מלאי לב, פועלים במסירות מתוך אהבת תורה ואהבת ישראל.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('donate').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl bg-gradient-to-l from-[#9B6E22] to-[#E8B86D] text-white font-semibold shadow-2xl hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(200,150,62,0.4)] transition-all duration-300"
            >
              תרומה מאובטחת
            </button>
            <button
              onClick={() => document.getElementById('ask').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl border-2 border-[#E8B86D]/60 text-[#E8B86D] hover:bg-[#E8B86D]/10 hover:border-[#E8B86D] transition-all duration-300"
            >
              שאל את הרב
            </button>
          </div>
        </div>

        {/* Prayer times card */}
        <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#F6D18D] text-lg font-semibold" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
              זמני תפילות ושיעורים
            </h3>
            <span className="text-[#B7AEA1] text-xs">היום</span>
          </div>

          <div className="space-y-1">
            {PRAYERS.map(({ name, time, highlight }) => (
              <div
                key={name}
                className={`flex justify-between items-center py-3.5 px-4 rounded-xl transition-all ${
                  highlight
                    ? 'bg-[#C8963E]/20 border border-[#E8B86D]/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <span className={highlight ? 'text-[#F6D18D] font-medium' : 'text-white/80'}>{name}</span>
                <span className={`font-mono text-lg font-semibold ${highlight ? 'text-[#F6D18D]' : 'text-white'}`}>
                  {time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[#B7AEA1] text-sm">
              🕯️ כניסת שבת <strong className="text-[#F6D18D]">{SHABBAT.entry}</strong> | צאת שבת <strong className="text-[#F6D18D]">{SHABBAT.exit}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── QUICK LINKS STRIP ─── */
const QUICK_LINKS = [
  { label: 'בית הוראה', emoji: '📖' },
  { label: 'כולל אברכים', emoji: '🎓' },
  { label: 'שיעורי תורה', emoji: '🕯️' },
  { label: 'סיוע משפחות', emoji: '🏠' },
  { label: 'קול אחיי', emoji: '🎙️' },
  { label: 'תרומות', emoji: '💛' },
]

function QuickLinks() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E8DCC2] p-4 md:p-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {QUICK_LINKS.map(({ label, emoji }) => (
            <button
              key={label}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#C8963E]/8 transition-all duration-200"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
              <span className="text-xs font-medium text-[#4A3728] group-hover:text-[#C8963E] transition-colors text-center leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ASK THE RABBI ─── */
function AskRabbi() {
  const [form, setForm] = useState({ name: '', phone: '', topic: '', question: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'נא להזין שם'
    if (!form.topic.trim()) e.topic = 'נא לציין נושא'
    if (form.question.trim().length < 10) e.question = 'נא לכתוב שאלה מפורטת יותר'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_ME', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          topic: form.topic,
          question: form.question,
          _subject: 'שאלה לרב: ' + form.topic,
        }),
      })
      if (res.ok) { setSent(true) }
      else { alert('אירעה שגיאה. נסו שוב או פנו בוואטסאפ.') }
    } catch { alert('אירעה שגיאה בשליחה.') }
    setLoading(false)
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`שלום, שמי ${form.name||'___'}. טלפון: ${form.phone||'___'}. נושא: ${form.topic||'___'}. שאלה: ${form.question||'___'}`)
    window.open('https://wa.me/97289945080?text=' + msg, '_blank')
  }

  return (
    <section id="ask" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="bg-white border border-[#E8DCC2] rounded-[28px] shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left — info */}
          <div className="bg-gradient-to-br from-[#FAF6EF] to-[#F0E8D8] p-8 md:p-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8963E]/12 text-[#9B6E22] text-sm font-semibold mb-6">
              בית הוראה
            </span>
            <h3
              className="text-3xl md:text-4xl font-bold leading-snug mb-6"
              style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
            >
              יש לכם שאלה<br />
              <span className="text-[#C8963E]">בהלכה, בחינוך</span><br />
              או בשלום בית?
            </h3>

            <p className="text-[#6B5A46] leading-8 mb-8">
              רבני בית ההוראה זמינים למענה אישי ודיסקרטי.
              ניתן לשלוח שאלה ולקבל תשובה מסודרת תוך 24 שעות.
            </p>

            <div className="space-y-3">
              {['מענה תוך 24 שעות', 'סודיות מוחלטת', 'ללא עלות'].map(f => (
                <div key={f} className="flex items-center gap-3 text-[#4A3728]">
                  <div className="w-5 h-5 rounded-full bg-[#C8963E] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-white/60 rounded-2xl border border-[#E8DCC2]">
              <p className="text-[#9B6E22] text-sm font-semibold mb-1">שאלות אחרונות</p>
              <p className="text-[#4A3728] text-sm">האם מותר לבשל בשבת עבור חולה שאין בו סכנה?</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 md:p-12">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-10">
                <div className="w-20 h-20 rounded-full bg-[#C8963E]/10 flex items-center justify-center text-4xl">✅</div>
                <h4 className="text-2xl font-bold" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>שאלתכם נשלחה בהצלחה!</h4>
                <p className="text-[#6B5A46]">הרב יחזור אליכם תוך 24 שעות</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', phone: '', topic: '', question: '' }) }}
                  className="px-6 py-3 rounded-xl border border-[#C8963E] text-[#9B6E22] hover:bg-[#C8963E]/10 transition"
                >
                  שלחו שאלה נוספת
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h4 className="text-2xl font-bold mb-7" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
                  שלחו שאלה לרב
                </h4>
                <div className="space-y-5">
                  {[
                    { id: 'name', label: 'שם מלא', type: 'text', placeholder: 'הקלידו את שמכם' },
                    { id: 'phone', label: 'טלפון לתשובה', type: 'tel', placeholder: '05X-XXXXXXX' },
                    { id: 'topic', label: 'נושא השאלה', type: 'text', placeholder: 'הלכה / חינוך / שלום בית' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-[#2C1F0E]">{label}</label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={form[id]}
                        onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
                        className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-[#C8963E]/40 ${
                          errors[id] ? 'border-red-400 bg-red-50' : 'border-[#D8C8AE] bg-[#FDFAF5] focus:border-[#C8963E]'
                        }`}
                      />
                      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="question" className="block mb-2 text-sm font-semibold text-[#2C1F0E]">פרטי השאלה</label>
                    <textarea
                      id="question"
                      rows={5}
                      placeholder="כתבו כאן את שאלתכם בפירוט..."
                      value={form.question}
                      onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
                      className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none resize-none transition focus:ring-2 focus:ring-[#C8963E]/40 ${
                        errors.question ? 'border-red-400 bg-red-50' : 'border-[#D8C8AE] bg-[#FDFAF5] focus:border-[#C8963E]'
                      }`}
                    />
                    {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-[#0D1B2A] text-white font-semibold text-[15px] hover:bg-[#152537] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span>שולח...</span>
                      </>
                    ) : 'שלח שאלה'}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#E8DCC2]"/>
                    <span className="text-xs text-[#9B8A7A]">או</span>
                    <div className="flex-1 h-px bg-[#E8DCC2]"/>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-[15px] hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-3"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.523 5.827L.057 23.57a.5.5 0 0 0 .613.612l5.833-1.488A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.663-.513-5.18-1.406l-.371-.218-3.845.982.997-3.742-.236-.386A9.975 9.975 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    שלח בוואטסאפ
                  </button>

                  <p className="text-center text-[#9B8A7A] text-xs">
                    🔒 המידע נשמר בסודיות מוחלטת ולא יועבר לגורם שלישי
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── NEWS ─── */
function News() {
  return (
    <section id="news" className="bg-[#F0E8D8] py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#9B6E22] font-semibold text-sm tracking-wider uppercase mb-2">מה נעשה</p>
            <h3 className="text-4xl font-bold" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
              עדכונים אחרונים
            </h3>
          </div>
          <button className="self-start md:self-auto px-6 py-3 rounded-xl border-2 border-[#C8963E] text-[#9B6E22] font-medium hover:bg-[#C8963E] hover:text-white transition-all">
            לכל העדכונים ←
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.8fr_1fr_1fr] gap-5">
          {/* Main feature */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8963E]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <span className="inline-block px-3 py-1 rounded-full bg-[#C8963E]/10 text-[#9B6E22] text-xs font-semibold mb-4">
              אירוע מרכזי
            </span>
            <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
              מאות השתתפו במעמד חיזוק והתעוררות לקראת חג השבועות
            </h4>
            <p className="text-[#6B5A46] leading-8">
              ערב מרומם ומלא השראה עם רבנים, תלמידים ובני קהילות מרחבי הארץ.
            </p>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-5">
            {[
              { cat: 'כולל אברכים', title: 'נפתח מחזור חדש ללימודי הוראה ודיינות' },
              { cat: 'חסד וסיוע', title: 'חלוקת סלי מזון למשפחות לקראת שבת' },
            ].map(({ cat, title }) => (
              <div key={cat} className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex-1">
                <span className="text-[#C8963E] text-xs font-semibold block mb-3">{cat}</span>
                <p className="font-bold leading-7 text-[#1A1008]">{title}</p>
              </div>
            ))}
          </div>

          {/* Quote card */}
          <div className="bg-[#0D1B2A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <p className="text-[#E8B86D] text-sm font-semibold mb-6">ציטוט השבוע</p>
              <blockquote
                className="text-[1.4rem] leading-[2.1] text-white/90"
                style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
              >
                "ואהבת לרעך כמוך —<br />זה כלל גדול בתורה"
              </blockquote>
            </div>
            <p className="text-[#C8963E] text-sm font-medium mt-8">— חז״ל</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ─── */
function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="text-center mb-16">
        <p className="text-[#9B6E22] font-semibold text-sm tracking-wider uppercase mb-3">שירותי המוסד</p>
        <h3 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
          עשייה מתוך לב פתוח
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ title, desc, icon }) => (
          <div
            key={title}
            className="group bg-white border border-[#E8DCC2] rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#C8963E]/10 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#C8963E]/20 transition-colors">
              {icon}
            </div>
            <h4 className="text-xl font-bold mb-3" style={{ fontFamily: '"Frank Ruhl Libre", serif' }}>
              {title}
            </h4>
            <p className="text-[#6B5A46] leading-8 text-[15px]">{desc}</p>
            <div className="mt-5 flex items-center gap-2 text-[#C8963E] text-sm font-medium group-hover:gap-3 transition-all">
              <span>קרא עוד</span>
              <span>←</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── STATS STRIP ─── */
const STATS = [
  { num: '20+', label: 'שנות פעילות' },
  { num: '5,000+', label: 'משפחות נתמכות' },
  { num: '200+', label: 'שיעורים בחודש' },
  { num: '12', label: 'מרכזים ברחבי הארץ' },
]

function Stats() {
  return (
    <div className="bg-[#0D1B2A] py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div
                className="text-4xl md:text-5xl font-bold text-[#E8B86D] mb-2"
                style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
              >
                {num}
              </div>
              <div className="text-[#B7AEA1] text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── DONATE ─── */
const NEDARIM_BASE = 'https://www.matara.pro/nedarimplus/online/?mosad=7011565&Redirect=https%3A%2F%2F089945080.xyz%2F'

const DONATE_AMOUNTS = [
  { label: '₪36', value: 36, desc: 'תרומה קטנה' },
  { label: '₪72', value: 72, desc: 'תרומת לב' },
  { label: '₪180', value: 180, desc: 'מומלץ ⭐' },
  { label: '₪360', value: 360, desc: 'תרומה נכבדה' },
  { label: '₪720', value: 720, desc: 'תרומת שנה' },
  { label: '₪1800', value: 1800, desc: 'תורם מכובד' },
]

const DONATE_CAUSES = [
  { id: 'general', label: 'כללי', emoji: '✡️' },
  { id: 'torah', label: 'שיעורי תורה', emoji: '📖' },
  { id: 'kolel', label: 'כולל אברכים', emoji: '🎓' },
  { id: 'chesed', label: 'חסד ומשפחות', emoji: '🏠' },
]

function Donate() {
  const [amount, setAmount] = useState(180)
  const [custom, setCustom] = useState('')
  const [freq, setFreq] = useState('one')
  const [cause, setCause] = useState('general')

  const finalAmount = custom ? parseInt(custom) || 0 : amount

  const handleDonate = () => {
    if (finalAmount < 1) return
    // Build Nedarim Plus URL with amount parameter
    const freqParam = freq === 'monthly' ? '&PaymentType=Haoraat_Keva' : ''
    const url = `${NEDARIM_BASE}&Amount=${finalAmount}${freqParam}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const FREQ_OPTIONS = [
    { val: 'one', label: 'חד פעמי' },
    { val: 'monthly', label: 'חודשי' },
  ]

  return (
    <section id="donate" className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0D1B2A] to-[#1A2E44] text-white">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C8963E]/10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-[#C8963E]/20 border border-[#E8B86D]/20 text-[#F6D18D] text-sm mb-6">
            🔒 תרומה מאובטחת דרך נדרים פלוס
          </span>
          <h3
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
          >
            יחד ממשיכים להחזיק
            <span className="block text-[#E8B86D]">עולם של תורה וחסד</span>
          </h3>
          <p className="text-[#C8BFB3] leading-8 max-w-xl mx-auto">
            כל תרומה מסייעת לפעילות הכוללים, שיעורי התורה, התמיכה במשפחות וקירוב לבבות ברחבי הארץ.
          </p>
        </div>

        {/* Donation card */}
        <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-10 shadow-2xl">

          {/* Frequency */}
          <div className="mb-7">
            <p className="text-[#E8B86D] text-xs font-semibold uppercase tracking-wider mb-3">סוג התרומה</p>
            <div className="inline-flex bg-white/6 rounded-2xl p-1 border border-white/10 w-full max-w-xs">
              {FREQ_OPTIONS.map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setFreq(val)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    freq === val
                      ? 'bg-[#C8963E] text-white shadow-lg'
                      : 'text-[#B7AEA1] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {freq === 'monthly' && (
              <p className="text-[#E8B86D] text-xs mt-2 opacity-80">
                ✓ הוראת קבע — ניתן לביטול בכל עת
              </p>
            )}
          </div>

          {/* Cause */}
          <div className="mb-7">
            <p className="text-[#E8B86D] text-xs font-semibold uppercase tracking-wider mb-3">ייעוד התרומה</p>
            <div className="grid grid-cols-4 gap-2">
              {DONATE_CAUSES.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  onClick={() => setCause(id)}
                  className={`py-3 px-2 rounded-2xl text-xs font-medium transition-all flex flex-col items-center gap-1.5 border ${
                    cause === id
                      ? 'bg-[#C8963E]/30 border-[#E8B86D] text-white'
                      : 'bg-white/5 border-white/10 text-[#B7AEA1] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="leading-tight text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-8">
            <p className="text-[#E8B86D] text-xs font-semibold uppercase tracking-wider mb-3">בחרו סכום</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {DONATE_AMOUNTS.map(({ label, value, desc }) => (
                <button
                  key={value}
                  onClick={() => { setAmount(value); setCustom('') }}
                  className={`py-4 rounded-2xl font-bold text-base transition-all relative flex flex-col items-center gap-0.5 border ${
                    amount === value && !custom
                      ? 'bg-[#C8963E] border-[#E8B86D] text-white shadow-xl scale-105'
                      : 'bg-white/8 border-white/15 text-white hover:bg-white/15 hover:scale-102'
                  }`}
                >
                  {desc === 'מומלץ ⭐' && (
                    <span className="absolute -top-2 right-1/2 translate-x-1/2 bg-[#E8B86D] text-[#0D1B2A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      מומלץ
                    </span>
                  )}
                  <span>{label}</span>
                  <span className={`text-[10px] font-normal ${amount === value && !custom ? 'text-white/80' : 'text-[#8A9BAE]'}`}>
                    {desc !== 'מומלץ ⭐' ? desc : ''}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8B86D] font-bold">₪</span>
              <input
                type="number"
                min="1"
                placeholder="סכום אחר..."
                value={custom}
                onChange={e => { setCustom(e.target.value); setAmount(0) }}
                className="w-full pr-10 pl-4 py-4 rounded-2xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-[#E8B86D] focus:bg-white/12 transition text-right"
              />
            </div>
          </div>

          {/* Summary + CTA */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <div className="flex justify-between text-sm text-[#B7AEA1] mb-2">
              <span>סוג</span>
              <span className="text-white font-medium">{freq === 'monthly' ? 'הוראת קבע חודשית' : 'תרומה חד פעמית'}</span>
            </div>
            <div className="flex justify-between text-sm text-[#B7AEA1] mb-2">
              <span>ייעוד</span>
              <span className="text-white font-medium">{DONATE_CAUSES.find(c => c.id === cause)?.label}</span>
            </div>
            <div className="flex justify-between text-sm text-[#B7AEA1] pt-3 border-t border-white/10">
              <span className="font-semibold">סכום התרומה</span>
              <span className="text-[#E8B86D] font-bold text-lg">
                {finalAmount > 0 ? `₪${finalAmount.toLocaleString()}` : '—'}
              </span>
            </div>
          </div>

          <button
            onClick={handleDonate}
            disabled={finalAmount < 1}
            className="w-full py-5 rounded-2xl bg-gradient-to-l from-[#9B6E22] to-[#E8B86D] text-white text-lg font-bold shadow-2xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(200,150,62,0.5)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            תרמו {finalAmount > 0 ? `₪${finalAmount.toLocaleString()}` : ''} עכשיו
          </button>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-5 text-[#8A9BAE] text-xs">
            <span>🔒 תשלום מאובטח</span>
            <span>📄 סעיף 46</span>
            <span>🏦 נדרים פלוס</span>
            <span>💳 ביט / אשראי</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer id="footer" className="bg-[#08131E] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10 mb-14">
        <div>
          <h4
            className="text-2xl text-[#E8B86D] font-bold mb-4"
            style={{ fontFamily: '"Frank Ruhl Libre", serif' }}
          >
            נחלת יוסף
          </h4>
          <p className="text-[#8A9BAE] leading-7 text-sm mb-5">
            מוסדות תורה, חסד וקירוב הפועלים מתוך אהבת ישראל אמיתית.
          </p>
          {/* Social icons placeholder */}
          <div className="flex gap-3">
            {['📘', '📸', '🎥'].map(s => (
              <button key={s} className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#C8963E]/30 transition text-base flex items-center justify-center">
                {s}
              </button>
            ))}
          </div>
        </div>

        {[
          {
            title: 'ניווט מהיר',
            links: ['אודות', 'שיעורים', 'כולל אברכים', 'קול אחיי', 'תרומות', 'צור קשר'],
          },
          {
            title: 'יצירת קשר',
            links: ['טל׳: 08-9945080', 'basis20@gmail.com', 'אור לציון 3, נתיבות', 'בתאום מראש'],
          },
          {
            title: 'מידע משפטי',
            links: ['הצהרת נגישות', 'מדיניות פרטיות', 'תנאי שימוש', 'סעיף 46 – אישור'],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="font-bold mb-4 text-white">{title}</p>
            <ul className="space-y-2.5">
              {links.map(l => (
                <li key={l}>
                  <a href="#" className="text-[#8A9BAE] text-sm hover:text-[#E8B86D] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 pt-8 text-center text-[#5A6A7A] text-sm">
        © 2026 מוסדות נחלת יוסף — כל הזכויות שמורות
      </div>
    </footer>
  )
}

/* ─── WHATSAPP FAB ─── */
function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/97289945080"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="שלחו לנו הודעה בוואטסאפ"
    >
      <Icon.WhatsApp />
    </a>
  )
}

/* ─── SCROLL TO TOP ─── */
function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#0D1B2A]/80 border border-[#C8963E]/30 text-[#E8B86D] shadow-lg hover:bg-[#0D1B2A] transition-all z-50 flex items-center justify-center"
      aria-label="חזרה לראש הדף"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="3 10 8 5 13 10"/>
      </svg>
    </button>
  )
}

/* ─── ACCESSIBILITY WIDGET ─── */
function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState(false)
  const [links, setLinks] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + '%'
  }, [fontSize])

  useEffect(() => {
    document.body.classList.toggle('high-contrast', contrast)
  }, [contrast])

  useEffect(() => {
    document.body.classList.toggle('highlight-links', links)
  }, [links])

  const reset = () => {
    setFontSize(100)
    setContrast(false)
    setLinks(false)
  }

  return (
    <>
      <style>{`
        body.high-contrast { filter: contrast(1.5) brightness(1.1); }
        body.highlight-links a { outline: 2px solid #C8963E !important; background: #FFF9EC !important; border-radius: 3px; }
      `}</style>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-6 w-14 h-14 rounded-full bg-[#0D1B2A] text-white shadow-2xl hover:bg-[#C8963E] transition-all duration-300 z-50 flex items-center justify-center border-2 border-[#C8963E]/40"
        aria-label="תפריט נגישות"
        title="נגישות"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 6c-3.3 0-6 2.7-6 6h2c0-2.2 1.8-4 4-4s4 1.8 4 4h2c0-3.3-2.7-6-6-6z" opacity=".5"/>
          <path d="M12 10l-3 8h2l1-3 1 3h2l-3-8z"/>
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-40 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-[#E8DCC2] w-64 transition-all duration-300 overflow-hidden ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-[#0D1B2A] text-white px-5 py-4 flex items-center justify-between">
          <span className="font-bold text-sm">הגדרות נגישות</span>
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">✕</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Font size */}
          <div>
            <p className="text-xs font-semibold text-[#6B5A46] mb-2">גודל טקסט</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(f => Math.max(80, f - 10))}
                className="w-9 h-9 rounded-xl bg-[#FAF6EF] border border-[#E8DCC2] text-lg font-bold hover:bg-[#C8963E]/10 transition"
              >א-</button>
              <div className="flex-1 text-center text-sm font-medium text-[#2C1F0E]">{fontSize}%</div>
              <button
                onClick={() => setFontSize(f => Math.min(140, f + 10))}
                className="w-9 h-9 rounded-xl bg-[#FAF6EF] border border-[#E8DCC2] text-lg font-bold hover:bg-[#C8963E]/10 transition"
              >א+</button>
            </div>
          </div>

          {/* Contrast */}
          <button
            onClick={() => setContrast(!contrast)}
            className={`w-full py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
              contrast ? 'bg-[#0D1B2A] text-white border-[#0D1B2A]' : 'border-[#E8DCC2] text-[#4A3728] hover:border-[#C8963E]'
            }`}
          >
            {contrast ? '✓ ' : ''}ניגודיות גבוהה
          </button>

          {/* Highlight links */}
          <button
            onClick={() => setLinks(!links)}
            className={`w-full py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
              links ? 'bg-[#C8963E] text-white border-[#C8963E]' : 'border-[#E8DCC2] text-[#4A3728] hover:border-[#C8963E]'
            }`}
          >
            {links ? '✓ ' : ''}הדגשת קישורים
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full py-2 rounded-xl text-xs text-[#9B8A7A] hover:text-[#C8963E] transition"
          >
            איפוס הגדרות
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF6EF] text-[#0D1B2A] font-sans">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <AskRabbi />
        <News />
        <Stats />
        <Services />
        <Donate />
      </main>
      <Footer />
      <WhatsAppFAB />
      <AccessibilityWidget />
      <ScrollTop />
    </div>
  )
}
