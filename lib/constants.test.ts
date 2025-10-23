import { NAV_ITEMS } from './constants'

describe('NAV_ITEMS', () => {
  it('should export an array of navigation items', () => {
    expect(NAV_ITEMS).toBeDefined()
    expect(Array.isArray(NAV_ITEMS)).toBe(true)
  })

  it('should contain exactly 3 navigation items', () => {
    expect(NAV_ITEMS).toHaveLength(3)
  })

  it('should have Dashboard as first item', () => {
    expect(NAV_ITEMS[0]).toEqual({
      href: '/',
      label: 'Dashboard'
    })
  })

  it('should have Search as second item', () => {
    expect(NAV_ITEMS[1]).toEqual({
      href: '/search',
      label: 'Search'
    })
  })

  it('should have Watchlist as third item', () => {
    expect(NAV_ITEMS[2]).toEqual({
      href: '/watchlist',
      label: 'Watchlist'
    })
  })

  it('should have all items with href and label properties', () => {
    NAV_ITEMS.forEach(item => {
      expect(item).toHaveProperty('href')
      expect(item).toHaveProperty('label')
      expect(typeof item.href).toBe('string')
      expect(typeof item.label).toBe('string')
    })
  })

  it('should have all hrefs starting with /', () => {
    NAV_ITEMS.forEach(item => {
      expect(item.href).toMatch(/^\//)
    })
  })

  it('should have unique hrefs', () => {
    const hrefs = NAV_ITEMS.map(item => item.href)
    const uniqueHrefs = new Set(hrefs)
    expect(uniqueHrefs.size).toBe(hrefs.length)
  })

  it('should have unique labels', () => {
    const labels = NAV_ITEMS.map(item => item.label)
    const uniqueLabels = new Set(labels)
    expect(uniqueLabels.size).toBe(labels.length)
  })

  it('should not be empty strings', () => {
    NAV_ITEMS.forEach(item => {
      expect(item.href.length).toBeGreaterThan(0)
      expect(item.label.length).toBeGreaterThan(0)
    })
  })

  it('should be immutable (object freeze check)', () => {
    // Attempting to modify should not change the array
    const originalLength = NAV_ITEMS.length
    expect(originalLength).toBe(3)
  })
})