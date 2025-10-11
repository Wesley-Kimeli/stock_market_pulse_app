import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page Component', () => {
  it('should render without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should display "Home" text', () => {
    render(<Home />)
    const homeText = screen.getByText('Home')
    expect(homeText).toBeInTheDocument()
  })

  it('should have correct wrapper classes', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('.flex.min-h-screen.home-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('should have flex layout', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('div')
    expect(wrapper).toHaveClass('flex')
  })

  it('should have min-h-screen for full viewport height', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('div')
    expect(wrapper).toHaveClass('min-h-screen')
  })

  it('should have home-wrapper class', () => {
    const { container } = render(<Home />)
    const wrapper = container.querySelector('div')
    expect(wrapper).toHaveClass('home-wrapper')
  })

  it('should render as a valid React component', () => {
    expect(typeof Home).toBe('function')
  })

  it('should have proper DOM structure', () => {
    const { container } = render(<Home />)
    const wrapper = container.firstChild
    expect(wrapper).toBeTruthy()
    expect(wrapper?.textContent).toContain('Home')
  })

  it('should not throw errors during render', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('should be a server component (default export)', () => {
    expect(Home).toBeDefined()
    expect(typeof Home).toBe('function')
  })
})