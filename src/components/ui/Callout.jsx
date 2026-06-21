export function Callout({ type = 'info', children }) {
  const classes = {
    info: 'callout callout-info',
    warning: 'callout callout-warning',
    danger: 'callout callout-danger',
    accent: 'callout callout-accent',
  }
  return <div className={classes[type]}>{children}</div>
}
