"use client";
export default function Footer() {
  return (
    <div className="pattern1 mask1 flex flex-col items-center justify-center bg-blue-400 py-10 text-white">
      <div className="font-bold">
        Copyright © KU Milk {new Date().getFullYear()}
      </div>
      <div>By <a target="_blank" href="https://cs.sci.ku.ac.th">Department of Computer Science</a></div>
      <div className="flex justify-center gap-0 md:gap-5 flex-col md:flex-row mt-3 md:mt-0">
        <div>Sornchai Somsakul</div>
        <div>Teerut Srithongdee</div>
        <div>Kittikun Buntoyut</div>
      </div>
    </div>
  );
}
