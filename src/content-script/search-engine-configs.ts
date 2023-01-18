export interface SearchEngine {
  inputQuery: string[]
  sidebarContainerQuery: string[]
  appendContainerQuery: string[]
  watchRouteChange?: (callback: () => void) => void
}

export const config: Record<string, SearchEngine> = {
  qwant: {
    inputQuery: ["[name='q']"],
    sidebarContainerQuery: ['.is-sidebar'],
    appendContainerQuery: [],
    watchRouteChange(callback) {
      const targetNode = document.querySelector('#root')!
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function (node) {
              if (
                'className' in node &&
                typeof node.className === 'string' &&
                node.className.includes('is-sidebar')
              ) {
                callback()
              }
            })
          }
        }
      })
      const config = { attributes: true, childList: true, subtree: true }
      observer.observe(targetNode, config)
    },
  },
}
