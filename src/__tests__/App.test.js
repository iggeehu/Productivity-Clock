import { render, screen } from '@testing-library/react';
import App from '../components/App';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import Toggler from '../components/Toggler'

beforeEach(()=>{
  const wrapped = shallow(<App />)
})

it('has two toggle components', () => {
  
  expect(wrapped.find(Toggler).length).toEqual(2)
});

//two toggle components exist 
//the toggles change the number
//the timer runs when you hit play
//the timer pauses when you hit pause