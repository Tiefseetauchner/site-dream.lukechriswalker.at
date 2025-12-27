export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return (
    <div className="flex items-center justify-center py-12 text-xs font-semibold uppercase tracking-[0.4em] text-stone-200">
      Loading...
    </div>
  );
}
