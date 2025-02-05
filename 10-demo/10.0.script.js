console.log(`
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  % Demo: Explainer %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `);

async function explain() {
  // Get the selected text from the page
  const selection = window.getSelection().toString();
  console.log("Selected Text", selection);
  const session = await ai.languageModel.create();
  const explainButton = document.getElementById("explain-button");

  console.log("Explaining...");
  explainButton.disabled = true;

  // Change button text to "Explaining..."
  document.getElementById("explain-button").textContent = "Explaining...";
  const before = Date.now();
  // Prompt the model and wait for the whole result to come back.
  const result = await session.prompt(
    `Explain the meaning of the following word or sentence: ${selection}. Return in html language format.`
  );
  console.log("Explanation: ", result);
  const after = Date.now();
  const duration = (after - before) / 1000;
  explainButton.textContent = "Explaination: (" + duration + "s)";
  // disable button

  // Add to rmenu div in a paragraph
  // create an html elemnt from the result
  const div = document.createElement("div");
  $(div).html(result);
  document.getElementById("rmenu").appendChild(div);
}

function hijackRighClick() {
  $(document).ready(function () {
    if ($("#content").addEventListener) {
      $("#content").addEventListener(
        "contextmenu",
        function (e) {
          alert("You've tried to open context menu"); //here you draw your own menu
          e.preventDefault();
        },
        false
      );
    } else {
      $("body").on("contextmenu", "#content", function () {
        //alert("contextmenu"+event);
        document.getElementById("rmenu").className = "show";
        document.getElementById("rmenu").style.top = mouseY(event) + "px";
        document.getElementById("rmenu").style.left = mouseX(event) + "px";

        window.event.returnValue = false;
      });
    }
  });

  // this is from another SO post...
  $(document).bind("click", function (event) {
    // if it's on the rmenu element, ignore the click
    if (event.target.id === "explain-button") return;

    document.getElementById("rmenu").className = "hide";
    // Clear the rmenu explain element
    const explainElement = document.querySelector("#rmenu div");

    if (explainElement) {
      explainElement.remove();
      const explainButton = document.getElementById("explain-button");
      explainButton.textContent = "Explain";
      explainButton.disabled = false;
    }
  });

  function mouseX(evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return (
        evt.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft)
      );
    } else {
      return null;
    }
  }

  function mouseY(evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return (
        evt.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop)
      );
    } else {
      return null;
    }
  }
}

hijackRighClick();
