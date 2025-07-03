function startHomeAnimation() {
  const words = ["Build", "Create", "Design", "Code"];
  const colors = ["#151FDF", "#B40158", "#A33089", "#680993"];
  const text = document.querySelector("#home .text");
  if (!text) return;
  let currentIndex = 0;

  function printChar(word, colorIndex) {
    let i = 0;
    text.style.color = colors[colorIndex];
    text.textContent = "";
    let typeInterval = setInterval(() => {
      if (i >= word.length) {
        clearInterval(typeInterval);
        setTimeout(() => deleteChar(word, colorIndex), 1000);
      } else {
        text.textContent += word[i];
        i++;
      }
    }, 120);
  }

  function deleteChar(word) {
    let i = word.length;
    let deleteInterval = setInterval(() => {
      if (i <= 0) {
        clearInterval(deleteInterval);
        currentIndex = (currentIndex + 1) % words.length;
        setTimeout(() => printChar(words[currentIndex], currentIndex), 400);
      } else {
        text.textContent = text.textContent.substring(0, i - 1);
        i--;
      }
    }, 60);
  }

  printChar(words[currentIndex], currentIndex);
}