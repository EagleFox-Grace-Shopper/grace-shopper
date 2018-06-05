import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import db from './server/db'

const adapter = new Adapter()
enzyme.configure({ adapter })

beforeEach(() => {
  return db.sync({ force: true })
})
