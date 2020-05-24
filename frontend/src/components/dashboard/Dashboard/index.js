import React from 'react'

import { ProjectsList } from 'components/projects/List'

import { Navbar } from './Navbar'

import './styles.scss'

export const Dashboard = props => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <ProjectsList />
    </div>
  )
}