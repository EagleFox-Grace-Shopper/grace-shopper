// //Categories
//   renders
//   works
// //search
//   renders
//   works
// //login, signup
//   renders
//   works
//   changes based on login status

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import {Navbar} from './navbar'
import {Provider} from 'react-redux'

describe('Navbar', () => {
  let nav
  let store

  beforeEach(() => {
    nav = shallow(<Navbar
      cats={
        [{id: 1, name: 'wacky'}, {id: 2, name: 'clothing'}, {id: 3, name: 'kitchen'}, {id: 4, name: 'stuff'}]
      } logOut={() => {}} isLoggedIn={true} />)
  })

  it('renders the store name in an h1', () => {
    expect(nav.contains(<h1 />))

    expect(nav.find('h1').text()).to.equal('EAGLEFOX SHOP')
  })

  it('renders the category names', () => {
    expect(nav.find('.dropdown-content').children().length).to.be.equal(4)
  })

  it('renders a search bar', () => {
    expect(nav.contains('#search'))
  })

  it('conditionally renders login/out links', () => {
    expect(nav.find('.userActions a').children().text()).to.be.equal('Logout')

    nav = shallow(<Navbar
      cats={
        [{id: 1, name: 'wacky'}, {id: 2, name: 'clothing'}, {id: 3, name: 'kitchen'}, {id: 4, name: 'stuff'}]
      } logOut={() => {}} isLoggedIn={false} />)

    expect(nav.find('.userActions').childAt(0).props().to).to.be.equal('/login')
  })
})
