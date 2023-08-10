function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  const handleButtonClick = (message) => {
    alert(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />

      <button type="submit">Submit</button>
      <button
        type="button"
        onClick={() => handleButtonClick("Button 1 clicked!")}
      >
        Button 1
      </button>
      <button
        type="button"
        onClick={() => handleButtonClick("Button 2 clicked!")}
      >
        Button 2
      </button>
    </form>
  );
}

export default Form;
