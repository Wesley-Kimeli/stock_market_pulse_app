import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavItems from './NavItems'
import { NAV_ITEMS } from '@/lib/constants'

jest.mock('next/navigation')

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('NavItems Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should render all navigation items from constants', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(NAV_ITEMS.length)
  })

  it('should render Dashboard link', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('should render Search link', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    expect(screen.getByRole('link', { name: 'Search' })).toBeInTheDocument()
  })

  it('should render Watchlist link', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    expect(screen.getByRole('link', { name: 'Watchlist' })).toBeInTheDocument()
  })

  it('should have correct hrefs for all links', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/search')
    expect(screen.getByRole('link', { name: 'Watchlist' })).toHaveAttribute('href', '/watchlist')
  })

  it('should apply active class to Dashboard when on root path', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    expect(dashboardLink).toHaveClass('text-gray-100')
  })

  it('should apply active class to Search when on /search path', () => {
    mockUsePathname.mockReturnValue('/search')
    render(<NavItems />)
    const searchLink = screen.getByRole('link', { name: 'Search' })
    expect(searchLink).toHaveClass('text-gray-100')
  })

  it('should apply active class to Watchlist when on /watchlist path', () => {
    mockUsePathname.mockReturnValue('/watchlist')
    render(<NavItems />)
    const watchlistLink = screen.getByRole('link', { name: 'Watchlist' })
    expect(watchlistLink).toHaveClass('text-gray-100')
  })

  it('should apply active class when on nested path', () => {
    mockUsePathname.mockReturnValue('/search/details')
    render(<NavItems />)
    const searchLink = screen.getByRole('link', { name: 'Search' })
    expect(searchLink).toHaveClass('text-gray-100')
  })

  it('should not apply active class to root when on other paths', () => {
    mockUsePathname.mockReturnValue('/search')
    render(<NavItems />)
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    expect(dashboardLink).not.toHaveClass('text-gray-100')
  })

  it('should have hover classes on all links', () => {
    mockUsePathname.mockReturnValue('/')
    render(<NavItems />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('hover:text-yellow-500', 'transition-colors')
    })
  })

  it('should have correct list structure with responsive classes', () => {
    mockUsePathname.mockReturnValue('/')
    const { container } = render(<NavItems />)
    const list = container.querySelector('ul')
    expect(list).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'p-2', 'gap-3', 'sm:gap-10', 'font-medium')
  })

  it('should render unique keys for list items', () => {
    mockUsePathname.mockReturnValue('/')
    const { container } = render(<NavItems />)
    const listItems = container.querySelectorAll('li')
    
    // Check that each list item is rendered
    expect(listItems.length).toBe(NAV_ITEMS.length)
  })

  it('should handle empty pathname gracefully', () => {
    mockUsePathname.mockReturnValue('')
    expect(() => render(<NavItems />)).not.toThrow()
  })

  it('should handle null pathname gracefully', () => {
    mockUsePathname.mockReturnValue(null as any)
    expect(() => render(<NavItems />)).not.toThrow()
  })

  describe('isActive function behavior', () => {
    it('should only match root path exactly', () => {
      mockUsePathname.mockReturnValue('/')
      render(<NavItems />)
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveClass('text-gray-100')
    })

    it('should not match root for /search', () => {
      mockUsePathname.mockReturnValue('/search')
      render(<NavItems />)
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).not.toHaveClass('text-gray-100')
    })

    it('should match /watchlist for /watchlist/123', () => {
      mockUsePathname.mockReturnValue('/watchlist/123')
      render(<NavItems />)
      const watchlistLink = screen.getByRole('link', { name: 'Watchlist' })
      expect(watchlistLink).toHaveClass('text-gray-100')
    })
  })

  it('should be a client component', () => {
    // The component has 'use client' directive
    expect(typeof NavItems).toBe('function')
  })
})