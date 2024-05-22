package amplasystem.api.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amplasystem.api.dtos.PedidoFaturadoWithFinanceiro;
import amplasystem.api.enuns.StatusOrder;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.mappers.PedidoFaturadoWithFinaceiroMapper;
import amplasystem.api.models.Financeiro;
import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.models.PedidoFaturado;
import amplasystem.api.repositories.PedidoFaturadoRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class PedidoFaturadoService {

    @Autowired
    PedidoFaturadoRepository pedidoFaturadoRepository;

    @Autowired
    OrdemDeCompraService ordemDeCompraService;

    @Autowired
    FinanceiroService financeiroService;

    private double getAllValueWasPayment(OrdemDeCompra order) {
        List<PedidoFaturado> pedidos = pedidoFaturadoRepository.getByOrdemDeCompra(order);
        double value = 0;
        for (PedidoFaturado pedidoFaturado : pedidos) {
            value += pedidoFaturado.getValorFaturado();
        }
        return value;
    }

    private double getAllValueWasPayment(OrdemDeCompra order, PedidoFaturado ignore) {
        List<PedidoFaturado> pedidos = pedidoFaturadoRepository.getByOrdemDeCompra(order);
        double value = 0;
        for (PedidoFaturado pedidoFaturado : pedidos) {
            if (pedidoFaturado.getId() != ignore.getId()) {
                value += pedidoFaturado.getValorFaturado();
            }
        }
        return value;
    }

    private boolean checkOrderWasFullPayment(OrdemDeCompra order) {
        return getAllValueWasPayment(order) == order.getValor();
    }

    private boolean checkIfValueBiggerOrderRestValue(PedidoFaturado pedido) {
        return getAllValueWasPayment(pedido.getOrdemDeCompra()) + pedido.getValorFaturado() > pedido.getOrdemDeCompra()
                .getValor();
    }

    private boolean checkIfValueBiggerOrderRestValueIgnoring(PedidoFaturado pedido) {
        return getAllValueWasPayment(pedido.getOrdemDeCompra(), pedido) + pedido.getValorFaturado() > pedido
                .getOrdemDeCompra()
                .getValor();
    }

    private void setValorLiquido(PedidoFaturado pedido) {
        Financeiro financeiro = financeiroService.getByIndustria(pedido.getOrdemDeCompra().getIndustria());
        double liquido = pedido.getValorFaturado() * (financeiro.getComissao() / 100);
        pedido.setValorLiquido(liquido);
    }

    public PedidoFaturado save(PedidoFaturado pedido) {
        if (ordemDeCompraService.checkIfOrderNotExist(pedido.getOrdemDeCompra())) {
            throw new IllegalStateException("Ordem de compra não cadastrada.");
        }
        if (checkOrderWasFullPayment(pedido.getOrdemDeCompra())) {
            throw new IllegalStateException("Ordem de compra ja foi totalmente faturada.");
        }
        if (checkIfValueBiggerOrderRestValue(pedido)) {
            throw new IllegalStateException("O valor ultrapassa o faltante para o faturada.");
        }
        setValorLiquido(pedido);
        PedidoFaturado savPedidoFaturado = pedidoFaturadoRepository.save(pedido);

        OrdemDeCompra order = savPedidoFaturado.getOrdemDeCompra();

        if (checkOrderWasFullPayment(pedido.getOrdemDeCompra())) {
            order.setTotalmenteFaturado(StatusOrder.TOTALMENTEFATURADO);
        } else {
            order.setTotalmenteFaturado(StatusOrder.PARCIALMENTEFATURADO);
        }
        ordemDeCompraService.update(order);

        savPedidoFaturado.setOrdemDeCompra(order);
        return savPedidoFaturado;
    }

    public void delete(Integer pedidoId) {
        if (pedidoFaturadoRepository.existsById(pedidoId)) {
            PedidoFaturado pedido = pedidoFaturadoRepository.findById(pedidoId).get();
            pedidoFaturadoRepository.delete(pedido);

            OrdemDeCompra order = pedido.getOrdemDeCompra();

            if (getAllValueWasPayment(order) > 0) {
                order.setTotalmenteFaturado(StatusOrder.PARCIALMENTEFATURADO);
            } else {
                order.setTotalmenteFaturado(StatusOrder.NAOFATURADO);
            }
            ordemDeCompraService.update(order);
        } else {
            throw new ObjectNotFoundException("Pedido não encontrada na base de dados");
        }
    }

    public void update(PedidoFaturado pedido) {
        if (pedidoFaturadoRepository.existsById(pedido.getId())) {
            if (ordemDeCompraService.checkIfOrderNotExist(pedido.getOrdemDeCompra())) {
                throw new IllegalStateException("Ordem de compra não cadastrada.");
            }
            if (checkOrderWasFullPayment(pedido.getOrdemDeCompra())) {
                throw new IllegalStateException("Ordem de compra ja foi totalmente faturada.");
            }
            if (checkIfValueBiggerOrderRestValueIgnoring(pedido)) {
                throw new IllegalStateException("O valor ultrapassa o faltante para o faturada.");
            }
            setValorLiquido(pedido);

            PedidoFaturado savPedidoFaturado = pedidoFaturadoRepository.save(pedido);

            OrdemDeCompra order = savPedidoFaturado.getOrdemDeCompra();

            if (checkOrderWasFullPayment(pedido.getOrdemDeCompra())) {
                order.setTotalmenteFaturado(StatusOrder.TOTALMENTEFATURADO);
            } else if (getAllValueWasPayment(order, pedido) > 0) {
                order.setTotalmenteFaturado(StatusOrder.PARCIALMENTEFATURADO);
            } else {
                order.setTotalmenteFaturado(StatusOrder.NAOFATURADO);
            }
            ordemDeCompraService.update(order);
        } else {
            throw new ObjectNotFoundException("Pedido não encontrada na base de dados");
        }
    }

    public List<PedidoFaturado> getAllPedidoFaturados() {
        return pedidoFaturadoRepository.findAll().stream().toList();
    }

    public List<PedidoFaturadoWithFinanceiro> getAllPedidoFaturadosWithFinanceiro() {
        List<PedidoFaturado> pedidosList = getAllPedidoFaturados();
        List<PedidoFaturadoWithFinanceiro> formattedList = new ArrayList<>();
        for (PedidoFaturado pedidoFaturado : pedidosList) {
            Financeiro financeiro = financeiroService.getByIndustria(pedidoFaturado.getOrdemDeCompra().getIndustria());
            formattedList.add(PedidoFaturadoWithFinaceiroMapper.toDTO(pedidoFaturado, financeiro));
        }
        return formattedList;
    }

    public List<PedidoFaturado> getAllBettwoenDate(LocalDate initialDate, LocalDate finalDate) {
        return pedidoFaturadoRepository.findAllByDataVencimentoBetween(initialDate, finalDate);
    }
}
