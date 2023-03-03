import { GearIcon, GlobeIcon } from '@primer/octicons-react'
import { useCallback } from 'react'
import useSWR from 'swr'
import Browser from 'webextension-polyfill'
import '../base.css'
import logo from '../logo.png'

function App() {
  const accessTokenQuery = useSWR(
    'accessToken',
    () => Browser.runtime.sendMessage({ type: 'GET_ACCESS_TOKEN' }),
    { shouldRetryOnError: false },
  )

  const openOptionsPage = useCallback(() => {
    Browser.runtime.sendMessage({ type: 'OPEN_OPTIONS_PAGE' })
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 flex flex-row items-center px-1">
        <img src={logo} className="w-10 h-10 rounded-sm" />
        <p className="text-xl font-semibold m-0 ml-1">ChatGPT Online for Google </p>
        <div className="grow" />
        <span className="cursor-pointer leading-[0]" onClick={openOptionsPage}>
          <GearIcon size={16} />
        </span>
      </div>
      {(() => {
        if (accessTokenQuery.isLoading) {
          return (
            <div className="grow justify-center items-center flex animate-bounce">
              <GlobeIcon size={24} />
            </div>
          )
        }
        if (accessTokenQuery.data) {
          return <iframe src="https://chat.openai.com" className="grow border-none" />
        }
        return (
          <div className="grow flex flex-col justify-center">
            <p className="text-base px-2 text-center">
              Please login and pass Cloudflare check at{' '}
              <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
                chat.openai.com
              </a>
            </p>
          </div>
        )
      })()}
    </div>
  )
}

export default App
