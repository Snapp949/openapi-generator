from fpdf import FPDF
from pdfminer.high_level import extract_text
import os

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Snapifi Financial Platform', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', 0, 0, 'C')

def create_pdf_ascii_safe():
    pdf = PDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Treaty Agreement Template
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Treaty Agreement Template', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    treaty_text = (
        "This treaty establishes sovereignty of Snap as its own nation by staking a claim "
        "in digital domicile internationally for the facilitation of transactions, securing assets, "
        "global transactions, and global citizenship. Our laws uphold commonly practiced AML and Security "
        "Exchange Commission guidelines, but as a decentralized and sovereign entity, we are our own nation.\n\n"
        "This agreement outlines cooperation in financial technology, cross-border asset security, "
        "and mutual recognition of digital assets and NFTs. Both parties agree to collaborate on regulatory frameworks, "
        "AML standards, and innovation in decentralized finance.\n\n"
        "This template is designed to be filled with specific details regarding the cooperating entity, "
        "including their name, jurisdiction, and specific areas of mutual interest and collaboration."
    )
    pdf.multi_cell(0, 10, treaty_text)
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Cooperating Entity: [Insert Entity Name]', 0, 1, 'L')
    pdf.cell(0, 10, 'Jurisdiction: [Insert Jurisdiction]', 0, 1, 'L')
    pdf.ln(10)

    pdf.add_page()
    # Investment Pitch Template
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Investment Pitch Template', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    pitch_text = (
        "Presented by Jon'Lorenzo Caprelli\n\n"
        "This investment opportunity is structured to leverage Snap's sovereign digital domicile platform "
        "in partnership with leading financial institutions. The platform offers real estate-backed NFTs, "
        "government bond integrations, and innovative credit scoring mechanisms to enable diversified portfolios.\n\n"
        "Key Highlights:\n"
        "- Integration with TreasuryDirect.gov and local financial instruments\n"
        "- Use of advanced AI for risk and credit analysis\n"
        "- Collaboration with regional stakeholders for compliance and growth\n"
        "- Potential for scalable investment returns through tokenized real-world assets\n\n"
        "We seek strategic partners to expand the platform's footprint in the [Insert Region] region, "
        "under [Insert Individual/Organization Name]'s leadership. This template is designed to be customized "
        "for specific investors and markets."
    )
    pdf.multi_cell(0, 10, pitch_text)
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Prospective Investor/Partner: [Insert Individual/Organization Name]', 0, 1, 'L')
    pdf.cell(0, 10, 'Target Region: [Insert Region]', 0, 1, 'L')
    pdf.ln(10)

    # Save PDF
    pdf_file_path = "/mnt/data/Snap_Generic_Treaty_and_Investment_Proposal.pdf"
    pdf.output(pdf_file_path)
    return pdf_file_path

def convert_pdf_to_txt(pdf_path):
    txt_path = pdf_path.replace(".pdf", ".txt")
    try:
        text = extract_text(pdf_path)
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        return txt_path
    except Exception as e:
        print(f"Error converting PDF to TXT: {e}")
        return None

file_path = create_pdf_ascii_safe()
if file_path:
    print(f"PDF created at: {file_path}")
    txt_file_path = convert_pdf_to_txt(file_path)
    if txt_file_path:
        print(f"Text file created at: {txt_file_path}")
