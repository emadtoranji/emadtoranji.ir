'use client';

export default function Loading() {
  return (
    <div className='fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#f8f9fa] z-[9999]'>
      <div className='w-12 h-12 rounded-full border-4 border-transparent border-r-[#1e3a8a] border-t-[#1e3a8a] animate-spin'></div>
    </div>
  );
}
