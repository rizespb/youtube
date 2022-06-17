import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import Header from './components/header/'
import Sidebar from './components/sidebar/'
import HomeScreen from './screens/homeScreen/'
import LoginScreen from './screens/loginScreen/LoginScreen'

import './_app.scss'
import { useEffect } from 'react'
import WatchScreen from './screens/watchScreen/WatchScreen'

const Layout = ({ children }) => {
  // Показываем/скрываем sidebar на маленьких экранах
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const handleToggleSidebar = () => setIsSidebarVisible((prev) => !prev)

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar isVisible={isSidebarVisible} handleToggleSidebar={handleToggleSidebar} />

        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  )
}

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth)

  const history = useHistory()

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth')
    }
  }, [accessToken, loading, history])

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

      <Route path="/auth">
        <LoginScreen />
      </Route>

      <Route path="/search">
        <Layout>
          <h1>Search results</h1>
        </Layout>
      </Route>

      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default App
