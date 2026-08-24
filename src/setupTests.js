import "@testing-library/jest-dom";

export function mockMatchMedia(matchesByQuery = {}) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: matchesByQuery[query] ?? false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  mockMatchMedia();
});
