import { watch, onBeforeUnmount, type Ref } from 'vue'

export function useIntersectionLoad(
  elRef: Ref<HTMLElement | null>,
  callback: () => void,
  options = {}
) {
  let observer: IntersectionObserver | null = null

  watch(
    elRef,
    el => {
      if (!el) return

      observer?.disconnect()

      observer = new IntersectionObserver(([entry]:IntersectionObserverEntry[]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(el)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
