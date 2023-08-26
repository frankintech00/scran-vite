/**
 * Renders a loading component that displays a loading message and a spinner.
 *
 * @returns {JSX.Element} The loading component.
 */
function Loading() {
  return (
    <>
      <div>
        Loading...
        <span
          className="loading loading-spinner loading-lg mt-8"
          data-testid="loading-spinner"
        ></span>
      </div>
    </>
  );
}

export default Loading;
