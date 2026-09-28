/** A catalogue product. */
export interface Product {
  id: string;
  name: string;
  price: string;
}

/** A category listing and the expectations verified against it. */
export interface CategoryFixture {
  path: string;
  name: string;
  productCount: number;
  /** Summary text shown on page 2, e.g. "Showing 16 to 30 of 75". */
  pageTwoSummary: string;
  firstByNameAsc: string;
  firstByNameDesc: string;
  firstByPriceDesc: string;
  firstByPriceDescValue: string;
  firstByPriceAsc: string;
}

export interface ManufacturerFixture {
  id: string;
  name: string;
}

export interface SearchTerms {
  exact: string;
  partial: string;
  nonExistent: string;
  specialCharacters: string;
}

/** Shape of `data/products.json`. */
export interface ProductsData {
  products: Record<string, Product>;
  categories: Record<string, CategoryFixture>;
  manufacturers: Record<string, ManufacturerFixture>;
  searchTerms: SearchTerms;
}
