import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ISelectedData {
    income: { year: string; value: string };
    expenses: { year: string; value: string };
    totalPercentage: { year: string; value: string };
}

interface IArguments {
    chartsContainerRef: React.MutableRefObject<null>;
    selectedData: ISelectedData;
}

export const exportPDF = ({ chartsContainerRef, selectedData }: IArguments) => {
    const container: any = chartsContainerRef.current;

    html2canvas(container).then((canvas) => {
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 10;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const xOffset = 5;
        const yOffset = 10;

        let heightLeft = imgHeight;
        let position = 0;
        let pageNumber = 0;

        while (heightLeft > 0) {
            if (pageNumber > 0) {
                pdf.addPage();
            }

            const pageHeight = pdfHeight - 10;
            let imgHeightOnPage = Math.min(heightLeft, pageHeight);

            pdf.addImage(canvas.toDataURL("image/png"), "PNG", xOffset, yOffset - position, imgWidth, imgHeightOnPage);
            position += imgHeightOnPage;
            heightLeft -= pageHeight;

            if (heightLeft <= 0) {
                pdf.setFontSize(10);

                let yPosition = yOffset + imgHeightOnPage + 10;

                if (selectedData.income.value) {
                    pdf.text(
                        `Income (Year/value): ${selectedData.income.year} - ${selectedData.income.value}`,
                        xOffset,
                        yPosition
                    );
                    yPosition += 10;
                }

                if (selectedData.expenses.value) {
                    pdf.text(
                        `Expenses (Year/value): ${selectedData.expenses.year} - ${selectedData.expenses.value}`,
                        xOffset,
                        yPosition
                    );
                    yPosition += 10;
                }

                if (selectedData.totalPercentage.value) {
                    pdf.text(
                        `Total Percentage (Year/value) ${selectedData.totalPercentage.year} - ${(
                            +selectedData.totalPercentage.value * 100
                        ).toFixed(0)}%`,
                        xOffset,
                        yPosition
                    );
                }
            }

            pageNumber++;
        }

        pdf.save("charts.pdf");
    });
};
