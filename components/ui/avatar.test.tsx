import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('should render without crashing', () => {
      const { container } = render(<Avatar />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have correct base classes', () => {
      const { container } = render(<Avatar />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full')
    })

    it('should accept custom className', () => {
      const { container } = render(<Avatar className="custom-class" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('custom-class')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<Avatar />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveAttribute('data-slot', 'avatar')
    })

    it('should render children', () => {
      render(
        <Avatar>
          <div data-testid="avatar-child">Child</div>
        </Avatar>
      )
      expect(screen.getByTestId('avatar-child')).toBeInTheDocument()
    })

    it('should forward additional props', () => {
      const { container } = render(<Avatar data-testid="test-avatar" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveAttribute('data-testid', 'test-avatar')
    })

    it('should have default size class', () => {
      const { container } = render(<Avatar />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('size-8')
    })

    it('should merge custom classes with base classes', () => {
      const { container } = render(<Avatar className="h-12 w-12" />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('rounded-full')
      expect(avatar).toHaveClass('h-12')
    })
  })

  describe('AvatarImage', () => {
    it('should render without crashing', () => {
      const { container } = render(<AvatarImage src="test.jpg" />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have correct base classes', () => {
      const { container } = render(<AvatarImage src="test.jpg" />)
      const image = container.firstChild as HTMLElement
      expect(image).toHaveClass('aspect-square', 'size-full')
    })

    it('should accept src prop', () => {
      const { container } = render(<AvatarImage src="https://example.com/avatar.jpg" />)
      const image = container.firstChild as HTMLElement
      expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('should accept alt prop', () => {
      const { container } = render(<AvatarImage src="test.jpg" alt="User Avatar" />)
      const image = container.firstChild as HTMLElement
      expect(image).toHaveAttribute('alt', 'User Avatar')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<AvatarImage src="test.jpg" />)
      const image = container.firstChild as HTMLElement
      expect(image).toHaveAttribute('data-slot', 'avatar-image')
    })

    it('should accept custom className', () => {
      const { container } = render(<AvatarImage src="test.jpg" className="custom-image" />)
      const image = container.firstChild as HTMLElement
      expect(image).toHaveClass('custom-image')
    })
  })

  describe('AvatarFallback', () => {
    it('should render without crashing', () => {
      const { container } = render(<AvatarFallback>AB</AvatarFallback>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should display fallback text', () => {
      render(<AvatarFallback>AB</AvatarFallback>)
      expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('should have correct base classes', () => {
      const { container } = render(<AvatarFallback>AB</AvatarFallback>)
      const fallback = container.firstChild as HTMLElement
      expect(fallback).toHaveClass('flex', 'size-full', 'items-center', 'justify-center', 'rounded-full')
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<AvatarFallback>AB</AvatarFallback>)
      const fallback = container.firstChild as HTMLElement
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback')
    })

    it('should accept custom className', () => {
      const { container } = render(<AvatarFallback className="bg-blue-500">AB</AvatarFallback>)
      const fallback = container.firstChild as HTMLElement
      expect(fallback).toHaveClass('bg-blue-500')
    })

    it('should render single initial', () => {
      render(<AvatarFallback>J</AvatarFallback>)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should render emoji', () => {
      render(<AvatarFallback>👤</AvatarFallback>)
      expect(screen.getByText('👤')).toBeInTheDocument()
    })
  })

  describe('Avatar Integration', () => {
    it('should render complete avatar with image', () => {
      render(
        <Avatar>
          <AvatarImage src="https://example.com/user.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
      
      const image = screen.getByAltText('John Doe')
      expect(image).toBeInTheDocument()
    })

    it('should show fallback when image fails', () => {
      render(
        <Avatar>
          <AvatarImage src="invalid-url.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
      
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should work with custom styling', () => {
      const { container } = render(
        <Avatar className="h-16 w-16">
          <AvatarImage src="test.jpg" className="object-cover" />
          <AvatarFallback className="bg-yellow-500 text-white">AB</AvatarFallback>
        </Avatar>
      )
      
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toHaveClass('h-16', 'w-16')
    })
  })
})