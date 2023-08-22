function HamburgerIcon() {
  return (
    <div data-testid="hamburgerIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-testid="svgElement"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#018489"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </div>
  );
}

export default HamburgerIcon;
