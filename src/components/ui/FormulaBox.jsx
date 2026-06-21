export function FormulaBox({ formula, vars, style = {} }) {
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
