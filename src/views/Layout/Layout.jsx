import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Header/Header'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'
import './Layout.css'
import StatusBar from '../StatusBar/StatusBar'

const Layout = () => {
  return (
    <div className="layout">
      <Header className="layout__header" />
      <Content className="layout__content">
        <Outlet />
      </Content>
      <Footer className="layout__footer" />
      <StatusBar />
    </div>
  )
}

export default Layout