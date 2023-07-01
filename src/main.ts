import "./style.css";
import TypeWritter from "./typewriter";

const typewriter = new TypeWritter(document.body, {
  loop: true,
  typingSpeed: 10,
  deletingSpeed: 10,
});

typewriter
  .typeString("\n\nWhere do I Start?")
  .pauseFor(1000)
  .typeString("\nFunctio")
  .deleteChars(7)
  .typeString("\nconst temp")
  .pauseFor(1000)
  .deleteAll(10)
  .typeString("\n\nWhy is this so hard?")
  .pauseFor(1000)
  .typeString("\n\nDoes everyone struggle this much?")
  .pauseFor(1000)
  .typeString("\n\nThere has to be an easier way")
  .pauseFor(1000)
  .deleteAll(10)
  .start();
