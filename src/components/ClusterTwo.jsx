import { motion } from 'framer-motion'
import { Factory, Clock, TrendingUp, Calculator } from 'lucide-react'

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

function FormulaBox({ formula, vars, style = {} }) {
  return (
    <div className="formula-box mb-6" style={style}>
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

const STEPS = [
  'Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động.',
  'Công nhân dùng lao động cụ thể biến tư liệu sản xuất thành sản phẩm mới.',
  'Giá trị tư liệu sản xuất được chuyển vào giá trị sản phẩm.',
  'Công nhân dùng lao động trừu tượng tạo ra giá trị mới.',
  'Phần giá trị mới bù đắp tiền công, phần còn lại là giá trị thặng dư.',
]

export default function ClusterTwo() {
  return (
    <>
      {/* ===== PRODUCTION ===== */}
      <section id="production" className="section-wrapper" aria-labelledby="production-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Cơ chế tạo GTD"
            number={2}
            title="Quá trình sản xuất giá trị thặng dư"
            subtitle="Sự thống nhất giữa tạo giá trị và làm tăng giá trị."
          />

          <p className="section-lead reveal">
            Quá trình sản xuất GTD là sự thống nhất giữa <span className="kw">quá trình tạo giá trị</span> và <span className="kw">quá trình làm tăng giá trị</span>. Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động. Công nhân sử dụng sức lao động để sản xuất hàng hóa mới.
          </p>

          <div className="timeline mb-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="timeline-item reveal"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="timeline-step-label">Bước {i + 1}</div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{step}</p>
              </motion.div>
            ))}
          </div>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="info-list-item-icon" aria-hidden="true">
                  <Clock size={13} />
                </div>
                <h3 className="compare-col-label green mb-0">Thời gian lao động tất yếu</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Phần thời gian tạo giá trị ngang bằng <span className="kw">giá trị sức lao động</span> (tương ứng tiền công).
              </p>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="info-list-item-icon" aria-hidden="true">
                  <TrendingUp size={13} />
                </div>
                <h3 className="compare-col-label indigo mb-0">Thời gian lao động thặng dư</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Phần thời gian tạo ra <span className="kw-accent">giá trị thặng dư</span> cho nhà tư bản.
              </p>
            </motion.div>
          </div>

          <Callout type="danger">
            <Factory size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            <strong>Bản chất GTD:</strong> Phần giá trị mới do lao động công nhân tạo ra ngoài giá trị sức lao động, bị nhà tư bản chiếm đoạt.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== EXAMPLE ===== */}
      <section id="example" className="section-wrapper" aria-labelledby="example-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Cơ chế tạo GTD"
            number={2}
            title="Ví dụ minh họa"
            subtitle="Quá trình sản xuất giá trị thặng dư trong thực tế"
          />

          <p className="section-lead reveal">
            Giả sử nhà tư bản sản xuất sợi. Ngày lao động 8 giờ, nhà tư bản ứng:
          </p>

          <motion.div
            className="calc-panel mb-6 reveal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="calc-row">
              <span className="calc-label">Mua bông</span>
              <span className="calc-value">50 USD</span>
            </div>
            <div className="calc-row">
              <span className="calc-label">Hao mòn máy móc</span>
              <span className="calc-value">3 USD</span>
            </div>
            <div className="calc-row">
              <span className="calc-label">Mua sức lao động (1 ngày)</span>
              <span className="calc-value surplus">15 USD</span>
            </div>
            <div className="calc-row">
              <span className="calc-label" style={{ fontWeight: 700 }}>Tổng tư bản ứng trước</span>
              <span className="calc-value total">68 USD</span>
            </div>
          </motion.div>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="compare-col-label green mb-3">4 giờ đầu — Lao động tất yếu</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Công nhân tạo 15 USD giá trị mới = giá trị sức lao động.
              </p>
              <div className="formula-box" style={{ padding: '0.75rem', marginBottom: 0 }}>
                <div className="formula-main" style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  50 + 3 + 15 = <strong>68 USD</strong>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="compare-col-label indigo mb-3">4 giờ sau — Lao động thặng dư</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Công nhân tạo thêm 15 USD giá trị mới &rarr; <span className="kw-accent">giá trị thặng dư</span>.
              </p>
              <div className="formula-box" style={{ padding: '0.75rem', marginBottom: 0 }}>
                <div className="formula-main" style={{ fontSize: '0.95rem', marginBottom: 0 }}>
                  68 + 15 = <strong>83 USD</strong>
                </div>
              </div>
            </motion.div>
          </div>

          <FormulaBox
            formula="G = c + v + m"
            vars={[
              { sym: 'c', desc: '— tư bản bất biến (tư liệu sản xuất)' },
              { sym: 'v', desc: '— tư bản khả biến (sức lao động)' },
              { sym: 'm', desc: '— giá trị thặng dư (15 USD)' },
            ]}
          />

          <Callout type="accent">
            <Calculator size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            Nhà tư bản ứng <strong>68 USD</strong>, thu về <strong>83 USD</strong>. Phần chênh lệch <strong>15 USD</strong> chính là <span className="kw-accent">giá trị thặng dư</span>.
          </Callout>
        </div>
      </section>
    </>
  )
}
