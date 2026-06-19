import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Zap, HelpCircle, KeyRound, Users, Lock } from 'lucide-react'

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
  const classes = {
    info: 'callout callout-info',
    warning: 'callout callout-warning',
    danger: 'callout callout-danger',
    accent: 'callout callout-accent',
  }
  return <div className={classes[type]}>{children}</div>
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
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

export default function ClusterOne() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section id="intro" className="section-wrapper" aria-labelledby="intro-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Tổng quan"
            number={1}
            title="Dẫn nhập Chương 3"
            subtitle="Vì sao cần nghiên cứu giá trị thặng dư?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Vị trí trong Chương 3</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Sau khi nghiên cứu lý luận giá trị, <span className="kw">Chương 3</span> tiếp tục làm rõ lý luận <span className="kw-accent">giá trị thặng dư</span> — nội dung cốt lõi trong kinh tế chính trị của C. Mác.
              </p>
            </motion.div>

            <motion.div
              className="card card-primary reveal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="info-list-item-icon" aria-hidden="true">
                  <Lightbulb size={13} />
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-primary-dark)' }}>Ý nghĩa học tập</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-primary-dark)', lineHeight: 1.7 }}>
                Giúp người học hiểu <span className="kw">quan hệ lợi ích cơ bản</span> giữa người lao động làm thuê và người sở hữu tư liệu sản xuất.
              </p>
            </motion.div>
          </div>

          <Callout type="danger">
            <strong>Giá trị thặng dư</strong> là nội dung cốt lõi, giải thích nguồn gốc của sự gia tăng tư bản trong nền kinh tế thị trường tư bản chủ nghĩa.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== FORMULA ===== */}
      <section id="formula" className="section-wrapper" aria-labelledby="formula-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Cơ chế tạo GTD"
            number={2}
            title="Công thức chung của tư bản"
            subtitle="Điểm xuất phát để tìm hiểu nguồn gốc giá trị thặng dư."
          />

          <p className="section-lead reveal">
            Để tìm hiểu nguồn gốc của <span className="kw-accent">giá trị thặng dư</span>, trước hết cần phân biệt hai dạng vận động của tiền:
          </p>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="compare-col-label green mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
                Lưu thông hàng hóa giản đơn
              </h3>
              <div className="formula-box mb-4">
                <div className="formula-main" style={{ fontSize: '1.4rem' }}>H — T — H</div>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Hàng hóa &rarr; Tiền &rarr; Hàng hóa khác. Mục đích: <span className="kw">giá trị sử dụng</span> — thỏa mãn nhu cầu tiêu dùng.
              </p>
              <Callout type="info">
                <strong>Ví dụ:</strong> Bán lúa lấy tiền, rồi dùng tiền mua quần áo.
              </Callout>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="compare-col-label indigo mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                Lưu thông của tư bản
              </h3>
              <div className="formula-box mb-4">
                <div className="formula-main" style={{ fontSize: '1.4rem' }}>T — H — T&apos;</div>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Tiền &rarr; Hàng hóa &rarr; Tiền nhiều hơn. Mục đích: <span className="kw-accent">giá trị thặng dư</span>.
              </p>
              <div className="formula-box" style={{ padding: '1rem' }}>
                <div className="formula-main" style={{ fontSize: '1.1rem', marginBottom: 0 }}>
                  T&apos; = T + &Delta;T
                </div>
              </div>
            </motion.div>
          </div>

          <FormulaBox
            formula="T' = T + ΔT"
            vars={[
              { sym: 'T', desc: '— số tiền ứng ra ban đầu' },
              { sym: "T'", desc: '— số tiền thu về (lớn hơn T)' },
              { sym: 'ΔT', desc: '— phần giá trị tăng thêm = giá trị thặng dư' },
            ]}
          />

          <Callout type="accent">
            <Zap size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            <strong>Kết luận:</strong> Khi tiền được dùng để thu <span className="kw-accent">giá trị thặng dư</span>, tiền chuyển hóa thành <span className="kw">tư bản</span>. Tư bản là giá trị đem lại giá trị thặng dư.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CONTRADICTION ===== */}
      <section id="contradiction" className="section-wrapper" aria-labelledby="contradiction-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Cơ chế tạo GTD"
            number={2}
            title="Mâu thuẫn của công thức chung"
            subtitle="Giá trị thặng dư từ đâu mà có?"
          />

          <p className="section-lead reveal">
            Vấn đề cốt lõi: nếu mua bán ngang giá, người mua và người bán chỉ trao đổi vật ngang giá — không thể tạo ra giá trị mới. Nếu mua rẻ bán đắt, người này lợi nhưng người kia thiệt; tổng giá trị xã hội không tăng.
          </p>

          <div className="info-list mb-6">
            {[
              { text: 'Lưu thông thông thường không tạo ra giá trị thặng dư.', num: 1 },
              { text: 'Ngoài lưu thông, tiền cũng không thể tự tăng lên.', num: 2 },
              { text: 'Bí mật phải nằm ở một loại hàng hóa đặc biệt.', num: 3 },
              { text: 'Loại hàng hóa đó khi sử dụng có thể tạo ra giá trị mới lớn hơn giá trị của chính nó.', num: 4 },
              { text: 'Hàng hóa đặc biệt đó là sức lao động.', num: 5, highlight: true },
            ].map((item) => (
              <motion.div
                key={item.num}
                className={`info-list-item reveal ${item.highlight ? 'card-accent' : ''}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: item.num * 0.06 }}
              >
                <div className="info-list-item-icon" aria-hidden="true">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>{item.num}</span>
                </div>
                <span style={item.highlight ? { fontWeight: 600, color: 'var(--color-accent-dark)' } : {}}>{item.text}</span>
              </motion.div>
            ))}
          </div>

          <Callout type="accent">
            <HelpCircle size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            <strong>Kết luận:</strong> Mâu thuẫn được giải quyết bằng việc phát hiện <span className="kw-accent">hàng hóa sức lao động</span>.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== LABOR ===== */}
      <section id="labor" className="section-wrapper" aria-labelledby="labor-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Cơ chế tạo GTD"
            number={2}
            title="Hàng hóa sức lao động"
            subtitle="Chìa khóa giải thích nguồn gốc giá trị thặng dư"
          />

          <p className="section-lead reveal">
            <span className="kw">Sức lao động</span> là toàn bộ năng lực thể chất và tinh thần tồn tại trong con người, được sử dụng trong quá trình lao động sản xuất. Trong CNTB, sức lao động trở thành một <span className="kw-accent">hàng hóa đặc biệt</span>.
          </p>

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
                  <Users size={13} />
                </div>
                <h3 className="compare-col-label green">Điều kiện 1</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Người lao động phải được <span className="kw">tự do về thân thể</span>, có quyền bán sức lao động của mình.
              </p>
            </motion.div>

            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="info-list-item-icon" aria-hidden="true">
                  <Lock size={13} />
                </div>
                <h3 className="compare-col-label red">Điều kiện 2</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Người lao động <span className="kw-accent">không có tư liệu sản xuất</span>, buộc phải bán sức lao động để sinh sống.
              </p>
            </motion.div>
          </div>

          <p className="section-lead reveal">Hai thuộc tính của hàng hóa sức lao động:</p>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="compare-col-label green mb-3">Giá trị hàng hóa sức lao động</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Do <span className="kw">lượng lao động xã hội cần thiết</span> để sản xuất và tái sản xuất sức lao động quyết định. Được đo gián tiếp qua giá trị tư liệu sinh hoạt cần thiết.
              </p>
              <div className="info-list">
                {[
                  'Giá trị tư liệu sinh hoạt cần thiết cho người lao động.',
                  'Chi phí đào tạo người lao động.',
                  'Giá trị tư liệu sinh hoạt nuôi con người lao động.',
                ].map((item, i) => (
                  <div key={i} className="info-list-item" style={{ padding: '0.5rem 0.75rem' }}>
                    <div className="info-list-item-icon" style={{ width: 18, height: 18, fontSize: '0.65rem' }} aria-hidden="true">{i + 1}</div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="compare-col-label indigo mb-3">Giá trị sử dụng</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Thể hiện trong quá trình lao động. <span className="kw-accent">Điểm đặc biệt:</span> khi được sử dụng, sức lao động không chỉ bảo tồn giá trị của bản thân mà còn <strong>tạo ra giá trị mới lớn hơn</strong> giá trị của chính nó.
              </p>
              <Callout type="accent">
                <KeyRound size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
                Sức lao động là hàng hóa đặc biệt vì có khả năng tạo ra <strong>giá trị thặng dư</strong>.
              </Callout>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
