import Steppers from "./lib/steppers";

(async () => {
  try {
    const steppers = new Steppers(0x60);
    await steppers.Rotate(90);
    console.log("hi");
  } catch (err) {
    console.log("Fatal error:");
    console.log(err);
  }
})();