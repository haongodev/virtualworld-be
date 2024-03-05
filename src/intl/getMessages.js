import { notFound } from "next/navigation";

export default async function getMessages(locale) {
    try {
        return (await import(`./messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}