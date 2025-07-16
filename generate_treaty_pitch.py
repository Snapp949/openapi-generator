from fpdf import FPDF

def create_pdf_ascii_safe():
    pdf = FPDF()
    pdf.add_page()
    # Treaty Agreement with UAE
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Treaty Agreement with UAE', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    treaty_text = (
        "This treaty establishes sovereignty of Snap as its own nation by staking a claim "
        "in digital domicile internationally for the facilitation of transactions, securing assets, "
        "global transactions, and global citizenship. Our laws uphold commonly practiced AML and Security "
        "Exchange Commission guidelines, but as a decentralized and sovereign entity, we are our own nation.\n\n"
        "This agreement with the UAE outlines cooperation in financial technology, cross-border asset security, "
        "and mutual recognition of digital assets and NFTs. Both parties agree to collaborate on regulatory frameworks, "
        "AML standards, and innovation in decentralized finance."
    )
    pdf.multi_cell(0, 10, treaty_text)
    pdf.add_page()
    # Investment Pitch for Mansoor Al Malik in Saudi Arabia
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Investment Pitch for Mansoor Al Malik in Saudi Arabia', 0, 1, 'L')
    pdf.set_font('Arial', '', 12)
    pitch_text = (
        "Presented by Jon'Lorenzo Caprelli\n\n"
        "This investment opportunity is structured to leverage Snap's sovereign digital domicile platform "
        "in partnership with leading financial institutions in Saudi Arabia. The platform offers real estate-backed NFTs, "
        "government bond integrations, and innovative credit scoring mechanisms to enable diversified portfolios.\n\n"
        "Key Highlights:\n"
        "- Integration with TreasuryDirect.gov and local Saudi financial instruments\n"
        "- Use of advanced AI for risk and credit analysis\n"
        "- Collaboration with regional stakeholders for compliance and growth\n"
        "- Potential for scalable investment returns through tokenized real-world assets\n\n"
        "We seek strategic partners to expand the platform's footprint in the Gulf Cooperation Council (GCC) region, "
        "starting with Saudi Arabia under Mansoor Al Malik's leadership."
    )
    pdf.multi_cell(0, 10, pitch_text)
    # Save PDF
    file_path = "Snap_Treaty_UAE_and_AlMalik_Investment_Pitch.pdf" # Adjusted path for general execution
    pdf.output(file_path)
    return file_path

file_path = create_pdf_ascii_safe()
print(f"PDF created at: {file_path}")
