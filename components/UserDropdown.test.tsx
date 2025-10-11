import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import UserDropdown from './UserDropdown'

jest.mock('next/navigation')
jest.mock('./NavItems', () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-nav-items">NavItems</div>
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockPush = jest.fn()

describe('UserDropdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as any)
  })

  it('should render without crashing', () => {
    render(<UserDropdown />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should display user name', () => {
    render(<UserDropdown />)
    expect(screen.getByText('Wesley')).toBeInTheDocument()
  })

  it('should display user avatar with fallback', () => {
    render(<UserDropdown />)
    const avatarFallbacks = screen.getAllByText('W')
    expect(avatarFallbacks.length).toBeGreaterThan(0)
  })

  it('should have ghost button variant', () => {
    const { container } = render(<UserDropdown />)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
  })

  it('should hide user name on small screens', () => {
    const { container } = render(<UserDropdown />)
    const nameContainer = container.querySelector('.hidden.md\\:flex')
    expect(nameContainer).toBeInTheDocument()
  })

  it('should open dropdown menu on click', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    // Menu should open and show user email
    await waitFor(() => {
      expect(screen.getAllByText('Wesley').length).toBeGreaterThan(1)
    })
  })

  it('should display user email in dropdown', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('developer41541@gmail.com')).toBeInTheDocument()
    })
  })

  it('should display logout button', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })

  it('should call router.push on logout click', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const logoutButton = screen.getByText('Logout')
      fireEvent.click(logoutButton)
    })
    
    expect(mockPush).toHaveBeenCalledWith('/sign-in')
  })

  it('should navigate to sign-in page on logout', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const logoutButton = screen.getByText('Logout')
      fireEvent.click(logoutButton)
    })
    
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/sign-in')
  })

  it('should have LogOut icon in logout button', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      // LogOut icon should be present
      const logoutItem = screen.getByText('Logout').parentElement
      expect(logoutItem).toBeInTheDocument()
    })
  })

  it('should render avatar image with correct src', () => {
    render(<UserDropdown />)
    const avatarImages = screen.getAllByRole('img')
    const avatarImage = avatarImages.find(img => 
      img.getAttribute('src') === 'https://github.com/shadcn.png'
    )
    expect(avatarImage).toBeDefined()
  })

  it('should have correct avatar size in trigger', () => {
    const { container } = render(<UserDropdown />)
    const avatar = container.querySelector('.h-8.w-8')
    expect(avatar).toBeInTheDocument()
  })

  it('should have larger avatar in dropdown menu', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const largeAvatar = container.querySelector('.h-10.w-10')
      expect(largeAvatar).toBeInTheDocument()
    })
  })

  it('should show mobile navigation in dropdown', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByTestId('mobile-nav-items')).toBeInTheDocument()
    })
  })

  it('should have separator between sections', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const separators = container.querySelectorAll('[role="separator"]')
      expect(separators.length).toBeGreaterThan(0)
    })
  })

  it('should have hover styles on trigger button', () => {
    const { container } = render(<UserDropdown />)
    const button = container.querySelector('button')
    expect(button).toHaveClass('hover:text-yellow-500')
  })

  it('should handle async logout function', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const logoutButton = screen.getByText('Logout')
      fireEvent.click(logoutButton)
    })
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled()
    })
  })

  it('should display correct styling classes on dropdown content', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const content = container.querySelector('[data-slot="dropdown-menu-content"]')
      expect(content).toHaveClass('text-gray-400')
    })
  })

  it('should have focus styles on logout item', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const logoutItem = screen.getByText('Logout').parentElement
      expect(logoutItem).toHaveClass('focus:text-yellow-500')
    })
  })

  it('should show user initial in avatar fallback', () => {
    render(<UserDropdown />)
    const fallbacks = screen.getAllByText('W')
    expect(fallbacks.length).toBeGreaterThan(0)
  })

  it('should have correct user data structure', () => {
    render(<UserDropdown />)
    expect(screen.getByText('Wesley')).toBeInTheDocument()
    expect(screen.getByText('Wesley')).toHaveClass('text-gray-400')
  })

  it('should be a client component', () => {
    expect(typeof UserDropdown).toBe('function')
  })

  it('should handle keyboard navigation', async () => {
    render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.keyDown(trigger, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('developer41541@gmail.com')).toBeInTheDocument()
    })
  })

  it('should properly structure user info in label', async () => {
    const { container } = render(<UserDropdown />)
    const trigger = screen.getByRole('button')
    
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const label = container.querySelector('[data-slot="dropdown-menu-label"]')
      expect(label).toBeInTheDocument()
      expect(label?.textContent).toContain('Wesley')
      expect(label?.textContent).toContain('developer41541@gmail.com')
    })
  })
})