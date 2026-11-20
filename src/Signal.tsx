import { useEffect, useRef } from 'react'

export function Signal({ variant = 0, hero = false }: { variant?: number; hero?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!element || !context) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let width = 0
    let height = 0

    function draw(time: number) {
      if (!context) return
      context.clearRect(0, 0, width, height)
      const phase = motion.matches ? 0 : time * 0.00022
      if (hero) {
        const centerX = width * 0.54
        const centerY = height * 0.52
        const scale = Math.min(width, height) * 0.44
        for (let row = 0; row < 51; row++) {
          context.beginPath()
          const v = row / 50 * 2 - 1
          for (let col = 0; col <= 112; col++) {
            const u = col / 112 * 2 - 1
            const envelope = Math.max(0, 1 - u * u)
            const wave = Math.sin(u * 5.3 + v * 3.5 + phase) * envelope
            const x = centerX + scale * (u * 1.22 + v * 0.25 + wave * 0.14)
            const y = centerY + scale * (v * 0.51 - u * 0.30 + wave * 0.43)
            if (col === 0) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
          const alpha = 0.21 + 0.62 * Math.sin(Math.PI * row / 50)
          context.strokeStyle = 'rgba(130,174,255,' + alpha + ')'
          context.lineWidth = row % 7 === 0 ? 1.25 : 0.75
          context.stroke()
        }
      } else if (variant === 0 || variant === 5) {
        const levels = variant === 0 ? 3 : 1
        for (let band = 0; band < levels; band++) {
          const baseline = height * (band + 1) / (levels + 1)
          context.beginPath()
          for (let x = 0; x <= width; x += 2) {
            const position = x / width
            const wave = Math.sin(position * (19 + 15 * band)) * 0.48
              + Math.cos(position * (47 + 23 * band)) * 0.29
              + Math.sin(position * 93) * 0.13
            const y = baseline + wave * height * (levels === 1 ? 0.42 : 0.14) * Math.sin(Math.PI * position)
            if (x === 0) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
          context.strokeStyle = ['#82aeff', '#668ed0', '#45699f'][band]
          context.lineWidth = 1.6
          context.stroke()
        }
      } else {
        const colors = ['#82aeff', '#8bcfff', '#9caeff', '#82aeff', '#a8bfff']
        context.strokeStyle = colors[variant]
        context.lineWidth = 1
        const unit = Math.min(height, width)
        for (let ring = 0; ring < 12; ring++) {
          context.beginPath()
          context.globalAlpha = 0.25 + ring / 18
          const radius = unit * (0.085 + ring * 0.025)
          for (let i = 0; i <= 120; i++) {
            const angle = i / 120 * Math.PI * 2
            const shape = 1 + 0.15 * Math.sin(angle * (variant + 2) + ring * 0.27)
            const x = width / 2 + Math.cos(angle) * radius * shape * 1.6
            const y = height / 2 + Math.sin(angle) * radius * shape
            if (i === 0) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
          context.closePath()
          context.stroke()
        }
        context.globalAlpha = 1
      }
      if (hero && !motion.matches) frame = requestAnimationFrame(draw)
    }

    function redraw() {
      cancelAnimationFrame(frame)
      if (!element || !context) return
      width = element.clientWidth
      height = element.clientHeight
      const ratio = Math.min(devicePixelRatio, 2)
      element.width = width * ratio
      element.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(performance.now())
    }

    const resize = new ResizeObserver(redraw)
    resize.observe(element)
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) redraw()
      else cancelAnimationFrame(frame)
    })
    visibility.observe(element)
    motion.addEventListener('change', redraw)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      visibility.disconnect()
      motion.removeEventListener('change', redraw)
    }
  }, [hero, variant])

  return <canvas ref={canvas} aria-hidden="true" />
}
