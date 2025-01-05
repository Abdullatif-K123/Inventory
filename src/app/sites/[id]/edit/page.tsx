import { db } from "@/db";
import { notFound } from "next/navigation";
import SiteEditForm from "@/components/site-edit-form";

interface SiteEditPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function SiteEditPage(props: SiteEditPageProps) {
  const { id } = await props.params;

  const site = await db.site.findFirst({
    where: { id: parseInt(id) },
  });
  console.log(site?.site_name);
  if (!site) {
    return notFound();
  }

  return (
    <div>
      <SiteEditForm site={site} />
    </div>
  );
}
