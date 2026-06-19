import { useEffect } from 'react'

export function useScrollReveal(selector = '.reveal', threshold = 0.12) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold }
    )

    const els = document.querySelectorAll(selector)
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, threshold])
}
