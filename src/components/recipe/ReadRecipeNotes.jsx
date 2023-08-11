function ReadRecipeNotes({ notes }) {
  return (
    <div className="mb-12">
      <div className="font-bold text-secondary text-xl mb-3">Notes:</div>
      <p className="font-semibold text-xl">{notes}</p>
    </div>
  );
}

export default ReadRecipeNotes;
