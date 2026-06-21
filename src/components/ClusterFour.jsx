import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award, Tag, ChevronDown, Mic, BookOpen, HeartHandshake, Users, Building, DollarSign, ArrowRight } from 'lucide-react'

function SectionHeader({ cluster, number, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="section-cluster-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Cụm {number} — {cluster}
      </p>
      <h2 className="section-title reveal">{title}</h2>
      {subtitle && <p className="section-lead reveal">{subtitle}</p>}
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const classes = { info: 'callout callout-info', warning: 'callout callout-warning', danger: 'callout callout-danger', accent: 'callout callout-accent' }
  return <div className={classes[type]}>{children}</div>
}

function FormulaBox({ formula, vars }) {
  return (
    <div className="formula-box mb-6">
      <div className="formula-main">{formula}</div>
      {vars && (
        <div className="formula-vars">
          {vars.map((v, i) => (
            <div key={i} className="formula-var">
              <strong>{v.sym}</strong>
              <span>{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ===== SUMMARY ===== */
function SummarySection() {
  return (
    <section id="summary" className="section-wrapper" aria-labelledby="summary-title">
      <div className="max-w-3xl">
        <SectionHeader
          cluster="Ôn tập"
          number={4}
          title="Sơ đồ tổng kết kiến thức"
          subtitle="Toàn bộ nội dung Chương 3.1 trong một bức tranh."
        />

        <div className="flow-row mb-6">
          <span className="flow-step">Tiền</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step">Mua TLSX<br/>+ Sức lao động</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step">Sản xuất<br/>hàng hóa</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step">Tạo giá trị mới</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step">Bù đắp<br/>tiền công</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step highlight">GT Thặng dư</span>
          <span className="flow-arrow">→</span>
          <span className="flow-step">Tư bản tăng</span>
        </div>

        <FormulaBox
          formula="Tổng hợp công thức"
          vars={[
            { sym: 'T — H — T\'', desc: 'Công thức chung của tư bản' },
            { sym: "T' = T + ΔT", desc: 'Tiền chuyển hóa thành tư bản' },
            { sym: 'G = c + v + m', desc: 'Giá trị hàng hóa' },
            { sym: "m' = m/v×100%", desc: 'Tỷ suất GTD' },
            { sym: 'M = m\' × V', desc: 'Khối lượng GTD' },
          ]}
        />

        <motion.div
          className="card reveal"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="info-list-item-icon" aria-hidden="true">
              <BookOpen size={13} />
            </div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Tóm tắt bài học</h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            Lý luận GTD của C. Mác làm rõ <span className="kw">nguồn gốc và bản chất</span> của sự tăng lên của tư bản. GTD không sinh ra từ lưu thông thông thường mà từ quá trình sản xuất, qua việc sử dụng <span className="kw-accent">hàng hóa sức lao động</span>. <span className="kw">Tư bản bất biến</span> chỉ chuyển giá trị cũ vào sản phẩm; <span className="kw-accent">tư bản khả biến</span> là nguồn gốc trực tiếp tạo GTD.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ===== ESSENCE ===== */
function EssenceSection() {
  const items = [
    { icon: <Users size={15} />, text: 'Người lao động bán sức lao động để nhận tiền công.', color: 'info' },
    { icon: <Building size={15} />, text: 'Nhà tư bản mua sức lao động và sử dụng trong quá trình sản xuất.', color: 'info' },
    { icon: <DollarSign size={15} />, text: 'Công nhân tạo ra giá trị mới lớn hơn giá trị sức lao động.', color: 'accent' },
    { icon: <HeartHandshake size={15} />, text: 'Phần giá trị dôi ra ngoài tiền công trở thành GTD.', color: 'accent' },
    { icon: <Building size={15} />, text: 'GTD thuộc về nhà tư bản vì sản phẩm thuộc sở hữu nhà tư bản.', color: 'info' },
  ]
  return (
    <section id="essence" className="section-wrapper" aria-labelledby="essence-title">
      <div className="max-w-3xl">
        <SectionHeader
          cluster="Ôn tập"
          number={4}
          title="Bản chất kinh tế - xã hội của GTD"
          subtitle="Quan hệ giữa lao động làm thuê và người mua sức lao động."
        />

        <p className="section-lead reveal">
          <span className="kw-accent">Giá trị thặng dư</span> là phần giá trị mới dôi ra ngoài giá trị hàng hóa sức lao động. Bản chất kinh tế - xã hội là <span className="kw">quan hệ giữa lao động làm thuê và người mua sức lao động</span>.
        </p>

        <div className="info-list mb-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`info-list-item reveal ${item.color === 'accent' ? 'card-accent' : ''}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="info-list-item-icon" aria-hidden="true">{item.icon}</div>
              <span style={item.color === 'accent' ? { fontWeight: 600 } : {}}>{item.text}</span>
            </motion.div>
          ))}
        </div>

        <Callout type="accent">
          <strong>Kết luận:</strong> Lý luận GTD cho thấy nguồn gốc tăng tư bản không nằm ở lưu thông mà trong <span className="kw-accent">quá trình sản xuất</span>, qua việc sử dụng hàng hóa sức lao động.
        </Callout>
      </div>
    </section>
  )
}

/* ===== KEYWORDS ===== */
function KeywordsSection() {
  const KEYWORDS = [
    'Giá trị thặng dư', 'Tư bản', 'Công thức chung',
    'H — T — H', 'T — H — T\'', 'Hàng hóa sức lao động',
    'Thời gian lao động tất yếu', 'Thời gian lao động thặng dư',
    'Tư bản bất biến', 'Tư bản khả biến', 'Tiền công',
    'Tỷ suất GTD', 'Khối lượng GTD',
    'GTD tuyệt đối', 'GTD tương đối', 'GTD siêu ngạch',
  ]
  return (
    <section id="keywords" className="section-wrapper" aria-labelledby="keywords-title">
      <div className="max-w-3xl">
        <SectionHeader
          cluster="Ôn tập"
          number={4}
          title="Từ khóa cần nhớ"
          subtitle="16 khái niệm quan trọng của Chương 3.1."
        />

        <motion.div
          className="tag-list justify-start reveal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {KEYWORDS.map((kw, i) => (
            <motion.span
              key={i}
              className="tag"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Tag size={11} />
              {kw}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ===== QUIZ ===== */
const QUESTIONS = [
  { id: 1, question: 'Công thức chung của tư bản là gì?', options: [{ id: 'A', text: 'H - T - H' }, { id: 'B', text: 'T - H - T\'' }, { id: 'C', text: 'H - H - T' }, { id: 'D', text: 'T - T - H' }], correct: 'B', explanation: 'Công thức chung của tư bản là T - H - T\', trong đó T\' lớn hơn T, phần chênh lệch là giá trị thặng dư.' },
  { id: 2, question: 'Trong công thức T - H - T\', T\' có nghĩa là gì?', options: [{ id: 'A', text: 'Số tiền ban đầu' }, { id: 'B', text: 'Số tiền mất đi' }, { id: 'C', text: 'Số tiền thu về lớn hơn số tiền ứng ra ban đầu' }, { id: 'D', text: 'Giá trị sử dụng của hàng hóa' }], correct: 'C', explanation: 'T\' là số tiền thu về lớn hơn T ban đầu. Phần chênh lệch ΔT chính là giá trị thặng dư.' },
  { id: 3, question: 'Hàng hóa nào là chìa khóa giải thích nguồn gốc GTD?', options: [{ id: 'A', text: 'Máy móc' }, { id: 'B', text: 'Nguyên liệu' }, { id: 'C', text: 'Sức lao động' }, { id: 'D', text: 'Tiền tệ' }], correct: 'C', explanation: 'Sức lao động là hàng hóa đặc biệt, tạo ra giá trị mới lớn hơn giá trị của chính nó — nguồn gốc GTD.' },
  { id: 4, question: 'Tư bản bất biến được ký hiệu là gì?', options: [{ id: 'A', text: 'c' }, { id: 'B', text: 'v' }, { id: 'C', text: 'm' }, { id: 'D', text: 'M' }], correct: 'A', explanation: 'c là ký hiệu tư bản bất biến (constante). v là tư bản khả biến, m là GTD, M là khối lượng GTD.' },
  { id: 5, question: 'Tư bản khả biến dùng để mua yếu tố nào?', options: [{ id: 'A', text: 'Máy móc' }, { id: 'B', text: 'Nguyên liệu' }, { id: 'C', text: 'Sức lao động' }, { id: 'D', text: 'Nhà xưởng' }], correct: 'C', explanation: 'Tư bản khả biến (v) mua hàng hóa sức lao động. Đây là nguồn gốc trực tiếp tạo GTD.' },
  { id: 6, question: 'Công thức tính tỷ suất GTD là gì?', options: [{ id: 'A', text: "m' = m / v × 100%" }, { id: 'B', text: 'M = c + v' }, { id: 'C', text: 'G = T + H' }, { id: 'D', text: 'T = H + m' }], correct: 'A', explanation: "m' = m / v × 100% là công thức tính tỷ suất GTD, phản ánh trình độ khai thác sức lao động." },
  { id: 7, question: 'GTD tuyệt đối thu được chủ yếu bằng cách nào?', options: [{ id: 'A', text: 'Rút ngắn thời gian lao động tất yếu' }, { id: 'B', text: 'Kéo dài ngày lao động hoặc tăng cường độ' }, { id: 'C', text: 'Giảm giá trị hàng hóa' }, { id: 'D', text: 'Tăng số lượng công nhân' }], correct: 'B', explanation: 'GTD tuyệt đối thu được bằng cách kéo dài ngày lao động, trong khi các yếu tố khác không đổi.' },
  { id: 8, question: 'GTD tương đối thu được chủ yếu bằng cách nào?', options: [{ id: 'A', text: 'Tăng năng suất lao động xã hội để rút ngắn thời gian lao động tất yếu' }, { id: 'B', text: 'Tăng thời gian nghỉ ngơi' }, { id: 'C', text: 'Giảm số công nhân' }, { id: 'D', text: 'Giảm sản lượng' }], correct: 'A', explanation: 'GTD tương đối thu được bằng tăng năng suất lao động xã hội, rút ngắn thời gian lao động tất yếu.' },
]

function QuizSection() {
  const [selected, setSelected] = useState({})
  const [answered, setAnswered] = useState({})
  const [score, setScore] = useState(null)

  const handleSelect = (qId, optId) => {
    if (answered[qId]) return
    setSelected((p) => ({ ...p, [qId]: optId }))
  }

  const handleSubmit = (qId) => {
    if (!selected[qId]) return
    setAnswered((p) => ({ ...p, [qId]: true }))
  }

  const handleScore = () => {
    let correct = 0
    QUESTIONS.forEach((q) => { if (selected[q.id] === q.correct) correct++ })
    setScore(correct)
  }

  const handleReset = () => {
    setSelected({})
    setAnswered({})
    setScore(null)
  }

  return (
    <section id="quiz" className="section-wrapper" aria-labelledby="quiz-title">
      <div className="max-w-3xl">
        <SectionHeader
          cluster="Ôn tập"
          number={4}
          title="Mini Quiz ôn tập"
          subtitle="8 câu trắc nghiệm — Kiểm tra kiến thức của bạn."
        />

        {score !== null && (
          <motion.div
            className="card text-center mb-6 reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Award size={36} style={{ color: 'var(--color-primary)', margin: '0 auto 0.75rem' }} />
            <p className="font-mono text-xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
              {score} / {QUESTIONS.length}
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
              {score === QUESTIONS.length ? 'Xuất sắc! Bạn nắm vững toàn bộ nội dung.' : score >= 6 ? 'Tốt lắm! Hiểu rõ phần lớn nội dung.' : 'Cần ôn lại thêm. Hãy xem lại các phần chưa nắm vững.'}
            </p>
            <button onClick={handleReset} className="btn btn-outline text-sm">Làm lại</button>
          </motion.div>
        )}

        {QUESTIONS.map((q) => (
          <motion.div
            key={q.id}
            className="quiz-card reveal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="quiz-badge" aria-hidden="true">{q.id}</span>
              <p className="quiz-question-text">{q.question}</p>
            </div>

            <div className="space-y-2">
              {q.options.map((opt) => {
                const isSel = selected[q.id] === opt.id
                const isCorr = opt.id === q.correct
                const isAns = answered[q.id]
                let cls = 'quiz-option'
                if (isAns) {
                  if (isCorr) cls += ' quiz-correct'
                  else if (isSel) cls += ' quiz-wrong'
                } else if (isSel) cls += ' quiz-selected'
                return (
                  <div key={opt.id} className={cls} onClick={() => handleSelect(q.id, opt.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleSelect(q.id, opt.id)}>
                    <span className="quiz-badge" aria-hidden="true">{opt.id}</span>
                    <span>{opt.text}</span>
                    {isAns && isCorr && <CheckCircle size={15} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                    {isAns && isSel && !isCorr && <XCircle size={15} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                  </div>
                )
              })}
            </div>

            {!answered[q.id] && selected[q.id] && (
              <button onClick={() => handleSubmit(q.id)} className="btn btn-outline text-sm mt-3">
                Xác nhận
              </button>
            )}

            <AnimatePresence>
              {answered[q.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`quiz-feedback ${selected[q.id] === q.correct ? 'correct' : 'wrong'}`}
                >
                  <strong>{selected[q.id] === q.correct ? 'Chính xác!' : 'Chưa đúng.'}</strong>{' '}{q.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {score === null && Object.keys(selected).length > 0 && (
          <div className="text-center mt-6">
            <button onClick={handleScore} className="btn btn-primary">
              Xem kết quả
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ===== PRESENTATION ===== */
const SECTIONS = [
  { title: 'Mở đầu', content: 'Kính chào thầy cô và các bạn. Hôm nay, em xin trình bày nội dung Chương 3.1: Lý luận của C. Mác về giá trị thặng dư. Đây là phần kiến thức quan trọng trong môn Kinh tế chính trị Mác - Lênin, giúp hiểu nguồn gốc của tư bản và bản chất của giá trị thặng dư.' },
  { title: 'Công thức chung của tư bản', content: 'Cần phân biệt H - T - H (lưu thông hàng hóa giản đơn, mục đích giá trị sử dụng) với T - H - T\' (lưu thông của tư bản, mục đích thu GTD). Khi tiền dùng để tạo GTD, tiền chuyển hóa thành tư bản.' },
  { title: 'Hàng hóa sức lao động', content: 'GTD không sinh ra từ mua bán thông thường mà từ hàng hóa đặc biệt: hàng hóa sức lao động. Sức lao động trở thành hàng hóa khi người lao động tự do về thân thể nhưng không có tư liệu sản xuất. Điểm đặc biệt: sức lao động tạo giá trị mới lớn hơn giá trị của chính nó.' },
  { title: 'Quá trình sản xuất GTD', content: 'Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động. Công nhân lao động để tạo sản phẩm. Thời gian lao động tất yếu bù đắp tiền công; thời gian lao động thặng dư tạo GTD cho nhà tư bản.' },
  { title: 'Tư bản bất biến và khả biến', content: 'C. Mác chia tư bản: tư bản bất biến (c) mua tư liệu sản xuất, chỉ chuyển giá trị cũ; tư bản khả biến (v) mua sức lao động, là nguồn gốc trực tiếp tạo GTD.' },
  { title: 'Tỷ suất và khối lượng GTD', content: 'Tỷ suất GTD: m\' = m/v × 100%, phản ánh mức độ khai thác. Khối lượng GTD: M = m\' × V, phản ánh quy mô GTD thu được.' },
  { title: 'Các phương pháp sản xuất GTD', content: 'GTD tuyệt đối: kéo dài ngày lao động. GTD tương đối: tăng năng suất lao động xã hội rút ngắn thời gian lao động tất yếu. GTD siêu ngạch: doanh nghiệp cải tiến kỹ thuật trước thu GTD cao hơn.' },
  { title: 'Kết luận', content: 'Lý luận GTD của C. Mác làm rõ nguồn gốc và bản chất sự tăng tư bản. GTD không tự sinh trong lưu thông mà trong quá trình sản xuất, qua việc sử dụng hàng hóa sức lao động. Xin cảm ơn thầy cô và các bạn đã lắng nghe.' },
]

function PresentationSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="presentation" className="section-wrapper" aria-labelledby="presentation-title">
      <div className="max-w-3xl">
        <SectionHeader
          cluster="Ôn tập"
          number={4}
          title="Kịch bản thuyết trình"
          subtitle="Mở rộng từng phần để chuẩn bị bài thuyết trình."
        />

        <div>
          {SECTIONS.map((section, i) => (
            <motion.div
              key={i}
              className="accordion-item reveal"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <button className="accordion-trigger" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <div className="flex items-center gap-3">
                  <span className="quiz-badge" aria-hidden="true">{i + 1}</span>
                  <span>{section.title}</span>
                </div>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="accordion-content">
                      <div className="flex items-start gap-3">
                        <Mic size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-primary)' }} aria-hidden="true" />
                        <p className="text-sm" style={{ lineHeight: 1.75 }}>{section.content}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ClusterFour() {
  return (
    <>
      <SummarySection />
      <div className="section-divider" />
      <EssenceSection />
      <div className="section-divider" />
      <KeywordsSection />
      <div className="section-divider" />
      <QuizSection />
    </>
  )
}
