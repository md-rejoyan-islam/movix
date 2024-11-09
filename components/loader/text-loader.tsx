export default function TextLoader({ styles }: { styles?: string }) {
  return (
    <span
      className={` h-8 rounded-md min-w-[30px]  block bg-[#204e8a55] animate-pulse ${styles}`}
    ></span>
  );
}
