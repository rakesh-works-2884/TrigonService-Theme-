"use client";

import { useConsultationModal } from "@/components/ConsultationModalProvider";

export default function ConsultationButton({
  className = "",
  children = "Get Free Consultation",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openModal } = useConsultationModal();
  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  );
}
