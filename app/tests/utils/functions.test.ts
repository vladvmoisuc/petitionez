import { waitFor, replace, getText, getError, getLog } from "~/utils/functions";

describe("waitFor", () => {
  it("should wait for a period of time before resolving", () => {
    const result = waitFor();

    jest.advanceTimersByTime(500);

    return expect(result).resolves.toBe(undefined);
  });
});

describe("replace", () => {
  it("should replace text variables with the matching values from the source", () => {
    expect(
      replace(
        {
          fname: "John",
          lname: "Doe",
        },
        "{{fname}} {{lname}} was here."
      )
    ).toBe("John Doe was here.");
  });

  it("should return the original text when no variable is matched", () => {
    expect(
      replace(
        {
          fname: "John",
          lname: "Doe",
        },
        "{{name}} was here."
      )
    ).toBe("{{name}} was here.");
  });

  it("should return the original text when it doesn't contain any variable", () => {
    expect(
      replace(
        {
          fname: "John",
          lname: "Doe",
        },
        "Nothing."
      )
    ).toBe("Nothing.");
  });
});

describe("getText", () => {
  it("should extract copy and replace variables", () => {
    expect(getText("jest", { name: "John", date: "01/01/2000" })).toBe(
      "Copy tested by by John on 01/01/2000."
    );
  });
});

describe("getError", () => {
  it("should extract errors and replace variables", () => {
    expect(getError("jest", { name: "John", date: "01/01/2000" })).toBe(
      "Errors tested by by John on 01/01/2000."
    );
  });
});

describe("getLog", () => {
  it("should extract logs and replace variables", () => {
    expect(getLog("jest", { name: "John", date: "01/01/2000" })).toBe(
      "Logs tested by by John on 01/01/2000."
    );
  });
});
