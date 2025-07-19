from fpdf import FPDF
from pdfminer.high_level import extract_text
import os

def convert_pdf_to_txt(pdf_path, txt_path):
    """Converts a PDF file to a plain text file."""
    try:
        text = extract_text(pdf_path)
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Converted PDF to TXT at: {txt_path}")
    except Exception as e:
        print(f"Error converting PDF to TXT: {e}")

def create_generic_proposal_pdf():
    """Generates a generic treaty and investment proposal PDF and converts it to TXT."""
    pdf = FPDF()
    pdf.add_page()

    # Generic Treaty Agreement
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Treaty Agreement Template', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    treaty_text = (
        "This treaty establishes the sovereignty of Snap as its own nation by staking a claim "
        "in digital domicile internationally for the facilitation of transactions, securing assets, "
        "global transactions, and global citizenship. Our laws uphold commonly practiced AML and Security "
        "Exchange Commission guidelines, but as a decentralized and sovereign entity, we are our own nation.\n\n"
        "This agreement outlines cooperation in financial technology, cross-border asset security, "
        "and mutual recognition of digital assets and NFTs. Both parties agree to collaborate on regulatory frameworks, "
        "AML standards, and innovation in decentralized finance."
    )
    pdf.multi_cell(0, 10, treaty_text)

    pdf.add_page()

    # Generic Investment Pitch
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Investment Pitch Template', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    pitch_text = (
        "Presented by [Your Name/Organization Name]\n\n"
        "This investment opportunity is structured to leverage Snap's sovereign digital domicile platform "
        "in partnership with leading financial institutions. The platform offers real estate-backed NFTs, "
        "government bond integrations, and innovative credit scoring mechanisms to enable diversified portfolios.\n\n"
        "Key Highlights:\n"
        "- Integration with global financial instruments\n"
        "- Use of advanced AI for risk and credit analysis\n"
        "- Collaboration with regional stakeholders for compliance and growth\n"
        "- Potential for scalable investment returns through tokenized real-world assets\n\n"
        "We seek strategic partners to expand the platform's footprint in key regions, "
        "under the leadership of visionary individuals and organizations."
    )
    pdf.multi_cell(0, 10, pitch_text)

    # Define file paths
    pdf_file_name = "Snap_Generic_Treaty_and_Investment_Proposal.pdf"
    txt_file_name = pdf_file_name.replace(".pdf", ".txt")

    # Save PDF
    pdf.output(pdf_file_name)
    print(f"PDF created at: {pdf_file_name}")

    # Convert PDF to TXT
    convert_pdf_to_txt(pdf_file_name, txt_file_name)

    return pdf_file_name, txt_file_name

# Execute the function and print paths
pdf_path, txt_path = create_generic_proposal_pdf()
print(f"Generated files: {pdf_path}, {txt_path}")
