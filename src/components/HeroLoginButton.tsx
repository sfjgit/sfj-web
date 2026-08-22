import { CiLogin } from "react-icons/ci";

// Sits at the top-right of whatever hero the current page renders, just below
// the fixed navbar. Rendered once globally rather than added to each hero, so
// every page gets it in the same place without touching a dozen components.
//
// Deliberately inert: no onClick, no href, no dialog. Clicking it does
// nothing. Wiring goes here when there is somewhere to wire it to.
export default function HeroLoginButton() {
  return (
    <div className="pointer-events-none absolute top-[6rem] right-4 z-40 sm:top-[6rem] lg:right-10">
      <button
        type="button"
        aria-label="Login"
        title="Login"
        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
      >
        <CiLogin className="h-[1.8rem] w-[1.15rem]" />
      </button>
    </div>
  );
}
