import IndexPage from "@/app/_shared/IndexPage";

export default function ProtocolsPage() {
  return (
    <IndexPage
      title="ZenTrust Protocols"
      description="Public education and research protocols."
      links={[
        { href: "/protocols/syntropic-ecology", label: "Syntropic Ecology" },
        { href: "/protocols/bpss-health", label: "BPSS Health" },
      ]}
    />
  );
}
