import { Metadata } from "next";
import client from "../../tina/__generated__/client";
import ServicesList from "./ServicesList";

export const metadata: Metadata = {
  title: "Services — Ajay Sidal",
  description: "Core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation.",
};

export default async function ServicesPage() {
  // Fetch all services from Tina (Local or Cloud)
  const { data } = await client.queries.servicesConnection({
    first: 100,
  });

  const services = data.servicesConnection.edges
    .map((edge: any) => edge.node)
    .filter((node: any) => node.status === "published");

  return <ServicesList initialServices={services} />;
}
