import { render } from 'preact'
import '../base.css'
import { Connect, getUserConfig, Language, Theme } from '../config'
import { detectSystemColorScheme } from '../utils'
import ChatGPTContainer from './ChatGPTContainer'
import { config, SearchEngine } from './search-engine-configs'
import './styles.scss'
import { getPossibleElementByQuerySelector } from './utils'

async function mount(
  question: string,
  siteConfig: SearchEngine,
  results: { organicResults: string; domains: [] },
) {
  const container = document.createElement('div')
  container.className = 'chat-gpt-container'

  const userConfig = await getUserConfig()
  let theme: Theme
  if (userConfig.theme === Theme.Auto) {
    theme = detectSystemColorScheme()
  } else {
    theme = userConfig.theme
  }
  if (theme === Theme.Dark) {
    container.classList.add('gpt-dark')
  } else {
    container.classList.add('gpt-light')
  }

  const siderbarContainer = getPossibleElementByQuerySelector(siteConfig.sidebarContainerQuery)
  if (siderbarContainer) {
    siderbarContainer.prepend(container)
  } else {
    container.classList.add('sidebar-free')
    const appendContainer = getPossibleElementByQuerySelector(siteConfig.appendContainerQuery)
    if (appendContainer) {
      appendContainer.appendChild(container)
    }
  }

  render(
    <ChatGPTContainer
      question={question}
      triggerMode={userConfig.triggerMode || 'always'}
      webResults={
        userConfig.mode === Connect.Online && results.organicResults !== ''
          ? results.organicResults
          : Connect.Offline
      }
      lang={userConfig.language}
      /*domains={userConfig.mode === Connect.Online && results.domains}*/
    />,
    container,
  )
}

const siteRegex = new RegExp(Object.keys(config).join('|'))
const siteName = location.hostname.match(siteRegex)![0]
const siteConfig = config[siteName]

const GoogleOrganicResults = (numberResults: string) => {
  const links: string | any[] = []
  const titles: string | any[] = []
  const snippets: string | any[] = []

  document.querySelectorAll('.yuRUbf > a').forEach((el, i) => {
    links[i] = el.getAttribute('href')
  })

  document.querySelectorAll('.yuRUbf > a > h3').forEach((el, i) => {
    titles[i] = el.textContent
  })

  // eslint-disable-next-line radix
  const IntNumberResult = parseInt(numberResults)

  document.querySelectorAll('span.aCOpRe > span, div.MUxGbd.yDYNvb').forEach((el, i) => {
    snippets[i] = el.textContent?.trim()
  })

  const domains = []
  const result = []
  for (let i = 0; i < IntNumberResult && i < links.length; i++) {
    result[i] = {
      title: titles[i],
      url: links[i],
      source: links[i],
      desc: snippets[i],
      _id: titles[i],
    }
    const url = new URL(links[i])
    domains[i] = url.hostname
  }

  return {
    domains,
    organicResults: result
      .map((item, index) => `[${index + 1}] "${item.desc}"\nURL: ${item.url}\n`)
      .join('\n'),
  }
}

async function run() {
  const searchInput = getPossibleElementByQuerySelector<HTMLInputElement>(siteConfig.inputQuery)
  if (searchInput && searchInput.value) {
    console.debug('Mount ChatGPT on', siteName)
    const userConfig = await getUserConfig()
    const searchValueWithLanguageOption =
      userConfig.language === Language.Auto
        ? searchInput.value
        : `${searchInput.value}(in ${userConfig.language})`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mount(searchValueWithLanguageOption, siteConfig, GoogleOrganicResults(userConfig.webResults))
  }
}

run()

if (siteConfig.watchRouteChange) {
  siteConfig.watchRouteChange(run)
}
