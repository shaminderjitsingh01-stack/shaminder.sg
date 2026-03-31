'use client'

import { useEffect } from 'react'

export function useScrollAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      initMobile()
    } else {
      initDesktop()
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
}

// --- Mobile: lightweight, no GSAP ---
function initMobile() {
  const navbarWrapper = document.querySelector('[data-navbar-wrapper]') as HTMLElement
  const slidesContainer = document.querySelector('[data-slides-container]') as HTMLElement
  const slides = Array.from(document.querySelectorAll('[data-slide]')) as HTMLElement[]

  document.body.style.overflow = 'hidden'
  if (navbarWrapper) navbarWrapper.style.opacity = '1'
  if (slidesContainer) slidesContainer.style.pointerEvents = 'auto'

  if (slides.length < 2) return

  let currentSlide = 0
  let isAnimating = false

  // Position slides with CSS
  slides.forEach((slide, i) => {
    slide.style.position = 'absolute'
    slide.style.top = '0'
    slide.style.left = '0'
    slide.style.width = '100%'
    slide.style.height = '100%'
    slide.style.transform = i === 0 ? 'translateX(0)' : 'translateX(100%)'
    slide.style.transition = 'none'
  })

  const transitions = ['slide', 'fadeScale', 'vertical', 'flip', 'crossfadeBlur']
  const DURATION = 600

  function goToSlide(index: number) {
    if (index < 0 || index >= slides.length || index === currentSlide || isAnimating) return
    isAnimating = true

    const direction = index > currentSlide ? 1 : -1
    const outgoing = slides[currentSlide]
    const incoming = slides[index]
    const transitionIndex = direction > 0 ? currentSlide : index
    const type = transitions[transitionIndex % transitions.length] || 'slide'

    // Reset incoming scroll
    const incomingScroll = incoming.querySelector('.scrollbar-hide') as HTMLElement
    if (incomingScroll) incomingScroll.scrollTop = direction > 0 ? 0 : incomingScroll.scrollHeight

    // Reset all inline styles
    incoming.style.transition = 'none'
    incoming.style.opacity = '1'
    incoming.style.filter = 'none'

    switch (type) {
      case 'slide':
        incoming.style.transform = `translateX(${direction * 100}%)`
        incoming.offsetHeight
        outgoing.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`
        incoming.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`
        outgoing.style.transform = `translateX(${-direction * 100}%)`
        incoming.style.transform = 'translateX(0)'
        break

      case 'fadeScale':
        incoming.style.transform = 'scale(0.85)'
        incoming.style.opacity = '0'
        incoming.offsetHeight
        outgoing.style.transition = `transform ${DURATION}ms ease, opacity ${DURATION * 0.6}ms ease`
        incoming.style.transition = `transform ${DURATION}ms ease, opacity ${DURATION * 0.6}ms ease ${DURATION * 0.3}ms`
        outgoing.style.transform = 'scale(1.1)'
        outgoing.style.opacity = '0'
        incoming.style.transform = 'scale(1)'
        incoming.style.opacity = '1'
        break

      case 'vertical':
        incoming.style.transform = `translateY(${direction * 100}%)`
        incoming.offsetHeight
        outgoing.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`
        incoming.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`
        outgoing.style.transform = `translateY(${-direction * 100}%)`
        incoming.style.transform = 'translateY(0)'
        break

      case 'flip':
        if (slidesContainer) slidesContainer.style.perspective = '1200px'
        incoming.style.transform = `rotateY(${direction * 90}deg)`
        incoming.style.opacity = '0'
        incoming.offsetHeight
        outgoing.style.transition = `transform ${DURATION * 0.6}ms ease-in, opacity ${DURATION * 0.5}ms ease`
        incoming.style.transition = `transform ${DURATION * 0.6}ms ease-out ${DURATION * 0.3}ms, opacity ${DURATION * 0.4}ms ease ${DURATION * 0.4}ms`
        outgoing.style.transform = `rotateY(${-direction * 90}deg)`
        outgoing.style.opacity = '0'
        incoming.style.transform = 'rotateY(0deg)'
        incoming.style.opacity = '1'
        break

      case 'crossfadeBlur':
        incoming.style.transform = 'translateX(0)'
        incoming.style.opacity = '0'
        incoming.style.filter = 'blur(20px)'
        incoming.offsetHeight
        outgoing.style.transition = `opacity ${DURATION * 0.6}ms ease, filter ${DURATION * 0.6}ms ease`
        incoming.style.transition = `opacity ${DURATION * 0.6}ms ease ${DURATION * 0.3}ms, filter ${DURATION * 0.6}ms ease ${DURATION * 0.3}ms`
        outgoing.style.opacity = '0'
        outgoing.style.filter = 'blur(20px)'
        incoming.style.opacity = '1'
        incoming.style.filter = 'blur(0px)'
        break
    }

    setTimeout(() => {
      // Clean up outgoing
      outgoing.style.transition = 'none'
      outgoing.style.transform = `translateX(${direction * -100}%)`
      outgoing.style.opacity = '1'
      outgoing.style.filter = 'none'
      currentSlide = index
      isAnimating = false
    }, DURATION + 50)
  }

  // Touch handler
  let touchStartY = 0

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY
  }, { passive: true })

  window.addEventListener('touchend', (e) => {
    const deltaY = touchStartY - e.changedTouches[0].clientY
    if (Math.abs(deltaY) < 40) return
    if (isAnimating) return

    // Check inner scroll
    const slide = slides[currentSlide]
    const scrollable = slide?.querySelector('.scrollbar-hide') as HTMLElement
    if (scrollable) {
      const { scrollTop, scrollHeight, clientHeight } = scrollable
      const hasOverflow = scrollHeight > clientHeight + 5
      if (hasOverflow) {
        if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 1) return
        if (deltaY < 0 && scrollTop > 1) return
      }
    }

    if (deltaY > 0) goToSlide(currentSlide + 1)
    else goToSlide(currentSlide - 1)
  }, { passive: true })
}

