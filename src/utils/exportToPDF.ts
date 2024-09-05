import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IArguments {
    chartsContainerRef: React.MutableRefObject<null>;
}

export const exportPDF = ({ chartsContainerRef }: IArguments) => {
    const container: any = chartsContainerRef.current;

    html2canvas(container).then((canvas) => {
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 10;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const xOffset = 5;
        const yOffset = 10;

        let height = imgHeight;
        let position = yOffset;

        while (height > 0) {
            if (position !== yOffset) {
                pdf.addPage();
            }

            const pageHeight = pdfHeight - yOffset * 2;
            let imgHeightOnPage = Math.min(height, pageHeight);

            pdf.addImage(canvas.toDataURL("image/png"), "PNG", xOffset, position, imgWidth, imgHeightOnPage);
            height -= pageHeight;
            position = yOffset;
        }

        pdf.save("charts.pdf");
    });
};
