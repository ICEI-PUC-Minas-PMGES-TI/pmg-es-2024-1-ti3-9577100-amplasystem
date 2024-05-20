package amplasystem.api.services;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.commons.math3.analysis.function.Ceil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import amplasystem.api.models.OrdemDeCompra;
import jakarta.mail.FolderClosedException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class CreateExcelFileService {

    public void addHeader(String[] headers, XSSFSheet sheet, int rowNumber) {
        XSSFRow row = sheet.createRow(rowNumber);
        int index = 0;
        for (String header : headers) {
            addCel(row, index++, header);
        }
    }

    public void addCel(XSSFRow row, int column, String value) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
    }

    public void addCel(XSSFRow row, int column, Double value) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
    }

    public void createPurchaseOrderReport(List<OrdemDeCompra> purchaseOrders) {

        try {
            XSSFWorkbook workbook = new XSSFWorkbook();
            FileOutputStream outputStream = new FileOutputStream(
                    "src\\main\\java\\amplasystem\\api\\out\\purchaseOrdersReport.xlsx");

            XSSFSheet sheet = workbook.createSheet("Purchase Orders Report");
            int size = 0;
            String[] headers = { "ID", "Industria", "Cliente", "Codigo do Pedido", "Status", "valor da ordem",
                    "valor faturado",
                    "valor da comissão" };
            addHeader(headers, sheet, size++);

            for (OrdemDeCompra purchaseOrder : purchaseOrders) {
                XSSFRow row = sheet.createRow(size++);
                addCel(row, 0, purchaseOrder.getId().toString());
                addCel(row, 1, purchaseOrder.getIndustria().getNome());
                addCel(row, 2, purchaseOrder.getCliente().getNomeFantasia());
                addCel(row, 3, purchaseOrder.getCodigoPedido());
                addCel(row, 4, purchaseOrder.getTotalmenteFaturado().toString());
                addCel(row, 5, purchaseOrder.getValor());
                addCel(row, 6, purchaseOrder.getValueIsFaturado());
                addCel(row, 7, purchaseOrder.getValueIsFaturadoLiquid());

            }

            workbook.write(outputStream);
            workbook.close();
        } catch (FileNotFoundException e) {
            // TODO: handle exception
        } catch (IOException e) {

        }
    }

    public void createSellingReport() {

    }
}
