import { motion } from 'framer-motion'
import { Settings, Coins, Percent, BarChart2, TrendingUp, Clock, Zap, AlertCircle } from 'lucide-react'

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

export default function ClusterThree() {
  return (
    <>
      {/* ===== CAPITAL ===== */}
      <section id="capital" className="section-wrapper" aria-labelledby="capital-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Công cụ phân tích"
            number={3}
            title="Tư bản bất biến và tư bản khả biến"
            subtitle="C. Mác phân chia tư bản theo vai trò trong việc tạo giá trị thặng dư."
          />

          <p className="section-lead reveal">
            Để làm rõ nguồn gốc của <span className="kw-accent">giá trị thặng dư</span>, C. Mác chia tư bản thành hai bộ phận:
          </p>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono font-bold text-3xl" style={{ color: 'var(--color-primary)' }}>c</span>
                <h3 className="compare-col-label green mb-0">Tư bản bất biến</h3>
              </div>
              <div className="info-list">
                {[
                  'Mua tư liệu sản xuất: máy móc, nhà xưởng, nguyên liệu, nhiên liệu.',
                  'Giá trị được lao động cụ thể bảo tồn và chuyển vào sản phẩm mới.',
                  'Không tạo ra giá trị mới.',
                  'Không trực tiếp tạo ra GTD, nhưng là điều kiện cần thiết.',
                ].map((text, i) => (
                  <div key={i} className="info-list-item" style={{ padding: '0.5rem 0.75rem' }}>
                    <div className="info-list-item-icon" style={{ width: 18, height: 18, fontSize: '0.65rem' }} aria-hidden="true">›</div>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono font-bold text-3xl" style={{ color: 'var(--color-accent)' }}>v</span>
                <h3 className="compare-col-label indigo mb-0">Tư bản khả biến</h3>
              </div>
              <div className="info-list">
                {[
                  'Dùng để mua hàng hóa sức lao động.',
                  'Trong quá trình SX, lao động của công nhân tạo giá trị mới lớn hơn giá trị ban đầu.',
                  'Biến đổi về lượng trong quá trình sản xuất.',
                  'Đây là nguồn gốc trực tiếp tạo ra giá trị thặng dư.',
                ].map((text, i) => (
                  <div key={i} className="info-list-item" style={{ padding: '0.5rem 0.75rem' }}>
                    <div className="info-list-item-icon" style={{ width: 18, height: 18, fontSize: '0.65rem' }} aria-hidden="true">›</div>
                    <span className="text-sm" style={i === 3 ? { fontWeight: 600 } : {}}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <FormulaBox
            formula="G = c + (v + m)"
            vars={[
              { sym: 'c', desc: '— giá trị tư liệu sản xuất (lao động quá khứ)' },
              { sym: 'v', desc: '— giá trị sức lao động (tư bản khả biến)' },
              { sym: 'm', desc: '— giá trị thặng dư' },
              { sym: 'v + m', desc: '— giá trị mới do lao động sống công nhân tạo ra' },
            ]}
          />

          <Callout type="accent">
            <Settings size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            <strong>Phát hiện quan trọng:</strong> Tư bản bất biến <span className="kw">không tạo ra GTD</span>. Tư bản khả biến là <span className="kw-accent">nguồn gốc trực tiếp</span> tạo ra GTD.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== SALARY ===== */}
      <section id="salary" className="section-wrapper" aria-labelledby="salary-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Công cụ phân tích"
            number={3}
            title="Tiền công trong chủ nghĩa tư bản"
            subtitle="Hình thức biểu hiện của giá trị hàng hóa sức lao động."
          />

          <p className="section-lead reveal">
            <span className="kw">Tiền công</span> là giá cả của hàng hóa sức lao động. Bề ngoài, có vẻ như nhà tư bản trả công cho toàn bộ lao động của công nhân. Nhưng thực chất, tiền công chỉ tương ứng với <span className="kw">giá trị sức lao động</span>.
          </p>

          <div className="info-list mb-6">
            {[
              { text: 'Công nhân làm việc một khoảng thời gian và nhận tiền công.', num: 1 },
              { text: 'Điều này dễ làm hiểu nhà tư bản trả công cho toàn bộ lao động.', num: 2 },
              { text: 'Nhưng thực chất, tiền công chỉ tương ứng với giá trị sức lao động.', num: 3 },
              { text: 'Trong ngày lao động, công nhân tạo giá trị lớn hơn tiền công.', num: 4 },
              { text: 'Phần dôi ra ngoài tiền công là giá trị thặng dư.', num: 5 },
            ].map((item) => (
              <motion.div
                key={item.num}
                className="info-list-item reveal"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: item.num * 0.05 }}
              >
                <div className="info-list-item-icon" aria-hidden="true">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>{item.num}</span>
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>

          <Callout type="warning">
            <Coins size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
            <strong>Liên hệ thực tế:</strong> Khi hiểu đúng bản chất tiền công, người lao động nhận thức rõ hơn vị trí của mình trong <span className="kw-accent">quan hệ lợi ích</span> với người sử dụng lao động.
          </Callout>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== RATE MASS ===== */}
      <section id="rate-mass" className="section-wrapper" aria-labelledby="rate-mass-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Công cụ phân tích"
            number={3}
            title="Tỷ suất và Khối lượng giá trị thặng dư"
            subtitle="Hai chỉ tiêu quan trọng để đánh giá quá trình sản xuất GTD."
          />

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="info-list-item-icon" aria-hidden="true">
                  <Percent size={13} />
                </div>
                <h3 className="compare-col-label green mb-0">Tỷ suất GTD</h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Phản ánh trình độ khai thác sức lao động làm thuê.
              </p>

              <FormulaBox
                formula="m' = m / v × 100%"
                vars={[
                  { sym: "m'", desc: '— tỷ suất GTD (%)' },
                  { sym: 'm', desc: '— giá trị thặng dư' },
                  { sym: 'v', desc: '— tư bản khả biến' },
                ]}
              />

              <FormulaBox
                formula="m' = t' / t × 100%"
                vars={[
                  { sym: "t'", desc: '— thời gian lao động thặng dư' },
                  { sym: 't', desc: '— thời gian lao động tất yếu' },
                ]}
              />

              <Callout type="info">
                <strong>Ví dụ:</strong> 4h tất yếu + 4h thặng dư &rarr; <span className="kw">m' = 100%</span>. Một nửa ngày lao động bù đắp tiền công, nửa còn lại tạo <span className="kw-accent">GTD</span>.
              </Callout>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="info-list-item-icon" aria-hidden="true">
                  <BarChart2 size={13} />
                </div>
                <h3 className="compare-col-label indigo mb-0">Khối lượng GTD</h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Phản ánh quy mô GTD nhà tư bản thu được.
              </p>

              <FormulaBox
                formula="M = m' × V"
                vars={[
                  { sym: 'M', desc: '— khối lượng GTD' },
                  { sym: "m'", desc: '— tỷ suất GTD (%)' },
                  { sym: 'V', desc: '— tổng tư bản khả biến' },
                ]}
              />

              <Callout type="accent">
                Tỷ suất GTD phản ánh <span className="kw-accent">mức độ khai thác</span>; Khối lượng GTD phản ánh <span className="kw-accent">quy mô</span>.
              </Callout>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== METHODS ===== */}
      <section id="methods" className="section-wrapper" aria-labelledby="methods-title">
        <div className="max-w-3xl">
          <SectionHeader
            cluster="Công cụ phân tích"
            number={3}
            title="Các phương pháp sản xuất GTD"
            subtitle="Hai phương pháp cơ bản để thu nhiều GTD hơn."
          />

          <p className="section-lead reveal">
            Để thu được nhiều <span className="kw-accent">giá trị thặng dư</span> hơn, nhà tư bản sử dụng hai phương pháp:
          </p>

          <div className="card-grid-2 mb-6">
            <motion.div
              className="card reveal"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="info-list-item-icon" aria-hidden="true">
                  <Clock size={13} />
                </div>
                <h3 className="compare-col-label green mb-0">GTD tuyệt đối</h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Thu được bằng cách <span className="kw">kéo dài ngày lao động</span>, trong khi năng suất, giá trị SLĐ và thời gian lao động tất yếu không đổi.
              </p>
              <div className="formula-box" style={{ padding: '1rem' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ví dụ</p>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Ngày 8h: 4h tất yếu + 4h thặng dư &rarr; <span className="kw">m' = 100%</span>
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Kéo dài 10h: 4h tất yếu + 6h thặng dư &rarr; <span className="kw">m' = 150%</span>
                </p>
              </div>
              <Callout type="info">
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
                Ngày lao động bị giới hạn bởi thể chất, tinh thần và sự đấu tranh của người lao động.
              </Callout>
            </motion.div>

            <motion.div
              className="card card-accent reveal"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="info-list-item-icon" aria-hidden="true">
                  <TrendingUp size={13} />
                </div>
                <h3 className="compare-col-label indigo mb-0">GTD tương đối</h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Thu được bằng cách <span className="kw-accent">rút ngắn thời gian lao động tất yếu</span>, kéo dài thời gian lao động thặng dư, trong điều kiện ngày lao động không đổi.
              </p>
              <div className="formula-box" style={{ padding: '1rem' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ví dụ</p>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Ngày 8h: 4h tất yếu + 4h thặng dư &rarr; <span className="kw-accent">m' = 100%</span>
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Tăng năng suất &rarr; 2h tất yếu + 6h thặng dư &rarr; <span className="kw-accent">m' = 300%</span>
                </p>
              </div>
              <Callout type="accent">
                <Zap size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true"/>
                Cần tăng năng suất lao động xã hội, đặc biệt trong các ngành sản xuất tư liệu sinh hoạt cần thiết.
              </Callout>
            </motion.div>
          </div>

          <motion.div
            className="card reveal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="info-list-item-icon" style={{ background: '#d1fae5' }} aria-hidden="true">
                <Zap size={13} style={{ color: '#059669' }} />
              </div>
              <h3 className="compare-col-label" style={{ color: '#059669', borderColor: '#059669' }}>GTD siêu ngạch</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              Khi một doanh nghiệp cải tiến kỹ thuật trước, hàng hóa có <span className="kw">giá trị cá biệt thấp hơn giá trị xã hội</span>. Phần chênh lệch GTD cao hơn gọi là <span className="kw-accent">GTD siêu ngạch</span>.
            </p>
            <div className="card-grid-4 mb-4">
              {[
                { label: 'Nguồn gốc', text: 'Tăng năng suất lao động cá biệt' },
                { label: 'Điều kiện', text: 'GT cá biệt < GT xã hội' },
                { label: 'Kết quả', text: 'Thu GTD cao hơn' },
                { label: 'Ý nghĩa', text: 'Thúc đẩy đổi mới kỹ thuật' },
              ].map((item) => (
                <div key={item.label} className="card" style={{ padding: '0.75rem', background: 'var(--color-bg-muted)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout type="accent">
              <strong>Kết luận:</strong> <span className="kw-accent">GTD siêu ngạch</span> là động lực thúc đẩy nhà tư bản cải tiến kỹ thuật, hợp lý hóa sản xuất, nâng cao năng suất lao động.
            </Callout>
          </motion.div>
        </div>
      </section>
    </>
  )
}
