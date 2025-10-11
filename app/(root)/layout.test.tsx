import { render, screen } from '@testing-library/react'
import Layout from './layout'

jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: () => <header data-testid="header">Header</header>
}))

describe('Layout Component', () => {
  const mockChildren = <div data-testid="test-children">Test Content</div>

  it('should render without crashing', () => {
    render(<Layout>{mockChildren}</Layout>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should render Header component', () => {
    render(<Layout>{mockChildren}</Layout>)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('should render children content', () => {
    render(<Layout>{mockChildren}</Layout>)
    expect(screen.getByTestId('test-children')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should have correct main element classes', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen', 'text-gray-400')
  })

  it('should wrap children in container with padding', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const contentWrapper = container.querySelector('.container.py-10')
    expect(contentWrapper).toBeInTheDocument()
  })

  it('should render Header before children', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    const firstChild = main?.firstChild
    
    expect(firstChild).toHaveAttribute('data-testid', 'header')
  })

  it('should use semantic main element', () => {
    render(<Layout>{mockChildren}</Layout>)
    const main = screen.getByRole('main')
    expect(main.tagName).toBe('MAIN')
  })

  it('should render multiple children correctly', () => {
    render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Layout>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('should render with null children', () => {
    expect(() => render(<Layout>{null}</Layout>)).not.toThrow()
  })

  it('should render with undefined children', () => {
    expect(() => render(<Layout>{undefined}</Layout>)).not.toThrow()
  })

  it('should accept React.ReactNode as children', () => {
    const complexChild = (
      <>
        <h1>Title</h1>
        <p>Paragraph</p>
        <ul>
          <li>Item 1</li>
        </ul>
      </>
    )
    render(<Layout>{complexChild}</Layout>)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('should maintain proper DOM structure', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    expect(main?.children).toHaveLength(2) // Header and container div
  })

  it('should be accessible with proper landmarks', () => {
    render(<Layout>{mockChildren}</Layout>)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should apply container class for responsive width', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const contentContainer = container.querySelector('.container')
    expect(contentContainer).toBeInTheDocument()
  })

  it('should have py-10 padding on content container', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const contentContainer = container.querySelector('.py-10')
    expect(contentContainer).toBeInTheDocument()
  })
})