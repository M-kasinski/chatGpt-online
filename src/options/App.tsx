import { CssBaseline, GeistProvider, Radio, Select, Text, useToasts } from '@geist-ui/core'
import { capitalize } from 'lodash-es'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import '../base.css'
import {
  Connect,
  getUserConfig,
  GptMainline,
  Language,
  NumberResults,
  Theme,
  TriggerMode,
  TRIGGER_MODE_TEXT,
  updateUserConfig,
} from '../config'
import logo from '../logo.png'
import { detectSystemColorScheme, getExtensionVersion } from '../utils'
import ProviderSelect from './ProviderSelect'

// eslint-disable-next-line no-unused-vars
function OptionsPage(props: { theme: Theme; onThemeChange: (theme: Theme) => void }) {
  const [triggerMode, setTriggerMode] = useState<TriggerMode>(TriggerMode.Always)
  const [language, setLanguage] = useState<Language>(Language.Auto)
  const [webConnected, setWebConnected] = useState(Connect.Online)
  const [mailine, setMainline] = useState(GptMainline.Sidebar)
  const [numberResults, setNumberResults] = useState(NumberResults.three)
  const { setToast } = useToasts()

  useEffect(() => {
    getUserConfig().then((config) => {
      setTriggerMode(config.triggerMode)
      setLanguage(config.language)
      setWebConnected(config.mode)
      setNumberResults(config.webResults)
      setMainline(config.gptMainline)
    })
  }, [])

  const onTriggerModeChange = useCallback(
    (mode: TriggerMode) => {
      setTriggerMode(mode)
      updateUserConfig({ triggerMode: mode })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onThemeChange = useCallback(
    (theme: Theme) => {
      updateUserConfig({ theme })
      props.onThemeChange(theme)
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [props, setToast],
  )

  const onOnlineChange = useCallback(
    (mode: Connect) => {
      setWebConnected(mode)
      updateUserConfig({ mode })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onMailineChange = useCallback(
    (gptMainline: GptMainline) => {
      setMainline(gptMainline)
      updateUserConfig({ gptMainline })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onNumResultsChange = useCallback(
    (res: NumberResults) => {
      setNumberResults(res)
      updateUserConfig({ webResults: res })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onLanguageChange = useCallback(
    (language: Language) => {
      updateUserConfig({ language })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  return (
    <div className="container mx-auto">
      <nav className="flex flex-row justify-between items-center mt-5 px-2">
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt={'logo'} className="w-10 h-10 rounded-lg" />
          <span className="font-semibold">
            ChatGPT Online for Google (v{getExtensionVersion()})
          </span>
        </div>
        <div className="flex flex-row gap-3">
          <a
            href="https://github.com/M-kasinski/chatGpt-online/issues"
            target="_blank"
            rel="noreferrer"
          >
            Feedback
          </a>
          <a href="https://github.com/M-kasinski/chatGpt-online" target="_blank" rel="noreferrer">
            Source code
          </a>
        </div>
      </nav>
      <div className="flex flex-row">
        <main className="w-[500px] mx-auto mt-14 mr-5">
          <Text h3 className="mt-5">
            Connected ChatGPT to the web (beta)
          </Text>
          <Radio.Group
            value={webConnected}
            onChange={(val) => onOnlineChange(val as Connect)}
            useRow
          >
            {Object.entries(Connect).map(([k, v]) => {
              return (
                <Radio key={v} value={v}>
                  {k}
                </Radio>
              )
            })}
          </Radio.Group>
          {webConnected === 'online' && (
            <>
              <Text h3 className="mt-5">
                Number of Results
              </Text>
              <Select
                value={numberResults}
                defaultValue={numberResults}
                placeholder="Choose one"
                onChange={(val) => onNumResultsChange(val as NumberResults)}
              >
                {Object.entries(NumberResults).map(([k, v]) => (
                  <Select.Option key={k} value={v}>
                    {v}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}
          <Text h3 className="mt-5">
            Chat GPT online in Google mainline
          </Text>
          <Radio.Group
            value={mailine}
            onChange={(val) => onMailineChange(val as GptMainline)}
            useRow
          >
            {Object.entries(GptMainline).map(([k, v]) => {
              return (
                <Radio key={v} value={v}>
                  {k}
                </Radio>
              )
            })}
          </Radio.Group>
          <Text h3 className="mt-5">
            Trigger Mode
          </Text>
          <Radio.Group
            value={triggerMode}
            onChange={(val) => onTriggerModeChange(val as TriggerMode)}
          >
            {Object.entries(TRIGGER_MODE_TEXT).map(([value, texts]) => {
              return (
                <Radio key={value} value={value}>
                  {texts.title}
                  <Radio.Description>{texts.desc}</Radio.Description>
                </Radio>
              )
            })}
          </Radio.Group>
        </main>
        <div className="w-[500px] mx-auto mt-14">
          <Text h3 className="mt-5">
            Theme
          </Text>
          <Radio.Group value={props.theme} onChange={(val) => onThemeChange(val as Theme)} useRow>
            {Object.entries(Theme).map(([k, v]) => {
              return (
                <Radio key={v} value={v}>
                  {k}
                </Radio>
              )
            })}
          </Radio.Group>
          <Text h3 className="mt-5 mb-0">
            Language
          </Text>
          <Text className="my-1">
            The language used in ChatGPT response. <span className="italic">Auto</span> is
            recommended.
          </Text>
          <Select
            value={language}
            placeholder="Choose one"
            onChange={(val) => onLanguageChange(val as Language)}
          >
            {Object.entries(Language).map(([k, v]) => (
              <Select.Option key={k} value={v}>
                {capitalize(v)}
              </Select.Option>
            ))}
          </Select>
          <Text h3 className="mt-5 mb-0">
            AI Provider
          </Text>
          <ProviderSelect />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(Theme.Auto)

  const themeType = useMemo(() => {
    if (theme === Theme.Auto) {
      return detectSystemColorScheme()
    }
    return theme
  }, [theme])

  useEffect(() => {
    getUserConfig().then((config) => setTheme(config.theme))
  }, [])

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <OptionsPage theme={theme} onThemeChange={setTheme} />
    </GeistProvider>
  )
}

export default App
