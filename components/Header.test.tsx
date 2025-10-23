import { render, screen } from '@testing-library/react'
import Header from './Header'

// Mock the child components
jest.mock('./NavItems', () => ({
  __esModule: true,
  default: () => <div data-testid="nav-items">NavItems</div>
}))

jest.mock('./UserDropdown', () => ({
  __esModule: true,
  default: () => <div data-testid="user-dropdown">UserDropdown</div>
}))

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render header with correct semantic HTML', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('should have sticky positioning class', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky', 'top-0', 'header')
  })

  it('should render logo link', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link')
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('should render logo image with correct attributes', () => {
    render(<Header />)
    const logoImage = screen.getByAltText('MarketPulse logo')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/assets/icons/logo.svg')
    expect(logoImage).toHaveAttribute('width', '140')
    expect(logoImage).toHaveAttribute('height', '32')
  })

  it('should render logo with correct CSS classes', () => {
    render(<Header />)
    const logoImage = screen.getByAltText('MarketPulse logo')
    expect(logoImage).toHaveClass('h-8', 'w-auto', 'cursor-pointer')
  })

  it('should render navigation with hidden class on mobile', () => {
    const { container } = render(<Header />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('hidden', 'sm:block')
  })

  it('should render NavItems component', () => {
    render(<Header />)
    expect(screen.getByTestId('nav-items')).toBeInTheDocument()
  })

  it('should render UserDropdown component', () => {
    render(<Header />)
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
  })

  it('should have container wrapper with correct classes', () => {
    const { container } = render(<Header />)
    const wrapper = container.querySelector('.container.header-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('should render all child elements in correct order', () => {
    const { container } = render(<Header />)
    const children = container.querySelector('.container')?.children
    expect(children).toHaveLength(3) // Link, nav, UserDropdown
  })

  it('should be accessible with proper landmark', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header.tagName).toBe('HEADER')
  })
})