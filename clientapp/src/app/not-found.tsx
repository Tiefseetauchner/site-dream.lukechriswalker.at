import { Panel } from "@/components/Panel";
import { routes } from "@/utils/routes";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Panel>
        <h2 className="text-3xl font-semibold">404 - Page Not Found</h2>
        <p className="text-center text-lg">
          The page you are looking for does not exist. Go{" "}
          <Link href={routes.home} className="underline underline-offset-4 hover:text-stone-50">
            home
          </Link>
          . Do not pass go. Do not collect $200.
        </p>
      </Panel>
    </div>
  );
}
