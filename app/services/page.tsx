import { Metadata } from "next";
import client from "../../tina/__generated__/client";
import ServicesList from "./ServicesList";

export const metadata: Metadata = {
  title: "Services — Ajay Sidal",
  description: "Core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation.",
};

export default async function ServicesPage() {
  const { data } = await client.queries.servicesConnection({
    first: 100,
  });

  // Null-safe extraction of edges
  const edges = data.servicesConnection?.edges || [];
  const services = edges
    .map((edge: any) => edge.node)
    .filter((node: any) => node && node.status === "published");

  return <ServicesList initialServices={services} />;
}
