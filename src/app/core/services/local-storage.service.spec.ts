import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("setItem", () => {
    it("should store an item in localStorage", () => {
      const key = "testKey";
      const value = "testValue";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      service.setItem(key, value as any);

      expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
    });
  });

  describe("getItem", () => {
    it("should retrieve an item from localStorage", () => {
      const key = "testKey";
      const value = "testValue";

      localStorage.setItem(key, JSON.stringify(value));

      const result = service.getItem(key);

      expect(result).toEqual(value);
    });

    it("should return null if item does not exist", () => {
      const key = "nonExistentKey";

      const result = service.getItem(key);

      expect(result).toBeNull();
    });
  });
});
