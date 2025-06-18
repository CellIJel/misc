async function fetchDefinition() {
  const word = document.getElementById("wordInput").value;
  if (word.length === 0) {
    document.getElementById("definition").innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.length > 0) {
      const definition = data[0].meanings[0].definitions[0].definition;
      document.getElementById(
        "definition"
      ).innerHTML = `<strong>${word}:</strong> ${definition}`;
    } else {
      document.getElementById(
        "definition"
      ).innerHTML = `<strong>${word}:</strong> No definition found.`;
    }
  } else {
    document.getElementById(
      "definition"
    ).innerHTML = `<strong>${word}:</strong> No definition found.`;
  }
}
