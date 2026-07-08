import { pexelsPhoto } from "@/lib/images";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePillar = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  subServices: string[];
  documentsRequired: string[];
  timeline: string;
  faq: FaqItem[];
  image: string;
  imageAlt: string;
};

export const servicePillars: ServicePillar[] = [
  {
    slug: "business-registration-setup",
    image: pexelsPhoto(16323454),
    imageAlt: "Founders working together on laptops in a modern office",
    title: "Business Registration & Setup",
    shortTitle: "Business Registration",
    summary:
      "Choose the right legal structure and get your company incorporated with the Ministry of Corporate Affairs.",
    intro:
      "Starting a business begins with choosing the right legal structure. Our team helps founders, promoters, and entrepreneurs evaluate the trade-offs between a Private Limited Company, LLP, OPC, and other structures, then manages the entire incorporation process end-to-end with the Ministry of Corporate Affairs (MCA) and Registrar of Companies (ROC).",
    subServices: [
      "Private Limited Company Registration",
      "LLP Registration",
      "One Person Company (OPC)",
      "Partnership Firm & Proprietorship Registration",
      "Public Limited Company",
      "Section 8 Company (NGO)",
      "Trust Registration",
      "Society Registration",
      "Producer Company",
      "Nidhi Company",
      "Startup India Registration",
    ],
    documentsRequired: [
      "PAN and Aadhaar of all directors/partners",
      "Passport-size photographs",
      "Proof of registered office address (utility bill/rent agreement)",
      "NOC from the property owner",
      "Digital Signature Certificate (DSC)",
    ],
    timeline: "7 – 15 working days depending on structure and approvals",
    faq: [
      {
        question: "Which business structure should I choose?",
        answer:
          "It depends on liability protection, funding plans, and compliance appetite. A Private Limited Company suits startups planning to raise funding; an LLP suits professional/service firms wanting lower compliance; an OPC suits solo founders. We recommend the right fit after a free consultation.",
      },
      {
        question: "Do I need a physical office to register a company?",
        answer:
          "You need a valid registered office address with proof of ownership or a rent agreement and NOC — it can be a residential or commercial address.",
      },
    ],
  },
  {
    slug: "government-regulatory-registrations",
    image: pexelsPhoto(8949852),
    imageAlt: "Woman filling out a government registration application form",
    title: "Government & Regulatory Registrations",
    shortTitle: "Regulatory Registrations",
    summary:
      "Register for GST, MSME, IEC, PF/ESI, and GeM so your business can legally trade, hire, and sell to government buyers.",
    intro:
      "Beyond incorporation, most businesses need a set of regulatory registrations to legally invoice customers, hire employees, import/export goods, or sell on government platforms. We handle the paperwork and portal filings so you can focus on operations.",
    subServices: [
      "GST Registration",
      "MSME (Udyam) Registration",
      "Import-Export Code (IEC)",
      "PF & ESI Registration",
      "GeM (Government e-Marketplace) Registration",
    ],
    documentsRequired: [
      "PAN and incorporation certificate",
      "Proof of business address",
      "Bank account details/cancelled cheque",
      "Authorised signatory ID proof",
    ],
    timeline: "3 – 10 working days per registration",
    faq: [
      {
        question: "Is GST registration mandatory for every business?",
        answer:
          "GST registration is mandatory once turnover crosses the prescribed threshold, or if you sell inter-state, sell online, or want to claim input tax credit — even below threshold.",
      },
      {
        question: "What is Udyam/MSME registration used for?",
        answer:
          "It unlocks priority lending, subsidy schemes, delayed-payment protection, and tender eligibility for micro, small, and medium enterprises.",
      },
    ],
  },
  {
    slug: "tax-registration-filing",
    image: pexelsPhoto(6927334),
    imageAlt: "Tax forms with a calculator on a desk",
    title: "Tax Registration & Filing",
    shortTitle: "Tax Filing",
    summary:
      "Stay on top of GST returns, income tax filing, TDS, and bookkeeping with a dedicated compliance calendar.",
    intro:
      "Tax compliance is ongoing, not one-time. We manage your GST returns, income tax filings, TDS returns, and core registrations on a recurring compliance calendar, backed by accurate bookkeeping so every filing is audit-ready.",
    subServices: [
      "GST Return Filing",
      "GST Cancellation/Modification",
      "GST Audit",
      "Income Tax Return (ITR) Filing",
      "TDS Return Filing",
      "PAN Registration",
      "TAN Registration",
      "Professional Tax Registration",
      "Bookkeeping & Accounting",
    ],
    documentsRequired: [
      "Sales and purchase invoices",
      "Bank statements",
      "Previous return acknowledgements",
      "Payroll/salary records (for TDS)",
    ],
    timeline: "Recurring monthly/quarterly/annual cycles as applicable",
    faq: [
      {
        question: "What happens if I miss a GST return deadline?",
        answer:
          "Late filing attracts late fees and interest, and can block your GSTIN from filing subsequent returns or claiming input credit. We track deadlines on your behalf to avoid this.",
      },
      {
        question: "Can you handle bookkeeping if I use a specific accounting software?",
        answer:
          "Yes, we work with Tally, Zoho Books, QuickBooks, and other common platforms, or can set one up for you.",
      },
    ],
  },
  {
    slug: "government-business-licenses",
    image: pexelsPhoto(17086288),
    imageAlt: "Chefs working in a licensed commercial kitchen",
    title: "Government Business Licenses",
    shortTitle: "Business Licenses",
    summary:
      "Operate legally with FSSAI, trade, factory, and safety licenses tailored to your sector.",
    intro:
      "Certain business activities — food service, manufacturing, retail trade, or hazardous operations — require sector-specific licenses before you can legally operate. We identify exactly which licenses apply to your business and manage the applications with local and state authorities.",
    subServices: [
      "FSSAI Food License",
      "Trade License",
      "Shop & Establishment Certificate",
      "Factory License",
      "Drug License",
      "Pollution Control Board License",
      "Fire Safety License/NOC",
      "Labour License",
      "Contractor License",
    ],
    documentsRequired: [
      "Business address proof",
      "Identity proof of proprietor/partners/directors",
      "Site/layout plan (where applicable)",
      "Previous licenses or NOCs, if any",
    ],
    timeline: "10 – 30 working days depending on license and jurisdiction",
    faq: [
      {
        question: "Do I need an FSSAI license for a small food stall?",
        answer:
          "Yes — even small food businesses need at minimum an FSSAI Basic Registration; the license tier scales with your turnover and scale of operation.",
      },
      {
        question: "How long is a trade license valid?",
        answer:
          "Validity varies by state/municipal body, typically 1 year, and must be renewed annually.",
      },
    ],
  },
  {
    slug: "labour-law-compliance",
    image: pexelsPhoto(4480982),
    imageAlt: "Warehouse workers talking on the floor",
    title: "Labour Law Compliance",
    shortTitle: "Labour Compliance",
    summary:
      "Keep payroll, PF, ESIC, and contract labour compliance audit-ready as your headcount grows.",
    intro:
      "As you hire, a growing set of labour law obligations kicks in — PF, ESIC, minimum wages, welfare funds, and contractor compliance. We set up and manage these registrations and recurring filings so your workforce compliance never falls behind.",
    subServices: [
      "EPF Registration",
      "ESIC Registration",
      "Labour Welfare Fund Registration",
      "Contract Labour License (CLRA)",
      "Minimum Wages Compliance",
      "Payroll Compliance",
      "BOCW (Building & Other Construction Workers)",
      "ISMW (Inter-State Migrant Workmen)",
    ],
    documentsRequired: [
      "Employee headcount and salary structure",
      "Establishment registration certificates",
      "PAN and bank details of the entity",
      "Contractor agreements, where applicable",
    ],
    timeline: "5 – 15 working days per registration; monthly recurring filings",
    faq: [
      {
        question: "At what employee count does PF/ESIC become mandatory?",
        answer:
          "PF applies once you cross 20 employees (with some voluntary options below that); ESIC applies once you cross 10 employees in most states — thresholds can vary, so we assess your specific case.",
      },
      {
        question: "Do you handle monthly payroll compliance filings?",
        answer:
          "Yes, we manage recurring PF/ESIC challans, returns, and payroll compliance on a monthly retainer basis.",
      },
    ],
  },
  {
    slug: "certifications",
    image: pexelsPhoto(12324202),
    imageAlt: "Printed ISO certification documents",
    title: "Certifications",
    shortTitle: "Certifications",
    summary:
      "Build customer and buyer trust with ISO, BIS, CE, and product-specific quality certifications.",
    intro:
      "Certifications signal quality, safety, and process maturity to customers, partners, and international buyers. We guide you through documentation, gap assessment, and audits required to earn and maintain recognised certifications.",
    subServices: [
      "ISO Certification (9001, 14001, 27001)",
      "BIS Certification",
      "ISI Mark",
      "CE Certification",
      "GMP Certification",
      "HACCP Certification",
      "Halal Certification",
      "Organic Certification",
    ],
    documentsRequired: [
      "Business registration proof",
      "Process/quality manual (or support to draft one)",
      "Product specifications/test reports",
      "Facility details",
    ],
    timeline: "15 – 45 working days depending on certification and audit scheduling",
    faq: [
      {
        question: "Which ISO certification should my business start with?",
        answer:
          "ISO 9001 (Quality Management) is the most common starting point for most businesses; ISO 27001 suits IT/data-driven companies, and ISO 14001 suits manufacturing with environmental impact.",
      },
      {
        question: "Is a physical audit always required?",
        answer:
          "Most certifications require at least one on-site or virtual audit by an accredited certification body — we coordinate this on your behalf.",
      },
    ],
  },
  {
    slug: "intellectual-property",
    image: pexelsPhoto(1634842),
    imageAlt: "Person holding a lightbulb representing an idea to protect",
    title: "Intellectual Property (IPR)",
    shortTitle: "IPR",
    summary:
      "Protect your brand, inventions, and creative work with trademark, patent, copyright, and design filings.",
    intro:
      "Your brand name, inventions, and creative work are business assets worth protecting early. We handle trademark searches and filings, respond to objections and oppositions, and manage copyright, patent, and design registrations.",
    subServices: [
      "Trademark Registration",
      "Trademark Renewal",
      "Trademark Objection Reply",
      "Trademark Opposition Handling",
      "Copyright Registration",
      "Patent Registration",
      "Design Registration",
    ],
    documentsRequired: [
      "Brand name/logo files (for trademark)",
      "Identity and address proof of applicant",
      "Description/specification of the invention or design",
      "Power of Attorney (for filing through an agent)",
    ],
    timeline: "Filing in 2 – 5 working days; registration timelines vary (months to years) by IP office processing",
    faq: [
      {
        question: "How long does trademark registration take?",
        answer:
          "Filing is quick, but full registration (assuming no objections/oppositions) typically takes 12–24 months through the Trade Marks Registry.",
      },
      {
        question: "Can I use the TM symbol before registration completes?",
        answer:
          "Yes, you can use ™ once you've filed an application; the ® symbol is reserved for use only after registration is granted.",
      },
    ],
  },
  {
    slug: "corporate-compliance",
    image: pexelsPhoto(1181304),
    imageAlt: "Group of people in a corporate boardroom meeting",
    title: "Corporate Compliance",
    shortTitle: "Corporate Compliance",
    summary:
      "Meet ROC annual filing, KYC, and company-change obligations to keep your company in good standing.",
    intro:
      "Every registered company and LLP has ongoing obligations to the Registrar of Companies — annual filings, director KYC, and approvals for structural changes. Missing these can lead to penalties or disqualification. We manage the full annual compliance calendar for you.",
    subServices: [
      "ROC Annual Filing",
      "Director KYC (DIR-3 KYC)",
      "Change of Director",
      "Change of Company Name",
      "Change of Registered Office",
      "Share Transfer",
      "Company Strike Off",
      "Company Winding Up",
    ],
    documentsRequired: [
      "Audited financial statements",
      "Board resolutions for relevant changes",
      "Director/shareholder KYC documents",
      "Previous ROC filing acknowledgements",
    ],
    timeline: "Annual filings within statutory due dates; change requests in 7 – 20 working days",
    faq: [
      {
        question: "What happens if I don't file ROC annual returns?",
        answer:
          "Continued non-filing attracts escalating penalties, can lead to director disqualification, and may result in the company being struck off by the ROC.",
      },
      {
        question: "Can a dormant company skip annual filing?",
        answer:
          "No — even dormant/inactive companies must file annual returns until formally struck off or wound up.",
      },
    ],
  },
  {
    slug: "financial-advisory",
    image: pexelsPhoto(6285074),
    imageAlt: "Man presenting financial graphs in a business meeting",
    title: "Financial & Advisory Services",
    shortTitle: "Financial Advisory",
    summary:
      "Get investor-ready with business plans, valuations, and funding/loan documentation.",
    intro:
      "Whether you're raising your first round, applying for a loan, or need clean books for a due-diligence process, our financial advisory team prepares the documentation and analysis investors and lenders expect.",
    subServices: [
      "Accounting & Bookkeeping",
      "Project Report Preparation",
      "Business Plan Preparation",
      "Company Valuation",
      "Startup Funding Documentation",
      "Loan Documentation",
      "CMA Report",
    ],
    documentsRequired: [
      "Historical financial statements (if any)",
      "Business model and revenue assumptions",
      "Bank statements",
      "Existing cap table/shareholding pattern",
    ],
    timeline: "5 – 15 working days depending on report complexity",
    faq: [
      {
        question: "What is a CMA report and who needs one?",
        answer:
          "A Credit Monitoring Arrangement (CMA) report presents your financials and projections in the format banks require to evaluate a loan application.",
      },
      {
        question: "Can you help with an investor pitch, not just the legal side?",
        answer:
          "We prepare the underlying business plan, projections, and valuation support that feeds into your pitch materials.",
      },
    ],
  },
  {
    slug: "international-business",
    image: pexelsPhoto(38422417),
    imageAlt: "Stacked shipping containers for global trade",
    title: "International Business Services",
    shortTitle: "International Business",
    summary:
      "Navigate FEMA, foreign investment, and cross-border filings for import/export and global operations.",
    intro:
      "Trading across borders or bringing in foreign investment introduces FEMA and RBI compliance requirements on top of standard domestic filings. We help import/export businesses and foreign-invested companies stay compliant with cross-border regulations.",
    subServices: [
      "Import Export Code (IEC)",
      "FEMA Compliance",
      "Foreign Investment Filing",
      "FLA Return Filing",
      "FC-GPR Filing",
    ],
    documentsRequired: [
      "Company incorporation and PAN details",
      "Foreign investment/shareholding agreements",
      "Bank realisation certificates (for FLA)",
      "RBI/AD bank correspondence, where applicable",
    ],
    timeline: "5 – 20 working days depending on filing type and regulatory review",
    faq: [
      {
        question: "Who needs to file an FLA return?",
        answer:
          "Any Indian company that has received Foreign Direct Investment (FDI) or made overseas investment must file the annual FLA return with the RBI, even if there was no transaction during the year.",
      },
      {
        question: "What is FC-GPR filing?",
        answer:
          "FC-GPR reports the issue of shares by an Indian company to a foreign investor and must be filed with the RBI within the prescribed timeline after allotment.",
      },
    ],
  },
  {
    slug: "legal-documentation",
    image: pexelsPhoto(8730998),
    imageAlt: "Man signing a legal document",
    title: "Legal Documentation",
    shortTitle: "Legal Documentation",
    summary:
      "Get legally sound agreements drafted — from partnership deeds to NDAs and lease agreements.",
    intro:
      "Well-drafted agreements prevent disputes before they start. Our legal team drafts and reviews the core contracts every growing business needs, tailored to your specific commercial terms rather than generic templates.",
    subServices: [
      "Partnership Deed Drafting",
      "Employment Agreement",
      "Non-Disclosure Agreement (NDA)",
      "Lease Agreement",
      "Shareholder Agreement",
      "Power of Attorney",
    ],
    documentsRequired: [
      "Details of parties involved",
      "Key commercial terms to be captured",
      "Existing agreements, if being amended/renewed",
    ],
    timeline: "2 – 7 working days per document",
    faq: [
      {
        question: "Can you customise agreements to specific commercial terms?",
        answer:
          "Yes, every agreement is drafted around your specific terms rather than a generic template, then reviewed with you before finalising.",
      },
      {
        question: "Do you also review agreements sent to us by other parties?",
        answer:
          "Yes, we offer contract review and redlining to flag risk before you sign.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return servicePillars.find((s) => s.slug === slug);
}
