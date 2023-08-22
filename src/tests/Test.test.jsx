import { afterEach, describe, expect, it, vi } from "vitest";

function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

const messages = {
  items: [
    { message: "Simple test message", from: "Testman" },
    // ...
  ],
  getLatest,
};

describe("reading messages", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get the latest message with a spy", () => {
    // Create a spy on the getLatest function
    const spy = vi.spyOn(messages, "getLatest");
    // This line asserts that the name of the spy is "getLatest".
    expect(spy.getMockName()).toEqual("getLatest");

    // Assert that calling messages.getLatest() returns the last item in messages.items array
    // messages.getLatest() is the same as calling getLatest() because getLatest is a property of messages
    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1]
    );

    // Assert that the spy has been called once
    expect(spy).toHaveBeenCalledTimes(1);

    // Modify the implementation of the spy to return "access-restricted"
    // This will affect all future calls to the spy, including calls that have already been made
    spy.mockImplementationOnce(() => "access-restricted");
    // Assert that calling messages.getLatest() now returns "access-restricted"
    expect(messages.getLatest()).toEqual("access-restricted");

    // Assert that the spy has been called twice
    // The first call was on line 29, the second call was on line 39
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should get with a mock", () => {
    // Create a mock function with the same implementation as getLatest
    // This mock function will be called instead of getLatest
    const mock = vi.fn().mockImplementation(getLatest);

    // Assert that calling the mock function returns the last item in messages.items array
    // mock() is the same as calling getLatest() because mock is a function with the same implementation as getLatest
    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    // Assert that the mock function has been called once
    expect(mock).toHaveBeenCalledTimes(1);

    // Modify the implementation of the mock function to return "access-restricted"
    mock.mockImplementationOnce(() => "access-restricted");
    // Assert that calling the mock function now returns "access-restricted"
    expect(mock()).toEqual("access-restricted");

    // Assert that the mock function has been called twice
    expect(mock).toHaveBeenCalledTimes(2);

    // Assert that calling the mock function again returns the last item in messages.items array
    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    // Assert that the mock function has been called three times
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
