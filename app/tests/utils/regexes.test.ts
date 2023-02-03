import REGEXES from "~/utils/regexes";

describe("Regexes", () => {
  it("should verify the structure of an email", () => {
    expect(REGEXES.EMAIL.test("johndoe@gmail.com")).toBe(true);
    expect(REGEXES.EMAIL.test("www.google.ro")).toBe(false);
  });

  it("should verify the structure of an url", () => {
    expect(REGEXES.URL.test("https://www.google.ro")).toBe(true);
    expect(REGEXES.URL.test("http://www.google.ro")).toBe(true);
    expect(REGEXES.URL.test("www.google.ro")).toBe(false);
    expect(REGEXES.URL.test("johndoe@gmail.com")).toBe(false);
  });
});
