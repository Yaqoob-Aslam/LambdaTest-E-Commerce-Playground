import type { APIRequestContext, APIResponse } from '@playwright/test';
import { AJAX_ROUTES } from '../constants';

/** JSON returned by `checkout/cart/add`. */
export interface AddToCartResponse {
  success?: string;
  total?: string;
  toast?: string;
}

/** JSON returned by coupon/voucher endpoints. */
export interface ErrorOrSuccessResponse {
  error?: string;
  success?: string;
}

/** JSON returned by `checkout/checkout/country`. */
export interface CountryResponse {
  country_id: string;
  name: string;
  iso_code_2: string;
  zone: Array<Record<string, string>>;
}

/**
 * Thin, typed facade over OpenCart's route endpoints.
 *
 * The application exposes no REST API: routes return server-rendered HTML and
 * AJAX endpoints return JSON fragments. This client wraps the subset the test
 * suite uses for fast setup/cleanup and contract checks.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private static url(route: string): string {
    return `/index.php?route=${route}`;
  }

  /** Generic GET for an arbitrary OpenCart route. */
  async getRoute(route: string, params?: Record<string, string>): Promise<APIResponse> {
    const query = params ? `&${new URLSearchParams(params).toString()}` : '';
    return this.request.get(`${ApiClient.url(route)}${query}`);
  }

  /** Generic form POST for an arbitrary OpenCart route. */
  async postRoute(route: string, form?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(ApiClient.url(route), { form });
  }

  // --- Cart -----------------------------------------------------------------

  async addToCart(productId: string, quantity = 1): Promise<APIResponse> {
    return this.postRoute(AJAX_ROUTES.cartAdd, { product_id: productId, quantity: String(quantity) });
  }

  async addToCartJson(productId: string, quantity = 1): Promise<AddToCartResponse> {
    const response = await this.addToCart(productId, quantity);
    return (await response.json()) as AddToCartResponse;
  }

  async getCartInfo(): Promise<APIResponse> {
    return this.request.get(ApiClient.url(AJAX_ROUTES.cartInfo));
  }

  // --- Product / compare ----------------------------------------------------

  async addToCompare(productId: string): Promise<APIResponse> {
    return this.postRoute(AJAX_ROUTES.compareAdd, { product_id: productId });
  }

  // --- Newsletter -----------------------------------------------------------

  async subscribeNewsletter(email: string): Promise<APIResponse> {
    return this.postRoute(AJAX_ROUTES.newsletterSubscribe, { email });
  }

  // --- Checkout -------------------------------------------------------------

  async countryLookup(countryId: string): Promise<APIResponse> {
    return this.getRoute(AJAX_ROUTES.countryLookup, { country_id: countryId });
  }

  async countryLookupJson(countryId: string): Promise<CountryResponse> {
    const response = await this.countryLookup(countryId);
    return (await response.json()) as CountryResponse;
  }

  async applyCoupon(code: string): Promise<APIResponse> {
    return this.postRoute(AJAX_ROUTES.coupon, { coupon: code });
  }

  async applyVoucher(code: string): Promise<APIResponse> {
    return this.postRoute(AJAX_ROUTES.voucher, { voucher: code });
  }
}