// --- Desktop: full GSAP experience ---
async function initDesktop() {
  const gsapModule = await import('gsap')
  const gsap = gsapModule.default

  const preloader = document.querySelector('[data-preloader]') as HTMLElement
  const preloaderTrack = document.querySelector('[data-preloader-track]') as HTMLElement
  const preloaderVideo = document.querySelector('[data-preloader-video]') as HTMLVideoElement
  const navbarWrapper = document.querySelector('[data-navbar-wrapper]') as HTMLElement
  const slidesContainer = document.querySelector('[data-slides-container]') as HTMLElement

  document.body.style.overflow = 'hidden'
  if (preloaderTrack) preloaderTrack.style.display = 'none'

  let phase: 'preloader' | 'slides' = preloader && preloaderVideo ? 'preloader' : 'slides'
  let preloaderProgress = 0
  let currentSlide = 0
  let isAnimating = false

  if (phase === 'slides') {
    if (preloader) preloader.style.display = 'none'
    if (slidesContainer) slidesContainer.style.pointerEvents = 'auto'
    if (navbarWrapper) {
      navbarWrapper.style.opacity = '1'
      gsap.set(navbarWrapper, { opacity: 1 })
    }
  } else {
    if (preloaderVideo) preloaderVideo.pause()
    if (slidesContainer) slidesContainer.style.pointerEvents = 'none'
  }

  // --- Preloader ---
  function updatePreloader(delta: number) {
    if (phase !== 'preloader' || !preloaderVideo) return

    preloaderProgress += delta * 0.0003
    preloaderProgress = Math.max(0, Math.min(1, preloaderProgress))

    if (preloaderVideo.duration) {
      const videoProgress = Math.min(preloaderProgress / 0.7, 1)
      preloaderVideo.currentTime = videoProgress * preloaderVideo.duration
    }

    if (preloaderProgress < 0.7) {
      gsap.set(preloaderVideo, { scale: 1, filter: 'none' })
    } else if (preloaderProgress < 0.9) {
      const t = (preloaderProgress - 0.7) / 0.2
      const scale = 1 + t * 9
      const blur = t * 40
      const brightness = 1 + t * 4
      gsap.set(preloaderVideo, { scale, filter: `blur(${blur}px) brightness(${brightness})` })
    } else {
      const t = (preloaderProgress - 0.9) / 0.1
      gsap.set(preloader, { opacity: 1 - t })
    }

    if (preloaderProgress >= 1) {
      phase = 'slides'
      preloader.style.display = 'none'
      if (slidesContainer) slidesContainer.style.pointerEvents = 'auto'
      if (navbarWrapper) {
        gsap.to(navbarWrapper, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      }
    }
  }

  // --- Slides ---
  const slides = gsap.utils.toArray<HTMLElement>('[data-slide]')

  slides.forEach((slide, i) => {
    gsap.set(slide, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      xPercent: i === 0 ? 0 : 100,
    })
  })

  const transitions = ['slide', 'fadeScale', 'vertical', 'flip', 'crossfadeBlur']

  function goToSlide(index: number) {
    if (index < 0 || index >= slides.length || index === currentSlide || isAnimating) return
    isAnimating = true

    const direction = index > currentSlide ? 1 : -1
    const outgoing = slides[currentSlide]
    const incoming = slides[index]
    const transitionIndex = direction > 0 ? currentSlide : index
    const type = transitions[transitionIndex % transitions.length] || 'slide'

    const incomingScroll = incoming.querySelector('.scrollbar-hide') as HTMLElement
    if (incomingScroll) incomingScroll.scrollTop = direction > 0 ? 0 : incomingScroll.scrollHeight

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outgoing, { clearProps: 'filter,scale,opacity,rotationY' })
        gsap.set(outgoing, { xPercent: direction * -100, yPercent: 0 })
        currentSlide = index
        isAnimating = false
      },
    })

    switch (type) {
      case 'slide':
        gsap.set(incoming, { xPercent: direction * 100, yPercent: 0, scale: 1, opacity: 1, rotationY: 0, filter: 'none' })
        tl.to(outgoing, { xPercent: -direction * 100, duration: 0.7, ease: 'power2.inOut' })
          .to(incoming, { xPercent: 0, duration: 0.7, ease: 'power2.inOut' }, '<')
        break
      case 'fadeScale':
        gsap.set(incoming, { xPercent: 0, yPercent: 0, scale: 0.8, opacity: 0, rotationY: 0, filter: 'none' })
        tl.to(outgoing, { scale: 1.1, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(incoming, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        break
      case 'vertical':
        gsap.set(incoming, { xPercent: 0, yPercent: direction * 100, scale: 1, opacity: 1, rotationY: 0, filter: 'none' })
        tl.to(outgoing, { yPercent: -direction * 100, duration: 0.7, ease: 'power2.inOut' })
          .to(incoming, { yPercent: 0, duration: 0.7, ease: 'power2.inOut' }, '<')
        break
      case 'flip':
        gsap.set(incoming, { xPercent: 0, yPercent: 0, scale: 1, opacity: 0, rotationY: direction * 90, filter: 'none' })
        if (slidesContainer) gsap.set(slidesContainer, { perspective: 1200 })
        tl.to(outgoing, { rotationY: -direction * 90, opacity: 0, duration: 0.4, ease: 'power2.in' })
          .to(incoming, { rotationY: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        break
      case 'crossfadeBlur':
        gsap.set(incoming, { xPercent: 0, yPercent: 0, scale: 1, opacity: 0, rotationY: 0, filter: 'blur(20px)' })
        tl.to(outgoing, { filter: 'blur(20px)', opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(incoming, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        break
    }
  }

  // --- Wheel handler ---
  let transitionAccumulator = 0
  const TRANSITION_THRESHOLD = 400
  let lastDirection = 0
  let dwellTimeout: ReturnType<typeof setTimeout>

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()

    if (phase === 'preloader') {
      updatePreloader(e.deltaY)
      return
    }

    if (isAnimating) return

    if (e.deltaY < 0 && currentSlide === 0 && preloader && preloaderVideo) {
      phase = 'preloader'
      preloaderProgress = 0.65
      preloader.style.display = 'flex'
      gsap.set(preloader, { opacity: 1 })
      gsap.set(preloaderVideo, { scale: 1, filter: 'none' })
      if (slidesContainer) slidesContainer.style.pointerEvents = 'none'
      if (navbarWrapper) gsap.set(navbarWrapper, { opacity: 0 })
      updatePreloader(e.deltaY)
      return
    }

    const slide = slides[currentSlide]
    const scrollable = slide?.querySelector('.scrollbar-hide') as HTMLElement
    if (scrollable) {
      const { scrollTop, scrollHeight, clientHeight } = scrollable
      const hasOverflow = scrollHeight > clientHeight + 5
      if (hasOverflow) {
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 1) {
          scrollable.scrollTop += Math.min(e.deltaY, 100)
          transitionAccumulator = 0
          return
        }
        if (e.deltaY < 0 && scrollTop > 1) {
          scrollable.scrollTop += Math.max(e.deltaY, -100)
          transitionAccumulator = 0
          return
        }
      }
    }

    const direction = e.deltaY > 0 ? 1 : -1
    if (direction !== lastDirection) {
      transitionAccumulator = 0
      lastDirection = direction
    }

    transitionAccumulator += Math.abs(e.deltaY)

    clearTimeout(dwellTimeout)
    dwellTimeout = setTimeout(() => { transitionAccumulator = 0 }, 500)

    if (transitionAccumulator >= TRANSITION_THRESHOLD) {
      transitionAccumulator = 0
      if (direction > 0) goToSlide(currentSlide + 1)
      else goToSlide(currentSlide - 1)
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (phase !== 'slides' || isAnimating) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      goToSlide(currentSlide + 1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      goToSlide(currentSlide - 1)
    }
  }

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeydown)
}
