import type React from 'react'
import { useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

// SVG Rocket logo (inline to avoid external dependencies)
const RocketLogo = (): JSX.Element => (
  <img src='/logo.png' width={80} />
)

const styles = {
  // Layout
  container: {
    fontFamily: '"Inter", sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  header: {
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    padding: '40px 0 30px'
  },
  branding: {
    display: 'flex' as const,
    alignItems: 'center',
    marginBottom: '20px'
  },
  content: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto 40px',
    textAlign: 'center' as const
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    padding: '40px',
    width: '100%',
    marginTop: '30px'
  },
  // Typography
  title: {
    fontSize: '36px',
    fontWeight: 600,
    color: '#fb2645',
    margin: '0 0 0 12px'
  },
  subTitle: {
    fontSize: '22px',
    fontWeight: 500,
    color: '#333',
    margin: '0 0 24px 0'
  },
  text: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#555',
    margin: '0 0 24px 0'
  },
  link: {
    color: '#fb2645',
    textDecoration: 'none',
    fontWeight: 500
  },
  // Form elements
  inputGroup: {
    display: 'flex' as const,
    width: '100%',
    marginTop: '20px'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    borderRight: 'none',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    backgroundColor: '#fb2645',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    padding: '0 24px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  // Special states
  inputFocused: {
    borderColor: '#fb2645'
  },
  buttonHover: {
    backgroundColor: '#e51e3a'
  },
  footer: {
    marginTop: '40px',
    fontSize: '14px',
    color: '#999'
  },
  // Banner
  banner: {
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#000000',
    color: 'white',
    textAlign: 'center' as const,
    padding: '12px 20px',
    width: '100%',
    position: 'relative' as const,
    zIndex: 9999,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  bannerText: {
    margin: 0,
    fontSize: '15px',
    color: '#fb2645'
  },
  bannerLink: {
    color: '#fb2645',
    fontWeight: 600,
    textDecoration: 'underline'
  }
}

const App = (): JSX.Element => {
  // State to manage URL input
  const [inputUrl, setInputUrl] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)

  // Handle URL from query parameters
  const params = window.location.search
  const url = params.split('=').length > 1 ? decodeURIComponent(params.split('=')[1]) : ''

  // Navigate to URL when form is submitted
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (inputUrl.trim().length > 0) {
      window.location.href = `?url=${encodeURIComponent(inputUrl.trim())}`
    }
  }

  // Banner component that shows when URL is present
  const Banner = (): JSX.Element => (
    <div style={styles.banner}>
      <p style={styles.bannerText}>
        Powered by <a href="https://rocketapi.net" target="_blank" rel="noopener noreferrer" style={styles.bannerLink}>Rocket</a> - Build your backend with Rocket.
      </p>
    </div>
  )

  // If no URL parameter is provided, show the landing page
  if (url.length === 0) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <div style={styles.container}>
          <header style={styles.header}>
            <div style={styles.branding}>
              <RocketLogo />
              <h1 style={styles.title}>Rocket API</h1>
            </div>
          </header>

          <main style={styles.content}>
            <h2 style={styles.subTitle}>OpenAPI Documentation Viewer</h2>
            <p style={styles.text}>
              Visualize and explore your API documentation with our Swagger UI integration.
              Simply enter your OpenAPI schema URL below to get started.
            </p>

            <div style={styles.card}>
              <p style={styles.text}>Enter your OpenAPI schema URL:</p>

              <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                  <input
                    type="url"
                    placeholder="https://example.com/openapi.json"
                    value={inputUrl}
                    onChange={(e) => { setInputUrl(e.target.value) }}
                    onFocus={() => { setInputFocused(true) }}
                    onBlur={() => { setInputFocused(false) }}
                    style={{
                      ...styles.input,
                      ...(inputFocused ? styles.inputFocused : {})
                    }}
                  />
                  <button
                    type="submit"
                    onMouseEnter={() => { setButtonHovered(true) }}
                    onMouseLeave={() => { setButtonHovered(false) }}
                    style={{
                      ...styles.button,
                      ...(buttonHovered ? styles.buttonHover : {})
                    }}
                  >
                    View Docs
                  </button>
                </div>
              </form>
            </div>

            <footer style={styles.footer}>
              <p>
                Visit <a href="https://rocketapi.net" target="_blank" rel="noopener noreferrer" style={styles.link}>rocketapi.net</a> for information.
              </p>
              <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                Rocket - Build your backend with Rocket.
              </p>
            </footer>
          </main>
        </div>
      </div>
    )
  }

  // If URL is provided, show the Swagger UI with banner
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <Banner />
      <SwaggerUI url={url} />
    </div>
  )
}

export default App
