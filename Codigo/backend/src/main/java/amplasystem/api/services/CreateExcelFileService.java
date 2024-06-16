package amplasystem.api.services;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

// import org.apache.commons.math3.analysis.function.Ceil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.models.PedidoFaturado;
// import jakarta.mail.FolderClosedException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class CreateExcelFileService {

    public void addHeader(String[] headers, XSSFSheet sheet, int rowNumber) {
        XSSFRow row = sheet.createRow(rowNumber);
        int index = 0;
        for (String header : headers) {
            addCel(row, index, header);
            row.getSheet().autoSizeColumn(index);
            index++;
        }
    }

    public void addCel(XSSFRow row, int column, String value) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        row.getSheet().autoSizeColumn(column);
    }

    public void addDateCell(XSSFWorkbook workbook, XSSFRow row, int column, LocalDate value) {
        Cell cell = row.createCell(column);

        Date date = Date.from(value.atStartOfDay(ZoneId.systemDefault()).toInstant());

        cell.setCellValue(date);

        CreationHelper createHelper = workbook.getCreationHelper();
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy"));

        cell.setCellStyle(cellStyle);
        row.getSheet().autoSizeColumn(column);
    }

    public void addCel(XSSFWorkbook workbook, XSSFRow row, int column, Double value) {
        Cell cell = row.createCell(column);

        CellStyle cellStyle = workbook.createCellStyle();
        DataFormat format = workbook.createDataFormat();
        cellStyle.setDataFormat(format.getFormat("R$ #,##0.00"));

        cell.setCellValue(value);
        cell.setCellStyle(cellStyle);
        row.getSheet().autoSizeColumn(column);
    }

    public void createPurchaseOrderReport(List<OrdemDeCompra> purchaseOrders) {

        try {
            XSSFWorkbook workbook = new XSSFWorkbook();
            FileOutputStream outputStream = new FileOutputStream(
                    "src\\main\\java\\amplasystem\\api\\out\\purchaseOrdersReport.xlsx");

            XSSFSheet sheet = workbook.createSheet("Purchase Orders Report");
            int size = 0;
            String[] headers = { "ID", "Industria", "Cliente", "Codigo do Pedido", "Status",
                    "valor da ordem",
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
                addCel(workbook, row, 5, purchaseOrder.getValor());
                addCel(workbook, row, 6, purchaseOrder.getValueIsFaturado());
                addCel(workbook, row, 7, purchaseOrder.getValueIsFaturadoLiquid());

            }

            workbook.write(outputStream);
            workbook.close();
        } catch (FileNotFoundException e) {
            // TODO: handle exception
        } catch (IOException e) {

        }
    }

    public void createSellingReport(List<PedidoFaturado> purchaseOrders) {
        try {
            XSSFWorkbook workbook = new XSSFWorkbook();
            FileOutputStream outputStream = new FileOutputStream(
                    "src\\main\\java\\amplasystem\\api\\out\\sellingReport.xlsx");

            XSSFSheet sheet = workbook.createSheet("Purchase Orders Report");
            int size = 0;
            String[] headers = { "ID", "Industria", "Cliente", "Codigo do Pedido", "Nota fiscal", "Data vencimento",
                    "valor da ordem",
                    "valor da nota ",
                    "valor da comissão da nota" };
            addHeader(headers, sheet, size++);

            for (PedidoFaturado purchaseOrder : purchaseOrders) {
                XSSFRow row = sheet.createRow(size++);
                addCel(row, 0, purchaseOrder.getId().toString());
                addCel(row, 1, purchaseOrder.getOrdemDeCompra().getIndustria().getNome());
                addCel(row, 2, purchaseOrder.getOrdemDeCompra().getCliente().getNomeFantasia());
                addCel(row, 3, purchaseOrder.getOrdemDeCompra().getCodigoPedido());
                addCel(row, 4, purchaseOrder.getNotaFiscal());
                addDateCell(workbook, row, 5, purchaseOrder.getDataVencimento());
                addCel(workbook, row, 6, purchaseOrder.getOrdemDeCompra().getValueIsFaturado());
                addCel(workbook, row, 7, purchaseOrder.getValorFaturado());
                addCel(workbook, row, 8, purchaseOrder.getValorLiquido());

            }

            workbook.write(outputStream);
            workbook.close();
        } catch (FileNotFoundException e) {
            // TODO: handle exception   
        } catch (IOException e) {

        }
    }
}
