"use client";

import { usePathname } from "next/navigation";

export default function ConditionalChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed/") ?? false;

  if (isEmbed) {
    return <main className="px-4 py-6">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      {footer}
    </>
  );
}
