/** Sort options exposed by the category/search "Sort By" control. */
export const SORT_OPTIONS = {
  default: 'Default',
  bestSellers: 'Best sellers',
  popular: 'Popular',
  newest: 'Newest',
  nameAsc: 'Name (A - Z)',
  nameDesc: 'Name (Z - A)',
  priceAsc: 'Price (Low > High)',
  priceDesc: 'Price (High > Low)',
  ratingHighest: 'Rating (Highest)',
  ratingLowest: 'Rating (Lowest)',
  modelAsc: 'Model (A - Z)',
  modelDesc: 'Model (Z - A)',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

/** "Show" (page size) values exposed by the listing limit control. */
export const SHOW_LIMITS = {
  fifteen: '15',
  twentyFive: '25',
  fifty: '50',
  seventyFive: '75',
  hundred: '100',
} as const;

export type ShowLimit = (typeof SHOW_LIMITS)[keyof typeof SHOW_LIMITS];

/**
 * Viewports used by responsive checks. Mirrors the breakpoints the theme
 * targets (desktop / tablet / mobile).
 */
export const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 820, height: 1180 },
  mobile: { width: 390, height: 844 },
} as const;

export type ViewportName = keyof typeof VIEWPORTS;
