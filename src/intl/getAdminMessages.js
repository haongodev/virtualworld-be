import { notFound } from "next/navigation";

export default async function getAdminMessages(locale) {
    try {
        return (await import(`./adminMessages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}