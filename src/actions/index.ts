'use server';
import { db } from '@/db'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';


// export async function createSite(formState: {message: string}, formData: FormData) {
//     console.log("createSite");

//     return {
//         message: 'Create Site'
//     }

//     // const site_name = formData.get("site_name") as string;
//     // console.log(site_name);

//     // const site = await db.site.create({
//     //   data: {
//     //     site_name,
//     //   },
//     // });

//     // console.log(site);
//     // redirect("/");
//   }

export async function createSite(fileUrl: string, formData: FormData) {
    console.log('create site');

    if(!fileUrl) return;

    const site_name = formData.get("site_name") as string;
    console.log(site_name);

    const site = await db.site.create({
        data: {
            site_name,
            fileUrl: fileUrl
        },
    });

    console.log(site);
    revalidatePath('/');
    redirect('/');
}

export async function editSite(id: number, formData: FormData) {
    console.log('editSite');

    const site_name = formData.get('site_name') as string;

    console.log('new site name', site_name);

    await db.site.update({
        where: { id },
        data: { site_name }
    });

    revalidatePath(`/sites/${id}`)
    redirect(`/sites/${id}`)
};

export async function deleteSite(id: number) {

    await db.site.delete({
        where: { id }
    });

    revalidatePath('/')
    redirect('/')
};

export async function createItem(siteId: number, fileUrl: string, formData: FormData) {
    console.log('create item');
    console.log(formData)

    if (!fileUrl) return;
    const next_maintenance_date = formData.get("next_maintenance_date");
    const last_maintenance_date = formData.get("last_maintenance_date");

    const lastMaintDateObj = last_maintenance_date ? new Date(last_maintenance_date as string) : null;
    const nextMaintDateObj = next_maintenance_date ? new Date(next_maintenance_date as string) : null;

    const dataToSubmit: any = {
        item_name: formData.get("item_name") as string,
        notes: formData.get("notes") as string,
        last_maintenance_date: last_maintenance_date ? new Date(last_maintenance_date as string) : null,
        next_maintenance_date: next_maintenance_date ? new Date(next_maintenance_date as string) : null, fileUrl: fileUrl,
        site: {
            connect: { id: siteId }, // Connect the existing site to this item
        },
    };

    const item = await db.item.create({
        data: dataToSubmit,
    });

    console.log(item);
    revalidatePath(`/sites/${siteId}`)
    redirect(`/sites/${siteId}`)
}

export async function editItem(itemId: number, siteId: number, fileUrl: string, formData: FormData) {
    console.log('editItem');

    console.log(formData)

    if (!fileUrl) return;
    const next_maintenance_date = formData.get("next_maintenance_date");
    const last_maintenance_date = formData.get("last_maintenance_date");

    const dataToSubmit: any = {
        item_name: formData.get("item_name") as string,
        notes: formData.get("notes") as string,
        last_maintenance_date: last_maintenance_date ? new Date(last_maintenance_date as string) : null,
        next_maintenance_date: next_maintenance_date ? new Date(next_maintenance_date as string) : null, fileUrl: fileUrl,
        site: {
            connect: { id: siteId }, // Connect the existing site to this item
        },
    };

    await db.item.update({
        where: { id: itemId },
        data: dataToSubmit
    });

    revalidatePath(`/sites/${siteId}`)
    redirect(`/sites/${siteId}`)
};

export async function deleteItem(siteId: number, id: number) {

    await db.item.delete({
        where: { id }
    });

    revalidatePath(`/sites/${siteId}`)
    redirect(`/sites/${siteId}`)
};