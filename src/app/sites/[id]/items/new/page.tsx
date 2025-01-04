import ItemCreationForm from "@/components/item-creation-form";

interface ItemCreatePageProps {
  params: {
    id: string;
  };
}

export default async function ItemCreatePage(props: ItemCreatePageProps) {
  const { id } = await props.params;

  const siteId = parseInt(id);

  console.log(siteId);

  return <ItemCreationForm siteId={siteId}/>
}
