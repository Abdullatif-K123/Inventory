import { notFound } from "next/navigation";
import { db } from "@/db";
import ItemEditForm from "@/components/item-edit-form";

interface ItemCreatePageProps {
  params: Promise<{
    itemId: string;
  }>;
}
export default async function SiteEditPage(props: ItemCreatePageProps) {
  const { itemId } = await props.params;

  const item = await db.item.findFirst({
    where: { id: parseInt(itemId) },
  });

  if (!item) {
    return notFound();
  }

  return (
    <div>
      <ItemEditForm item={item} />
    </div>
  );
}
